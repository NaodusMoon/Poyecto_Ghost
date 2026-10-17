import { readdir, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));
const dryRun = process.argv.includes('--dry-run');
const env = { ...loadEnv('r2', root, 'R2_'), ...process.env };
const types = { '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const lists = await Promise.all(entries.map(entry => {
    const name = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(name) : [name];
  }));
  return lists.flat();
}
const files = (await walk(path.join(root, 'public'))).filter(file => !file.endsWith(`${path.sep}historia-de-vida.mp4`));
const inventory = await Promise.all(files.map(async file => ({ file, key: path.relative(path.join(root, 'public'), file).split(path.sep).join('/'), size: (await stat(file)).size })));
console.log(`${inventory.length} archivos, ${(inventory.reduce((sum, item) => sum + item.size, 0) / 1e6).toFixed(1)} MB`);
if (dryRun) {
  console.log('Simulación; no se envió ningún archivo');
  process.exit(0);
}
for (const key of ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET']) {
  if (!env[key]) throw new Error(`Falta ${key}; configura .env.r2.local`);
}
const client = new S3Client({ region: 'auto', endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY } });
let uploaded = 0;
for (const item of inventory) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(item.file)) hash.update(chunk);
  const sha256 = hash.digest('hex');
  try {
    const existing = await client.send(new HeadObjectCommand({ Bucket: env.R2_BUCKET, Key: item.key }));
    if (existing.Metadata?.sha256 === sha256 && existing.ContentLength === item.size) continue;
  } catch (error) {
    if (error.$metadata?.httpStatusCode !== 404) throw error;
  }
  await client.send(new PutObjectCommand({ Bucket: env.R2_BUCKET, Key: item.key, Body: createReadStream(item.file), ContentLength: item.size, ContentType: types[path.extname(item.file).toLowerCase()] || 'application/octet-stream', CacheControl: 'public, max-age=3600', Metadata: { sha256 } }));
  const verified = await client.send(new HeadObjectCommand({ Bucket: env.R2_BUCKET, Key: item.key }));
  if (verified.ContentLength !== item.size || verified.Metadata?.sha256 !== sha256) throw new Error(`Verificación fallida: ${item.key}`);
  console.log(`Subido y verificado: ${item.key}`);
  uploaded++;
}
console.log(`Completado; ${uploaded} archivos enviados, ${inventory.length - uploaded} sin cambios`);

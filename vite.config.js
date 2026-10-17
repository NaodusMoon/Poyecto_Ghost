import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const mediaBase = (env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');
  if (mediaBase && !/^https:\/\/[^\s"'`]+$/.test(mediaBase)) {
    throw new Error('VITE_MEDIA_BASE_URL debe ser una URL HTTPS pública');
  }
  return {
  // Local development keeps the original files; remote builds contain only code
  publicDir: mediaBase ? false : 'public',
  plugins: [{
    name: 'external-media',
    enforce: 'pre',
    transform(code, id) {
      if (!mediaBase || !/[/\\]src[/\\]/.test(id) || !/\.(jsx?|json)$/.test(id)) return null;
      return code.replace(/(["'`])\/(media|academico)\//g, (_, quote, folder) => `${quote}${mediaBase}/${folder}/`);
    },
  }],
  esbuild: {
    jsx: 'automatic',
  },
  };
});

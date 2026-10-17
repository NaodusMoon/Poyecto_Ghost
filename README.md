# KOMOREBI · Prom 2026

Anuario digital en React, Vite y Three.js; identidad en azul petróleo, crema y cobre

## Desarrollo

```sh
npm ci
npm run dev
```

## Organización

- src/components: experiencias, lectores, videos adaptables y escena 3D
- src/data: asignaturas, trabajos y presentaciones
- src/styles: diseño responsive
- public/media y public/academico: archivos locales
- scripts: preparación de documentos y subida a R2

Cinco capítulos reúnen datos personales, mundo académico, realidad virtual y aumentada, IA y robótica, mapa HTML, intereses, recuerdos y proyectos de vida

## Multimedia en Cloudflare R2

1. Crear un bucket R2 Standard con una dirección pública de lectura; para producción se recomienda un dominio propio
2. Crear credenciales S3 restringidas a lectura y escritura de objetos de ese bucket
3. Copiar .env.r2.example a .env.r2.local y completar las credenciales únicamente en el archivo local
4. Ejecutar la simulación y después la subida

```sh
node scripts/upload-r2.mjs --dry-run
node scripts/upload-r2.mjs
```

El script conserva rutas, asigna tipos de archivo, comprueba tamaño y hash registrado, omite archivos sin cambios y permite retomar una subida interrumpida; no borra archivos locales ni remotos

5. Configurar VITE_MEDIA_BASE_URL=https://multimedia.tu-dominio.com en .env.production.local o en las variables del proveedor de despliegue
6. Ejecutar npm run build y npm run preview, comprobar imágenes, documentos, reproducción y avance de videos

Con una base remota configurada, Vite sustituye las rutas multimedia y excluye public del resultado de producción; sin esa variable, se conserva el funcionamiento local

Las claves R2_* pertenecen al script de subida y nunca deben usar el prefijo VITE_; los archivos con secretos están excluidos de Git

Tras verificar la migración, retirar public/media y public/academico del índice de Git y añadirlos a .gitignore, conservando las copias locales; quitarlos en un nuevo commit no elimina los archivos del historial anterior, cuya limpieza requiere una operación independiente

R2 ofrece una cuota gratuita con límites de almacenamiento y operaciones; consultar las [tarifas vigentes](https://developers.cloudflare.com/r2/pricing/)

# KOMOREBI · Prom 2026

Anuario digital en React + Vite + Three.js.

## Ejecutar

npm install
npm run dev

## Producción

npm run build
npm run preview

## Organización

- src/components: escena 3D y biblioteca interactiva.
- src/data/projects.js: títulos, categorías y nombres de los 13 trabajos originales.
- src/styles/global.css: identidad visual y diseño responsive.
- public/media: carpeta para archivos multimedia definitivos.

Los selectores de trabajos, música y video permiten probar archivos locales durante la sesión. No los guardan ni los publican. Para contenido permanente, coloca los archivos en public/media y enlázalos desde los componentes o los datos. Los archivos del HTML original no fueron proporcionados.

La música empieza tras una acción del visitante para respetar las políticas de reproducción del navegador. La marquesina respeta la preferencia de movimiento reducido. La foto ambiental de Japón procede de Unsplash y no representa a los estudiantes.

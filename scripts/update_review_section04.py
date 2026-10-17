from pathlib import Path
p=Path('REVISION_ENTREGA.md');s=p.read_text(encoding='utf-8-sig')
replacements={
'| D. Sistema experto | Tarjeta y visor | PowerPoint real |':'| D / Sección 04. Sistema experto | PowerPoint original y 12 diapositivas visibles | Integrado |',
'| D. Inteligencia artificial | Tarjeta y visor | Folleto real |':'| D / Sección 04. Inteligencia artificial | PDF original y lector de las 2 caras del folleto | Integrado |',
'| D. Modelo de inteligencia artificial | Tarjeta y visor | Presentación de la exposición |':'| D / Sección 04. Modelo de inteligencia artificial | PowerPoint original y 8 diapositivas | Integrado |',
'| D. Robótica | Título corregido: trabajo escrito con normas APA | Trabajo real y revisión de sus normas APA |':'| D / Sección 04. Robótica | PDF original y lector de 30 páginas | Integrado; el formato APA del documento no fue auditado |',
'| D. Cómic de robótica | Tarjeta y visor | Cómic real |':'| D / Sección 04. Cómic de robótica | PDF original y lector de 2 páginas | Integrado |',
'Informática ya incluye infografía y práctica; faltan los seis trabajos restantes del capítulo D':'Informática tiene infografía, práctica y cinco trabajos adicionales integrados; falta el mapa conceptual HTML',
'Numeración visible: 01 Mi historia; 02 Mundo académico; 03 Informática; 04 Temas de interés; 05 Prom; 06 Proyecto de vida.':'Numeración visible: 01 Mi historia; 02 Mundo académico; 03 Realidad virtual y aumentada; 04 Sistema experto, IA y robótica; 05 Temas de interés; 06 Prom; 07 Proyecto de vida.'}
for a,b in replacements.items():s=s.replace(a,b)
p.write_text(s,encoding='utf-8')

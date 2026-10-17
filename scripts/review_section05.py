from pathlib import Path
p=Path('src/components/ProjectLibrary.jsx');s=p.read_text(encoding='utf-8-sig');marker='    {saveError && <p role="status">{saveError}</p>}'
addition='''
    {(query || filter !== 'Todos' || onlyFavorites) && <div className="library-search-results">{visible.map(p => <article key={p.title}><a href={p.category==='Personal'?'#personal':p.title==='Realidad virtual y aumentada'||p.title==='Práctica de realidad aumentada'?'#informatica':p.title==='Mapa conceptual HTML'?'#mapa-html':p.title==='Temas de interés'?'#intereses':p.title==='Proyecto de vida'?'#proyecto-vida':'#tecnologia'}>{p.title} ↗</a><button aria-label={'Guardar en favoritos: '+p.title} aria-pressed={favorites.includes(p.title)} onClick={()=>toggleFavorite(p.title)}>{favorites.includes(p.title)?'♥':'♡'}</button></article>)}</div>}
'''
assert marker in s;s=s.replace(marker,marker+addition);p.write_text(s,encoding='utf-8')
p=Path('REVISION_ENTREGA.md');s=p.read_text(encoding='utf-8-sig')
s=s.replace('| D. Mapa conceptual HTML | Tarjeta y visor | Mapa real |','| D / Sección 05. Mapa conceptual HTML | Imagen original integrada y ampliable | Integrado |')
s=s.replace('| E. Tema de interés | Sección propia, dos campos para enlaces, imagen, video y presentación | Confirmar tema; añadir dos direcciones pertinentes, imágenes, video y PowerPoint |','| E / Sección 05. Tema de interés | Cultura japonesa: PDF de 10 diapositivas con imágenes y dos enlaces de consulta | Video específico pendiente; la presentación recibida está en PDF, no en PowerPoint |')
s=s.replace('| F. Prom 2026 | Sección con reproductor y selección de video | Video real del prom |','| F / Sección 05. Prom 2026 | Video original MP4 integrado directamente | Integrado |')
s=s.replace('| G. Proyecto de vida | Sección propia, archivo PowerPoint o enlace de Canva | Presentación real o enlace público accesible |','| G / Sección 05. Proyecto de vida | Estefani: 11 diapositivas PDF; Tatiana: 12 diapositivas PowerPoint; Laura: 10 diapositivas PDF | Integrados; para cumplir literalmente PowerPoint o Canva faltan esos formatos de Estefani y Laura |')
s=s.replace('Informática tiene infografía, práctica y cinco trabajos adicionales integrados; falta el mapa conceptual HTML','Los ocho trabajos de Informática están integrados')
s+='\n## Organización final visible\n\n01 Mi historia; 02 Mundo académico; 03 Realidad virtual y aumentada; 04 Sistemas expertos, IA y robótica; 05 Mapa HTML, cultura japonesa, video prom y los tres proyectos de vida.\n\nEnlaces del tema: Japan National Tourism Organization (patrimonio cultural) y Web Japan. Se conserva el contenido de los documentos originales; no se verificaron sus afirmaciones económicas, académicas ni su formato APA.\n'
p.write_text(s,encoding='utf-8')

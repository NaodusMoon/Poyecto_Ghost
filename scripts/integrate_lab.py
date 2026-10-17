from pathlib import Path
p=Path('src/components/ProjectLibrary.jsx');s=p.read_text(encoding='utf-8-sig').replace("import ProjectExtras from './ProjectExtras';","import ProjectExtras from './ProjectExtras';\nimport ImmersiveLab from './ImmersiveLab';")
s=s.replace("letter:'B'","letter:'01'").replace("letter:'D'","letter:'03'").replace("letter:'E'","letter:'04'").replace("letter:'G'","letter:'06'")
s=s.replace('<div className="project-grid">{chapter.items.map', '<div className="project-grid">{chapter.items.filter(p => chapter.id !== \'informatica\' || !p.asset).map')
s=s.replace('</h2></div></div><div className="project-grid">','</h2></div></div>{chapter.id === \'informatica\' && <ImmersiveLab/>}{chapter.id === \'informatica\' && <h3 className="lab-archive-title">El archivo de lo que sigue <span>Más trabajos de Informática ↘</span></h3>}<div className="project-grid">')
s=s.replace('src="/media/personal/hoja-1.png" alt="Hoja de vida, página 1"','src={selected.asset.preview} alt={selected.title}')
p.write_text(s,encoding='utf-8')
p=Path('src/data/projects.js');s=p.read_text(encoding='utf-8-sig').replace("icon: '◎' },","icon: '◎', asset: {url:'/media/informatica/infografia-rv-ra.pdf',name:'Infografía de realidad virtual y aumentada.pdf',type:'application/pdf',preview:'/media/informatica/infografia-1.webp'} },",1).replace("icon: '✳' },","icon: '✳', asset: {url:'/media/informatica/practica-flor.jpg',name:'Práctica de realidad aumentada.jpg',type:'image/jpeg'} },",1).replace("type: 'application/pdf' }", "type: 'application/pdf', preview:'/media/personal/hoja-1.png' }");p.write_text(s,encoding='utf-8')
p=Path('src/components/ChapterMap.jsx');s=p.read_text(encoding='utf-8-sig');
for a,b in [('B','01'),('C','02'),('D','03'),('E','04'),('F','05'),('G','06')]:s=s.replace("['"+a+"',","['"+b+"',")
s=s.replace("'Lo que aprendo','Asignaturas'","'Mundo académico','Asignaturas'");p.write_text(s,encoding='utf-8')
p=Path('src/components/AcademicGallery.jsx');s=p.read_text(encoding='utf-8-sig').replace('C / TEMAS ACADÉMICOS','02 / MUNDO ACADÉMICO');p.write_text(s,encoding='utf-8')
p=Path('src/App.jsx');s=p.read_text(encoding='utf-8-sig').replace('01 / HOLA, SOMOS LA PROM 2026','BIENVENIDA / HOLA, SOMOS LA PROM 2026').replace('F / PROM 2026','05 / PROM 2026');p.write_text(s,encoding='utf-8')
p=Path('src/components/FutureCorner.jsx');s=p.read_text(encoding='utf-8-sig').replace('04 / UNA CITA CONTIGO','EPÍLOGO / UNA CITA CONTIGO');p.write_text(s,encoding='utf-8')

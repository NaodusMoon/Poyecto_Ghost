from pathlib import Path
import json,re
from PIL import Image
root=Path.cwd();items=json.loads((root/'tmp/section-05/pdfs.json').read_text(encoding='utf-8'));deck=json.loads((root/'tmp/section-05/deck.json').read_text(encoding='utf-8'))
content={'map':{'id':'mapa-html','title':'Mapa conceptual HTML','kind':'map','pages':['/media/seccion-05/mapa-html.jpg'],'original':'/media/seccion-05/mapa-html.jpg','format':'JPG'},'interest':items[0],'lives':[items[1],deck,items[2]]}
for item in [content['map'],content['interest'],*content['lives']]:
 for src in item['pages']:
  with Image.open(root/'public'/src.lstrip('/')) as im:im.verify()
(root/'src/data/section05.json').write_text(json.dumps(content,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'src/components/ProjectLibrary.jsx';s=p.read_text(encoding='utf-8-sig').replace("import TechnologyStudio from './TechnologyStudio';","import TechnologyStudio from './TechnologyStudio';\nimport FinalChapter from './FinalChapter';")
start=s.index("},{id:'intereses'");end=s.index('];',start);s=s[:start]+'}'+s[end:]
s=s.replace("{ci === 1 && <TechnologyStudio onSelect={setSelected}/>}","{ci === 1 && <><TechnologyStudio/><FinalChapter/></>}")
s=s.replace("{ci === 2 && children}",'');p.write_text(s,encoding='utf-8')
p=root/'src/components/TechnologyStudio.jsx';s=p.read_text(encoding='utf-8-sig');s=s.replace('function TechnologyStudio({onSelect})','function TechnologyStudio()');start=s.index('<div className="studio-pending">');end=s.index('</section>}',start);s=s[:start]+s[end:];p.write_text(s,encoding='utf-8')
p=root/'src/components/WorkReader.jsx';s=p.read_text(encoding='utf-8-sig').replace("{item.kind==='slides'?'PowerPoint':'PDF'}","{item.format || (item.original.endsWith('.pptx')?'PowerPoint':'PDF')}");p.write_text(s,encoding='utf-8')
p=root/'src/components/ChapterMap.jsx';s=p.read_text(encoding='utf-8-sig');start=s.index("['05',");end=s.index('];',start);s=s[:start]+"['05','Nuevos caminos','HTML · Intereses · Prom · Vida','#seccion-05']"+s[end:];p.write_text(s,encoding='utf-8')
p=root/'src/App.jsx';s=p.read_text(encoding='utf-8-sig');start=s.index('    <ProjectLibrary>');end=s.index('    </ProjectLibrary>',start)+len('    </ProjectLibrary>');s=s[:start]+'    <ProjectLibrary/>'+s[end:]
s=s.replace("const [video, setVideo] = useState(null); const [videoOpen, setVideoOpen] = useState(false);",'')
start=s.index('    {videoOpen &&');end=s.index('\n  </>;',start);s=s[:start]+s[end:]
p.write_text(s,encoding='utf-8')
p=root/'src/data/projects.js';s=p.read_text(encoding='utf-8-sig');s=s.replace("file: 'mapa html.pdf', icon: '↔'","file: 'mapa html.jpg', icon: '↔', asset:{url:'/media/seccion-05/mapa-html.jpg',name:'Mapa conceptual HTML.jpg',type:'image/jpeg'}")
s=s.replace("file: 'tema de interes.pptx', icon: '♡'","file: 'tema de interes.pdf', icon: '♡', asset:{url:'/media/seccion-05/tema-japon.pdf',name:'Cultura japonesa.pdf',type:'application/pdf',preview:'/media/seccion-05/tema-japon/001.webp'}")
s=s.replace("file: 'proyecto de vida.pptx', icon: '↗'","file: 'proyecto de vida.pptx', icon: '↗', asset:{url:'/media/seccion-05/vida-tatiana.pptx',name:'Proyecto de vida.pptx',type:'application/vnd.openxmlformats-officedocument.presentationml.presentation'}")
p.write_text(s,encoding='utf-8')
print('Final section: map, interest',len(content['interest']['pages']),'life',[len(x['pages']) for x in content['lives']])

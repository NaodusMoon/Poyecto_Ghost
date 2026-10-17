from pathlib import Path
import json
from PIL import Image
root=Path.cwd()
items=json.loads((root/'tmp/section-04/decks.json').read_text(encoding='utf-8'))+json.loads((root/'tmp/section-04/pdfs.json').read_text(encoding='utf-8'))
order=['sistema-experto','folleto-ia','modelo-ia','trabajo-robotica','comic-robotica']
items=sorted(items,key=lambda x:order.index(x['id']))
for item in items:
 for src in item['pages']:
  p=root/'public'/src.lstrip('/');assert p.exists(),p
  with Image.open(p) as im:im.verify()
 assert (root/'public'/item['original'].lstrip('/')).exists()
(root/'src/data/section04.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'src/data/projects.js';s=p.read_text(encoding='utf-8-sig')
for title,slug in [('Sistema experto','sistema-experto'),('Inteligencia artificial','folleto-ia'),('Modelo de inteligencia artificial','modelo-ia'),('Robótica · trabajo escrito con normas APA','trabajo-robotica'),('Cómic de robótica','comic-robotica')]:
 item=next(x for x in items if x['id']==slug)
 lines=s.splitlines()
 for i,line in enumerate(lines):
  if "title: '"+title+"'" in line and 'asset:' not in line:
   ext='pptx' if item['kind']=='slides' else 'pdf'
   asset="asset: {url:'"+item['original']+"',name:'"+title+'.'+ext+"',type:'"+('application/vnd.openxmlformats-officedocument.presentationml.presentation' if ext=='pptx' else 'application/pdf')+"',preview:'"+item['pages'][0]+"'}"
   lines[i]=line.replace(' },',', '+asset+' },')
 s='\n'.join(lines)+'\n'
p.write_text(s,encoding='utf-8')
print('Verified',sum(len(x['pages']) for x in items),'pages across',len(items),'works')

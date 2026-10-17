from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json
root=Path.cwd();folder=root/'public/media/seccion-05/vida-tatiana';folder.mkdir(parents=True,exist_ok=True);pages=[];thumbs=[]
for path in sorted((root/'tmp/section-05/vida-tatiana').glob('*.png')):
 im=Image.open(path).convert('RGB');out=folder/(path.stem+'.webp');im.save(out,'WEBP',quality=90);pages.append('/media/seccion-05/vida-tatiana/'+out.name);thumbs.append(ImageOps.pad(im,(400,225),color='#eee9df'))
assert pages
item={'id':'vida-tatiana','title':'Andrade Chaguala Tatiana','kind':'slides','pages':pages,'original':'/media/seccion-05/vida-tatiana.pptx','format':'PowerPoint'}
(root/'tmp/section-05/deck.json').write_text(json.dumps(item,ensure_ascii=False),encoding='utf-8')
canvas=Image.new('RGB',(1200,225*((len(thumbs)+2)//3)),'white')
for i,im in enumerate(thumbs):canvas.paste(im,((i%3)*400,(i//3)*225))
canvas.save(root/'tmp/section-05/review-tatiana.jpg');print('Tatiana:',len(pages))

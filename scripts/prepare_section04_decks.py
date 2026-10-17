from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
import json
root=Path(__file__).resolve().parents[1]
items=[];thumbs=[]
for slug,title in [('sistema-experto','Sistema experto'),('modelo-ia','Modelo de inteligencia artificial')]:
    folder=root/'public/media/seccion-04'/slug;folder.mkdir(parents=True,exist_ok=True);pages=[]
    files=sorted((root/'tmp/section-04'/slug).glob('*.png'))
    assert files,slug
    for i,path in enumerate(files):
        im=Image.open(path).convert('RGB');out=folder/(path.stem+'.webp');im.save(out,'WEBP',quality=90)
        pages.append('/media/seccion-04/'+slug+'/'+out.name)
        thumb=ImageOps.pad(im,(400,225),color='#eee9df');ImageDraw.Draw(thumb).text((8,8),slug+' / '+str(i+1),fill='black',stroke_width=1,stroke_fill='white');thumbs.append(thumb)
    print(slug,len(pages))
    items.append({'id':slug,'title':title,'kind':'slides','pages':pages,'original':'/media/seccion-04/'+slug+'.pptx'})
(root/'tmp/section-04/decks.json').write_text(json.dumps(items,ensure_ascii=False),encoding='utf-8')
canvas=Image.new('RGB',(1200,225*((len(thumbs)+2)//3)),'white')
for i,im in enumerate(thumbs):canvas.paste(im,((i%3)*400,(i//3)*225))
canvas.save(root/'tmp/section-04/review-slides.jpg')

from pathlib import Path
import json
import fitz
from PIL import Image, ImageOps, ImageDraw
root = Path(__file__).resolve().parents[1]
source = Path('C:/Users/NaodusMoon/Downloads')
items = [('dprc','DPRC.pdf','DPRC','carousel'),('etica','ETICA.pdf','Ética','carousel'),('ingles','INGLES.pdf','Inglés','slides'),('educacion-fisica','E.D FÍSICA.pdf','Educación Física','slides')]
manifest=[]
thumbs=[]
for slug, name, title, mode in items:
    doc=fitz.open(source/name)
    folder=root/'public'/'academico'/slug
    folder.mkdir(parents=True,exist_ok=True)
    pages=[]
    for i,page in enumerate(doc):
        scale=min(2.5,1800/max(page.rect.width,page.rect.height))
        pix=page.get_pixmap(matrix=fitz.Matrix(scale,scale),alpha=False)
        image=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
        path=folder/f'{i+1:03}.webp'
        image.save(path,'WEBP',quality=88,method=5)
        pages.append('/academico/'+slug+'/'+path.name)
        if i in [0,len(doc)-1]:
            thumb=ImageOps.pad(image,(360,260),color='#eee9df')
            ImageDraw.Draw(thumb).text((10,10),f'{slug} / {i+1}',fill='black',stroke_width=1,stroke_fill='white')
            thumbs.append(thumb)
    print(title, 'pages:',len(doc),'images on pages:',[len(p.get_images()) for p in doc], 'text:',doc[0].get_text()[:180].replace('\n',' '))
    manifest.append({'id':slug,'title':title,'mode':mode,'pages':pages})
(root/'src'/'data'/'academics.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
canvas=Image.new('RGB',(720,260*((len(thumbs)+1)//2)),'white')
for i,im in enumerate(thumbs): canvas.paste(im,((i%2)*360,(i//2)*260))
canvas.save(root/'public'/'academico'/'revision.jpg')

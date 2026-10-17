from pathlib import Path
import json,shutil
import pymupdf
from PIL import Image,ImageOps,ImageDraw
root=Path(__file__).resolve().parents[1];source=Path('C:/Users/NaodusMoon/Downloads');items=[('tema-japon','PRESENTACIÓN TEMA DE INTERÉS.pdf','Cultura japonesa'),('vida-estefani','PRESENTACIÓN PROYECTO DE VIDA.pdf','Peña Urquiola Estefani'),('vida-laura','PRESENTACIÓN PROYECTO DE VIDA (1).pdf','Melo Sánchez Laura')]
manifest=[];thumbs=[]
for slug,name,title in items:
 folder=root/'public/media/seccion-05'/slug;folder.mkdir(parents=True,exist_ok=True);shutil.copyfile(source/name,root/f'public/media/seccion-05/{slug}.pdf');doc=pymupdf.open(source/name);pages=[]
 for i,page in enumerate(doc):
  scale=min(2.5,1920/max(page.rect.width,page.rect.height));pix=page.get_pixmap(matrix=pymupdf.Matrix(scale,scale),alpha=False);im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples);path=folder/f'{i+1:03}.webp';im.save(path,'WEBP',quality=90);pages.append('/media/seccion-05/'+slug+'/'+path.name)
  if i in [0,len(doc)-1]:
   thumb=ImageOps.pad(im,(400,250),color='#eee9df');ImageDraw.Draw(thumb).text((8,8),slug+' / '+str(i+1),fill='black',stroke_width=1,stroke_fill='white');thumbs.append(thumb)
 manifest.append({'id':slug,'title':title,'kind':'slides','pages':pages,'original':f'/media/seccion-05/{slug}.pdf','format':'PDF'})
 print(slug,len(doc))
(root/'tmp/section-05/pdfs.json').write_text(json.dumps(manifest,ensure_ascii=False),encoding='utf-8')
canvas=Image.new('RGB',(800,250*((len(thumbs)+1)//2)),'white')
for i,im in enumerate(thumbs):canvas.paste(im,((i%2)*400,(i//2)*250))
canvas.save(root/'tmp/section-05/review-pdfs.jpg')
shutil.copyfile(source/'PROM 2026.mp4',root/'public/media/seccion-05/prom-2026.mp4');shutil.copyfile(source/'html.jpg',root/'public/media/seccion-05/mapa-html.jpg')

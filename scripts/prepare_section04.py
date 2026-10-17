from pathlib import Path
import pymupdf,json,shutil
from PIL import Image,ImageOps,ImageDraw
root=Path(__file__).resolve().parents[1]
source=Path('C:/Users/NaodusMoon/Downloads')
items=[('folleto-ia','FOLLETO INTELIGENCIA ARTIFICIAL.pdf','Folleto sobre inteligencia artificial','brochure'),('trabajo-robotica','TRABAJO ESCRITO ROBÓTICA.pdf','Trabajo escrito sobre robótica','document'),('comic-robotica','COMIC ROBÓTICA.pdf','Cómic de robótica','comic')]
manifest=[];thumbs=[]
for slug,name,title,kind in items:
    folder=root/'public/media/seccion-04'/slug;folder.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(source/name,root/f'public/media/seccion-04/{slug}.pdf')
    doc=pymupdf.open(source/name);pages=[]
    print(slug,'pages',len(doc),'first text:',doc[0].get_text()[:350].replace('\n',' ').encode('ascii','replace').decode())
    for i,page in enumerate(doc):
        scale=min(2.5,2000/max(page.rect.width,page.rect.height))
        pix=page.get_pixmap(matrix=pymupdf.Matrix(scale,scale),alpha=False)
        im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        name=f'{i+1:03}.webp'
        if not (folder/name).exists(): im.save(folder/name,'WEBP',quality=90)
        pages.append('/media/seccion-04/'+slug+'/'+name)
        if i in [0,len(doc)-1]:
            thumb=ImageOps.pad(im,(400,300),color='#eee9df');ImageDraw.Draw(thumb).text((8,8),slug+' / '+str(i+1),fill='black',stroke_width=1,stroke_fill='white');thumbs.append(thumb)
    manifest.append({'id':slug,'title':title,'kind':kind,'pages':pages,'original':f'/media/seccion-04/{slug}.pdf'})
(root/'tmp/section-04/pdfs.json').write_text(json.dumps(manifest,ensure_ascii=False),encoding='utf-8')
canvas=Image.new('RGB',(800,300*((len(thumbs)+1)//2)),'white')
for i,im in enumerate(thumbs):canvas.paste(im,((i%2)*400,(i//2)*300))
canvas.save(root/'tmp/section-04/review-pdfs.jpg')



from pathlib import Path
import json
import pymupdf
from PIL import Image
root=Path(__file__).resolve().parents[1]
doc=pymupdf.open(root/'public/media/informatica/infografia-rv-ra.pdf')
pages=[]
for i,page in enumerate(doc):
    pix=page.get_pixmap(matrix=pymupdf.Matrix(2,2),alpha=False)
    im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    path=root/f'public/media/informatica/infografia-{i+1}.webp'
    im.save(path,'WEBP',quality=92)
    pages.append({'src':f'/media/informatica/infografia-{i+1}.webp','width':im.width,'height':im.height})
    print('Page',i+1, im.size, page.get_text()[:600])
(root/'src/data/infographic.json').write_text(json.dumps(pages),encoding='utf-8')

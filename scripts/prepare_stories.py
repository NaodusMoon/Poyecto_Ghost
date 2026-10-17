from pathlib import Path
import subprocess,imageio_ffmpeg,shutil,json
from concurrent.futures import ThreadPoolExecutor
root=Path(__file__).resolve().parents[1];folder=root/'public/media/personal';exe=imageio_ffmpeg.get_ffmpeg_exe()
items=[('laura','C:/Users/NaodusMoon/Downloads/HISTORIA DE VIDA MELO SANCHEZ LAURA .mp4','Melo Sánchez Laura',576,1024),('tatiana','C:/Users/NaodusMoon/Downloads/HISTORIA DE VIDA ANDRADE CHAGUALA TATIANA.mp4','Andrade Chaguala Tatiana',384,368),('original',str(folder/'historia-de-vida.mp4'),'Peña Urquiola Estefani Andreina',1280,720)]
def convert(item):
 slug,source,title,width,height=item;stem='historia-'+slug;original=folder/(stem+'.mp4')
 if Path(source).resolve()!=original.resolve():shutil.copyfile(source,original)
 subprocess.run([exe,'-hide_banner','-loglevel','error','-y','-ss','1','-i',str(original),'-frames:v','1',str(folder/(stem+'-poster.jpg'))],check=True)
 subprocess.run([exe,'-hide_banner','-loglevel','warning','-y','-i',str(original),'-vf',"scale=w='min(960,iw)':h=-2",'-c:v','libvpx-vp9','-crf','33','-b:v','0','-deadline','realtime','-cpu-used','8','-row-mt','1','-threads','2','-pix_fmt','yuv420p','-c:a','libopus','-b:a','96k',str(folder/(stem+'.webm'))],check=True)
 print(slug,'ready',flush=True)
 return {'id':slug,'title':title,'mp4':'/media/personal/'+stem+'.mp4','webm':'/media/personal/'+stem+'.webm','poster':'/media/personal/'+stem+'-poster.jpg','width':width,'height':height}
with ThreadPoolExecutor(max_workers=3) as pool:result=list(pool.map(convert,items))
(root/'src/data/stories.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')


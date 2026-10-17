import subprocess,imageio_ffmpeg
from pathlib import Path
root=Path.cwd();exe=imageio_ffmpeg.get_ffmpeg_exe();source=root/'public/media/seccion-05/prom-2026.mp4'
subprocess.run([exe,'-hide_banner','-loglevel','warning','-y','-i',str(source),'-map','0:v:0','-map','0:a:0','-c:v','libvpx-vp9','-crf','32','-b:v','0','-deadline','realtime','-cpu-used','6','-row-mt','1','-threads','4','-pix_fmt','yuv420p','-c:a','libopus','-b:a','96k',str(root/'public/media/seccion-05/prom-2026-web.webm')],check=True)
subprocess.run([exe,'-hide_banner','-loglevel','warning','-y','-i',str(source),'-c:v','libx264','-profile:v','baseline','-level','3.1','-pix_fmt','yuv420p','-crf','22','-preset','fast','-c:a','aac','-b:a','128k','-movflags','+faststart',str(root/'public/media/seccion-05/prom-2026-web.mp4')],check=True)
subprocess.run([exe,'-hide_banner','-loglevel','error','-ss','1','-i',str(source),'-frames:v','1','-y',str(root/'public/media/seccion-05/prom-poster.jpg')],check=True)
print('WebM, compatible MP4 and poster created')

import subprocess,imageio_ffmpeg
from pathlib import Path
root=Path.cwd();(root/'tmp/video-check').mkdir(parents=True,exist_ok=True)
exe=imageio_ffmpeg.get_ffmpeg_exe()
for second in [1,44,100]:
 subprocess.run([exe,'-hide_banner','-loglevel','error','-ss',str(second),'-i','public/media/seccion-05/prom-2026.mp4','-frames:v','1','-y',f'tmp/video-check/prom-{second}.jpg'],check=True)

from pathlib import Path
import subprocess,imageio_ffmpeg
root=Path.cwd();out=root/'public/media/seccion-05/recuerdos';out.mkdir(parents=True,exist_ok=True)
for t in [15,75,95,170]:
 subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-loglevel','error','-ss',str(t),'-i',str(root/'public/media/seccion-05/prom-2026.mp4'),'-frames:v','1','-y',str(out/f'{t}.jpg')],check=True)


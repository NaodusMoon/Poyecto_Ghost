import imageio_ffmpeg,subprocess
from pathlib import Path
exe=imageio_ffmpeg.get_ffmpeg_exe();root=Path.cwd()
for name,src in [('original','public/media/personal/historia-de-vida.mp4'),('tatiana','C:/Users/NaodusMoon/Downloads/HISTORIA DE VIDA ANDRADE CHAGUALA TATIANA.mp4')]:
 subprocess.run([exe,'-hide_banner','-loglevel','error','-ss','1','-i',src,'-frames:v','1','-y',f'tmp/video-check/{name}.jpg'],check=True)

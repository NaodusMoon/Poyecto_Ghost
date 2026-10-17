from pathlib import Path
import subprocess,imageio_ffmpeg,json
root=Path.cwd();exe=imageio_ffmpeg.get_ffmpeg_exe();p=root/'src/data/stories.json';stories=json.loads(p.read_text(encoding='utf-8-sig'));times={'tatiana':[30,150,220],'laura':[20,80,140],'original':[20,80,145]}
for story in stories:
 folder=root/'public/media/personal'/('recuerdos-'+story['id']);folder.mkdir(parents=True,exist_ok=True);story['moments']=[]
 for second in times[story['id']]:
  name=str(second)+'.jpg';target=folder/name
  subprocess.run([exe,'-hide_banner','-loglevel','error','-y','-ss',str(second),'-i',str(root/'public'/story['mp4'].lstrip('/')),'-frames:v','1',str(target)],check=True)
  story['moments'].append({'time':second,'src':'/media/personal/recuerdos-'+story['id']+'/'+name})
p.write_text(json.dumps(stories,ensure_ascii=False,indent=2),encoding='utf-8')

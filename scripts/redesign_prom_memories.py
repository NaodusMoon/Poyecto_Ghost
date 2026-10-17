from pathlib import Path
p=Path('src/components/FinalChapter.jsx');s=p.read_text(encoding='utf-8-sig').replace("import ProjectExtras from './ProjectExtras';\n",'').replace("import PromVideo from './PromVideo';","import PromCollage from './PromCollage';")
a=s.index('<details className="topic-support">');b=s.index('</details>',a)+len('</details>');s=s[:a]+s[b:]
a=s.index('<div className="prom-film"');b=s.index('</article>',a);s=s[:a]+'<PromCollage/>'+s[b:]
p.write_text(s,encoding='utf-8')

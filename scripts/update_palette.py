from pathlib import Path
p=Path('src/styles/global.css')
s=p.read_text(encoding='utf-8-sig')
colors={'293b29':'183e49','2d412f':'123e4b','2c422f':'174b59','2e442f':'174b59','30402b':'153c48','273a24':'173c48','243423':'123c49','1b281c':'0f303b','263824':'173d48','2c422f':'174b59','2e442f':'174b59','4e6240':'286577','4f663a':'276275','52633b':'285c6c','5b6c3a':'336777','614321':'8c573b','68725a':'51727b','747768':'6c7c80','737968':'6b7d82','7b7d70':'748085','7e826b':'73868b','7b806e':'72858a','7b8554':'477d8c','75814b':'427a8c','7c8a4a':'498699','7b8951':'508398','7a8849':'407c8d','7b8658':'4e7e8c','879368':'70959e','7e8c58':'628f9b','79875d':'7198a0','a8ac8b':'90acb4','aeb69a':'9cb6bd','bcc1aa':'b3c6cb','c9cbb8':'c6d3d3','c4c8b4':'c0d0d4','c6cbb8':'c2d1d5','b9c0a6':'b7cbd0','b9c3a3':'b2c9ce','a7ae94':'a7c0c7','b5bea0':'adc7ce','bfc6aa':'b5cbd1','bdc5a8':'b6ccd1','bec79e':'adc6ce','dbe59c':'bdd9e1','dce5af':'c4dfe6','e1e7ca':'d2e3e7','dce3b9':'cbdee4','e6eacb':'d8e7eb','e7b853':'deaf75','e9dfc5':'ece0cb','e7d5c3':'e8d9cc','d7df8f':'b4d5df','e7b853':'dfb27b'}
for a,b in colors.items():s=s.replace('#'+a,'#'+b)
p.write_text(s,encoding='utf-8')
p=Path('src/components/FlowerScene.jsx');s=p.read_text(encoding='utf-8-sig').replace('#e8ec9a','#b7dce7').replace('#c6a356','#d5a86b');p.write_text(s,encoding='utf-8')

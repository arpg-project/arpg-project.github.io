/* A deterministic geometric analogy, not measured embeddings or a training simulation. */
(() => {
  const root=document.querySelector('.space-explainer');
  if(!root)return;
  const $=id=>document.getElementById(id);
  const strings={
    en:{eyebrow:'VISUAL INTUITION',title:'Same actions.<br>A better space to learn.',intro:'First learn how actions are organized. Then learn to generate them.',raw:'Raw actions',latent:'Action representations',legendPoints:'Points · action sequences',legendSurface:'Mesh · learned structure',badge:'Conceptual visualization · 20 seconds',chapters:['Original','Encode','Learn'],titles:['The same actions. Two ways to learn.','An encoder reorganizes the same samples.','A structured space can be easier to model.'],play:'Play animation',pause:'Pause animation',replay:'Replay animation',timeline:'Animation timeline',evidenceLabel:'THE EXPERIMENT',evidence:'Raw action generation <strong>13.3%</strong> → Generation in action representation space&nbsp;<strong>57.8%</strong>',evidenceLink:'DexJoCo overall success · Table 2(a) ↗',details:'How this relates to ARPG',decoding:'ARPG learns representations using video–action alignment. A generator learns in this frozen space; a decoder converts generated representations into robot actions.',caveat:'This is a geometric analogy, not measured embeddings or a training simulation. A useful representation need not be flat or lower-dimensional. Benefits depend on the pretraining objective, retained motion information, and decoder quality. The ablation does not establish manifold flattening as the cause.'},
    zh:{eyebrow:'直观理解',title:'同样的动作，<br>换一个更好学的空间。',intro:'先学会动作如何组织，再学习如何生成。',raw:'原始动作',latent:'动作表征',legendPoints:'数据点 · 动作序列',legendSurface:'曲面 · 学到的结构',badge:'几何类比 · 20 秒概念演示',chapters:['原始数据','编码整理','学习生成'],titles:['同一批动作，两种学习方式。','编码器，让同一批数据更有序。','有结构的空间，可能更容易拟合。'],play:'播放动画',pause:'暂停动画',replay:'重播动画',timeline:'动画进度',evidenceLabel:'实验证据',evidence:'原始动作生成 <strong>13.3%</strong> → 动作表征空间生成 <strong>57.8%</strong>',evidenceLink:'DexJoCo 总体成功率 · 表 2(a) ↗',details:'这与 ARPG 有什么关系？',decoding:'ARPG 通过视频与动作对齐学习表征，再在冻结的表征空间中训练生成器，最后由解码器还原机器人动作。',caveat:'这是几何类比，不是真实表征投影或训练仿真。好的表征不必低维或平坦；收益取决于预训练目标、运动信息的保留与解码质量。消融实验支持表征的有效性，但没有证明“流形变平”是提升的原因。'}
  };
  const duration=20, starts=[0,4,11], reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);};
  const lerp=(a,b,t)=>a+(b-a)*t;
  const raw=(u,v)=>.43*Math.sin(u*3.7+v*1.6)+.25*Math.cos(v*4.6-u*1.8)+.12*Math.sin(u*7-v*3);
  // Retain broad, curved structure; the representation is smoother, not flat.
  const structured=(u,v)=>.32*Math.sin(u*2.8+v*.6)+.17*Math.cos(v*3.2-u*.4);
  const samples=Array.from({length:54},(_,i)=>{
    const u=-.87+(i%9)*.2175,v=-.84+Math.floor(i/9)*.336;
    return {u:u+.095*Math.sin(i*71.3),v:v+.1*Math.cos(i*43.7),a:u,b:v};
  });
  let time=0,playing=false,visible=false,previous=0,frame=0,lastChapter=-1,language,text,hasStarted=false;
  const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z"/></svg>';
  const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h3v12H8zm5 0h3v12h-3z"/></svg>';
  const replayIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10a7 7 0 1 1 0 5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 4v7h7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  function draw(canvas,latent){
    const w=canvas.clientWidth,h=canvas.clientHeight;
    if(!w||!h)return;
    const dpr=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
    const morph=latent?ease((time-5)/5):0, fit=ease((time-12)/5);
    const scale=Math.min(w*.345,h*.64);
    // Fixed shared camera preserves point correspondence throughout the transition.
    const project=(u,v,z)=>[w*.5+scale*(u*.86-v*.57),h*.55+scale*(u*.29+v*.43-z*.65)];
    const model=(u,v)=>fit*(latent?structured(u,v):.32*Math.sin(u*3.7+v*1.6)+.15*Math.cos(v*4.6-u*1.8));
    // Soft contact shadow keeps the geometry grounded without a boxed grid floor.
    c.save();c.translate(w*.5,h*.77);c.scale(1,.22);
    const shadow=c.createRadialGradient(0,0,0,0,0,w*.38);shadow.addColorStop(0,'rgba(64,49,93,.13)');shadow.addColorStop(1,'rgba(64,49,93,0)');c.fillStyle=shadow;c.fillRect(-w*.42,-w*.42,w*.84,w*.84);c.restore();
    const grid=30,tiles=[];
    for(let j=0;j<grid;j++)for(let i=0;i<grid;i++){
      const u=-1+2*i/grid,v=-1+2*j/grid,d=2/grid,z=model(u,v);
      const slope=(model(u+.02,v)-z)/.02;
      const light=clamp(.65+slope*.24+(u-v)*.08);
      tiles.push({depth:u*.29+v*.43,pts:[[u,v],[u+d,v],[u+d,v+d],[u,v+d]].map(([a,b])=>project(a,b,model(a,b))),light});
    }
    tiles.sort((a,b)=>a.depth-b.depth);
    for(const tile of tiles){
      c.beginPath();tile.pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();
      const hue=latent?258:246,sat=latent?31:17;
      c.fillStyle=`hsla(${hue},${sat}%,${lerp(73,94,tile.light)}%,${.35+fit*.55})`;c.fill();
      c.strokeStyle=`rgba(${latent?'116,96,164':'128,126,148'},${.10+fit*.14})`;c.lineWidth=.55;c.stroke();
    }
    const points=samples.map(p=>{
      const u=lerp(p.u,p.a,morph),v=lerp(p.v,p.b,morph),z=lerp(raw(p.u,p.v),structured(p.a,p.b),morph);
      return {u,v,z,p:project(u,v,z)};
    }).sort((a,b)=>a.p[1]-b.p[1]);
    for(const s of points){
      const [x,y]=s.p, floor=project(s.u,s.v,model(s.u,s.v));
      if(fit>0){c.beginPath();c.moveTo(x,y);c.lineTo(...floor);c.strokeStyle=`rgba(115,103,145,${fit*.22})`;c.lineWidth=.7;c.stroke();}
      const r=Math.max(2.2,Math.min(3.6,w*.006));
      c.beginPath();c.arc(x,y,r+1.1,0,Math.PI*2);c.fillStyle='rgba(255,255,255,.85)';c.fill();
      const dot=c.createRadialGradient(x-r*.35,y-r*.5,.2,x,y,r);dot.addColorStop(0,latent?'#a393c5':'#aaa5ba');dot.addColorStop(1,latent?'#655087':'#79718d');c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=dot;c.fill();
    }
    // Synchronized path is a visual guide; it does not imply measured sampling dynamics.
    if(time>=17){
      const p=clamp((time-17)/3),u=-.82+1.64*p,v=.21*Math.sin(p*5),[x,y]=project(u,v,model(u,v)),r=Math.max(5,w*.014);
      c.beginPath();for(let i=0;i<=50;i++){const k=p*i/50,a=-.82+1.64*k,b=.21*Math.sin(k*5),pt=project(a,b,model(a,b));i?c.lineTo(...pt):c.moveTo(...pt);}c.strokeStyle=latent?'#8e75b9':'#aaa0bb';c.lineWidth=2;c.stroke();
      c.beginPath();c.ellipse(x,y+2,r*1.4,r*.43,0,0,Math.PI*2);c.fillStyle='rgba(54,36,81,.18)';c.fill();
      const ball=c.createRadialGradient(x-r*.3,y-r*1.4,.4,x,y-r,r);ball.addColorStop(0,'#fff');ball.addColorStop(.45,'#d8cce9');ball.addColorStop(1,'#75618d');c.beginPath();c.arc(x,y-r,r,0,Math.PI*2);c.fillStyle=ball;c.fill();
    }
  }
  function update(){
    const chapter=time<4?0:time<11?1:2;
    if(chapter!==lastChapter){lastChapter=chapter;$('space-caption-title').textContent=text.titles[chapter];root.querySelector('.space-switch').style.setProperty('--step',chapter);root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.setAttribute('aria-pressed',i===chapter));}
    const label=playing?text.pause:time>=duration?text.replay:text.play;
    const button=$('space-play');if(button.getAttribute('aria-label')!==label){button.setAttribute('aria-label',label);button.title=label;button.innerHTML=playing?pauseIcon:time>=duration?replayIcon:playIcon;}
    $('space-time').textContent=`00:${String(Math.floor(time)).padStart(2,'0')} / 00:20`;
    $('space-scrub').value=time;root.querySelector('.space-rail').style.setProperty('--progress',`${time/duration*100}%`);
    draw($('space-raw'),false);draw($('space-latent'),true);
  }
  function translate(){language=document.documentElement.lang.startsWith('zh')?'zh':'en';text=strings[language];root.querySelectorAll('[data-space]').forEach(el=>{el.innerHTML=text[el.dataset.space]||'';});root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.textContent=text.chapters[i]);$('space-scrub').setAttribute('aria-label',text.timeline);lastChapter=-1;update();}
  function tick(now){frame=0;if(!playing||!visible||document.hidden)return;if(previous)time=Math.min(duration,time+(now-previous)/1000);previous=now;if(time>=duration)playing=false;update();if(playing)frame=requestAnimationFrame(tick);}
  function start(){if(frame)cancelAnimationFrame(frame);frame=0;previous=0;if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);update();}
  $('space-play').onclick=()=>{hasStarted=true;if(time>=duration)time=0;playing=!playing;start();};
  $('space-scrub').oninput=e=>{hasStarted=true;time=Number(e.target.value);playing=false;start();};
  root.querySelectorAll('[data-space-chapter]').forEach((button,i)=>button.onclick=()=>{hasStarted=true;time=reduced.matches?[0,10.9,20][i]:starts[i];playing=!reduced.matches;start();});
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new ResizeObserver(update).observe(root);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!hasStarted&&!reduced.matches){hasStarted=true;playing=true;}start();},{threshold:.35}).observe(root.querySelector('.space-player'));
  document.addEventListener('visibilitychange',start);
  reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;start();}});
  translate();
})();

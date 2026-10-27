/* A deterministic geometric analogy, not measured embeddings or a training simulation. */
(() => {
  const root=document.querySelector('.space-explainer');
  if(!root)return;
  const $=id=>document.getElementById(id);
  const strings={
    en:{eyebrow:'VISUAL INTUITION',title:'Same actions.<br>A better space to learn.',intro:'First learn how actions are organized. Then learn to generate them.',raw:'Raw actions',latent:'Action representations',legendPoints:'One point · one action chunk',legendSurface:'Mesh · learned structure',badge:'Conceptual visualization · 26 seconds',chapters:['Action chunk','Encode','Generate','Decode'],titles:['One point stands for a short action sequence.','The encoder maps action chunks to representations.','Conditioned on observations, generate a representation.','The decoder turns a representation into an action chunk.'],play:'Play animation',pause:'Pause animation',replay:'Replay animation',timeline:'Animation timeline',evidenceLabel:'THE EXPERIMENT',evidence:'Raw action generation <strong>13.3%</strong> → Generation in action representation space&nbsp;<strong>57.8%</strong>',evidenceLink:'DexJoCo overall success · Table 2(a) ↗',details:'How this relates to ARPG',decoding:'ARPG learns representations using video–action alignment. A generator learns in this frozen space; a decoder converts generated representations into robot actions.',caveat:'The gripper motion, points and surfaces are conceptual illustrations, not measured robot trajectories, embeddings or a training simulation. Encoding illustrates representation learning; at inference, generation starts from noise, conditioned on observations, without the action encoder. A useful representation need not be flat or lower-dimensional. Benefits depend on the pretraining objective, retained motion information, and decoder quality. The ablation does not establish manifold flattening as the cause.'},
    zh:{eyebrow:'直观理解',title:'同样的动作，<br>换一个更好学的空间。',intro:'先学会动作如何组织，再学习如何生成。',raw:'原始动作',latent:'动作表征',legendPoints:'一个点 · 一段动作',legendSurface:'曲面 · 学到的结构',badge:'几何类比 · 26 秒概念演示',chapters:['动作片段','编码表征','条件生成','解码动作'],titles:['一个点，代表一段连续动作。','编码器，将动作片段映射到表征空间。','以观测为条件，生成动作表征。','解码器，将生成的表征还原为动作片段。'],play:'播放动画',pause:'暂停动画',replay:'重播动画',timeline:'动画进度',evidenceLabel:'实验证据',evidence:'原始动作生成 <strong>13.3%</strong> → 动作表征空间生成 <strong>57.8%</strong>',evidenceLink:'DexJoCo 总体成功率 · 表 2(a) ↗',details:'这与 ARPG 有什么关系？',decoding:'ARPG 通过视频与动作对齐学习表征，再在冻结的表征空间中训练生成器，最后由解码器还原机器人动作。',caveat:'夹爪动作、数据点和曲面均为概念示意，不是真实机器人轨迹、表征投影或训练仿真。编码展示表征学习；推理时以观测为条件，从噪声生成表征，无需动作编码器。好的表征不必低维或平坦；收益取决于预训练目标、运动信息的保留与解码质量。消融实验支持表征的有效性，但没有证明“流形变平”是提升的原因。'}
  };
  const duration=26, starts=[0,5,11,18], reduced=matchMedia('(prefers-reduced-motion: reduce)');
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
  let scrollDriven=false;
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
    const morph=latent?ease((time-5)/6):0, fit=ease((time-12)/5);
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
    if(time>=23){
      const p=clamp((time-23)/3),u=-.82+1.64*p,v=.21*Math.sin(p*5),[x,y]=project(u,v,model(u,v)),r=Math.max(5,w*.014);
      c.beginPath();for(let i=0;i<=50;i++){const k=p*i/50,a=-.82+1.64*k,b=.21*Math.sin(k*5),pt=project(a,b,model(a,b));i?c.lineTo(...pt):c.moveTo(...pt);}c.strokeStyle=latent?'#8e75b9':'#aaa0bb';c.lineWidth=2;c.stroke();
      c.beginPath();c.ellipse(x,y+2,r*1.4,r*.43,0,0,Math.PI*2);c.fillStyle='rgba(54,36,81,.18)';c.fill();
      const ball=c.createRadialGradient(x-r*.3,y-r*1.4,.4,x,y-r,r);ball.addColorStop(0,'#fff');ball.addColorStop(.45,'#d8cce9');ball.addColorStop(1,'#75618d');c.beginPath();c.arc(x,y-r,r,0,Math.PI*2);c.fillStyle=ball;c.fill();
    }
  }
  function drawStory(chapter){
    const canvas=$('space-story'),w=canvas.clientWidth,h=canvas.clientHeight;
    if(!w||!h)return;
    const dpr=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
    // Shared normalized coordinates keep all four scenes legible on a phone.
    const scale=Math.min(w/700,h/170);c.translate((w-700*scale)/2,0);c.scale(scale,scale);
    const zh=language==='zh',ink='#615175',muted='#93899f';
    const word=(en,cn)=>zh?cn:en;
    function label(s,x,y,size=16,color=muted){
      if(w<600)size=Math.max(size,21);
      c.fillStyle=color;c.font=`${size}px system-ui, sans-serif`;c.textAlign='center';
      const units=zh?[...s]:s.split(' '),lines=[];let row='';
      units.forEach(unit=>{const next=row+(row&&!zh?' ':'')+unit;if(row&&c.measureText(next).width>205){lines.push(row);row=unit;}else row=next;});
      lines.push(row);lines.forEach((v,i)=>c.fillText(v,x,y+i*(size+3)));
    }
    function line(points,color=ink,width=2){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();}
    function arrow(x1,x2,y,progress=1){line([[x1,y],[lerp(x1,x2,progress),y]],'#c7bdD3',1.5);if(progress>.98)line([[x2-6,y-4],[x2,y],[x2-6,y+4]],'#c7bdd3',1.5);}
    function dot(x,y,r=8){const g=c.createRadialGradient(x-3,y-4,1,x,y,r);g.addColorStop(0,'#d0c3e7');g.addColorStop(1,'#796397');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
    function box(x,title){c.fillStyle='#f0edf5';c.strokeStyle='#d9d0e5';c.lineWidth=1;c.beginPath();c.roundRect(x-60,49,120,44,12);c.fill();c.stroke();label(title,x,77,17,ink);}
    // Illustrative reach → grasp → lift, not a measured robot pose sequence.
    function pose(x,y,p,alpha=1){
      c.save();c.globalAlpha=alpha;c.translate(x,y);
      const lift=ease((p-.45)/.55)*25,close=ease(p/.45),gap=lerp(18,9,close);
      line([[-28,45],[30,45]],'#ddd6e4',1);
      c.fillStyle='#b4a1cd';c.beginPath();c.roundRect(-7,25-lift,14,15,3);c.fill();
      line([[0,-8-lift],[0,5-lift],[-gap,5-lift],[-gap,30-lift],[-gap+5,30-lift]],ink,2.5);
      line([[0,5-lift],[gap,5-lift],[gap,30-lift],[gap-5,30-lift]],ink,2.5);
      c.restore();
    }
    const local=clamp((time-starts[chapter])/([5,6,7,8][chapter]));
    if(chapter===0){
      const collapse=ease((time-2.2)/2.2);
      [0,.48,1].forEach((p,i)=>pose(lerp(95+i*90,365,collapse),lerp(50,60,collapse),p,1-collapse));
      arrow(325,460,72,collapse);
      dot(lerp(365,520,collapse),72,lerp(2,9,collapse));
      label(word('Action sequence','动作序列（示意）'),190,132);
      label(word('One sample in the plot','图中的一个数据点'),520,132);
    }else if(chapter===1){
      pose(110,49,.5+.5*Math.sin(local*Math.PI));label(word('Action chunk','动作片段'),110,132);
      arrow(160,285,72);box(350,word('Encoder','动作编码器'));arrow(415,540,72);
      const move=ease(local);dot(lerp(170,548,move),72,6);
      dot(590,72,9);label(word('Representation z','动作表征 z'),590,132);
    }else if(chapter===2){
      for(let i=0;i<12;i++)dot(100+22*Math.sin(i*5),72+22*Math.cos(i*7),2.5);
      label(word('Noise','噪声'),100,132);arrow(145,285,72);box(350,word('Generator','生成模型'));arrow(415,545,72);
      label(word('Vision + robot state','视觉观测 + 机器人状态'),350,20,13);
      line([[350,27],[350,43]],'#c7bdd3',1.5);
      dot(lerp(450,590,ease(local)),72,9);label(word('Generated representation','生成的动作表征'),590,132);
    }else{
      dot(90,72,9);label(word('Generated representation','生成的动作表征'),100,132);
      arrow(135,245,72);box(310,word('Decoder','动作解码器'));arrow(375,445,72,ease(local*3));
      [0,.48,1].forEach((p,i)=>pose(485+i*75,49,p,.2+.8*ease(local*3-i*.3)));
      label(word('Decoded action chunk','解码动作（示意）'),560,132);
    }
    canvas.setAttribute('aria-label',text.titles[chapter]);
  }
  function update(){
    const chapter=time<5?0:time<11?1:time<18?2:3;
    if(chapter!==lastChapter){const initial=lastChapter<0;lastChapter=chapter;const caption=text.titles[chapter];if(initial)$('space-caption-title').textContent=caption;else window.arpgControls.transition('space-caption',['#space-caption-title'],()=>{$('space-caption-title').textContent=caption;});root.querySelector('.space-switch').style.setProperty('--step',chapter);root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.setAttribute('aria-pressed',i===chapter));}
    const label=playing?text.pause:time>=duration?text.replay:text.play;
    const button=$('space-play');if(button.getAttribute('aria-label')!==label){button.setAttribute('aria-label',label);button.title=label;button.innerHTML=playing?pauseIcon:time>=duration?replayIcon:playIcon;}
    $('space-time').textContent=`00:${String(Math.floor(time)).padStart(2,'0')} / 00:26`;
    $('space-scrub').value=time;root.querySelector('.space-rail').style.setProperty('--progress',`${time/duration*100}%`);
    drawStory(chapter);
    draw($('space-raw'),false);draw($('space-latent'),true);
  }
  function translate(){language=document.documentElement.lang.startsWith('zh')?'zh':'en';text=strings[language];root.querySelectorAll('[data-space]').forEach(el=>{el.innerHTML=text[el.dataset.space]||'';});root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.textContent=text.chapters[i]);$('space-scrub').setAttribute('aria-label',text.timeline);lastChapter=-1;if(scrollDriven)root.querySelector('.space-footnote').textContent=language==='zh'?'向下滚动，逐步观看 · 也可点击阶段或拖动进度':'Scroll to explore · or select a chapter and scrub';update();}
  function tick(now){frame=0;if(!playing||!visible||document.hidden)return;if(previous)time=Math.min(duration,time+(now-previous)/1000);previous=now;if(time>=duration)playing=false;update();if(playing)frame=requestAnimationFrame(tick);}
  function start(){if(frame)cancelAnimationFrame(frame);frame=0;previous=0;if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);update();}
  $('space-play').onclick=()=>{hasStarted=true;if(time>=duration)time=0;playing=!playing;start();};
  $('space-scrub').oninput=e=>{if(scrollDriven){document.dispatchEvent(new CustomEvent('arpg:space-seek',{detail:Number(e.target.value)/duration}));return;}hasStarted=true;time=Number(e.target.value);playing=false;start();};
  root.querySelectorAll('[data-space-chapter]').forEach((button,i)=>button.onclick=()=>{if(scrollDriven){document.dispatchEvent(new CustomEvent('arpg:space-seek',{detail:(starts[i]+.05)/duration}));return;}hasStarted=true;time=reduced.matches?[4.9,10.9,17.9,26][i]:starts[i];playing=!reduced.matches;start();});
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new ResizeObserver(update).observe(root);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!hasStarted&&!reduced.matches&&!scrollDriven){hasStarted=true;playing=true;}start();},{threshold:.35}).observe(root.querySelector('.space-player'));
  document.addEventListener('visibilitychange',start);
  reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;start();}});
  window.arpgSpace={
    setScrollMode(enabled){scrollDriven=enabled;playing=false;start();},
    seek(progress){time=clamp(progress)*duration;playing=false;hasStarted=true;start();}
  };
  translate();
})();

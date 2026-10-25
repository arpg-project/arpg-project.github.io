/* Deterministic conceptual geometry; no experimental embeddings or training metrics. */
(() => {
  const root = document.querySelector('.space-explainer');
  if (!root) return;
  const $ = id => document.getElementById(id);
  const strings = {
    en: {eyebrow:'VISUAL INTUITION · 32 SECONDS',title:'Change the space.<br>Change the learning problem.',intro:'The same actions can be easier to model in a learned representation. Watch the data change coordinates before the generator learns their structure.',badge:'A GEOMETRIC ANALOGY',raw:'Direct action generation',rawSub:'Model the original action coordinates',latent:'Generation in a learned representation',legendPoints:'● Points: corresponding action samples',legendSurface:'▧ Mesh: structure approximated by the generator',duration:'32 s',evidenceLabel:'CHECK THE EXPERIMENT',evidence:'Raw Action <strong>13.3%</strong> → Visual Alignment <strong>57.8%</strong>',evidenceLink:'DexJoCo overall success · Table 2(a) ↗',caveat:'Conceptual animation, not a projection of measured embeddings or a training simulation. A useful representation need not be lower-dimensional or flat. Its benefit depends on the pretraining objective, motion information retained, and decoder quality; the ablation does not establish manifold flattening as the cause.',play:'Play',pause:'Pause',replay:'Replay',timeline:'Animation timeline',chapters:['01 · Raw actions','02 · Encode','03 · Generate','04 · Decode'],sub:['Same samples, before encoding','Action samples → pretrained encoder → representations','Observations + robot state → generator → representations','Generated representation → frozen decoder → action chunk'],titles:['Actions have structure. Raw coordinates can hide it.','Learn a better coordinate system first.','Now the generator learns in this fixed space.','Decode the representation back into actions.'],body:['Each dot stands for an action sequence. Coordinated joints and timing create dependencies. The folded geometry is a visual analogy for a distribution that is difficult to model with limited data.','Follow the moving points: these are the same examples, reorganized. In ARPG, alignment with human-manipulation video features supplies a pretraining signal for learning action structure.','The meshes illustrate approximated structure, not single predictions. A well-chosen representation can make the conditional distribution easier to learn. ARPG trains a flow-matching generator in the frozen representation space.','At inference, the generator starts from noise and uses visual observations and robot state. A frozen decoder converts its output into an action chunk. The action encoder does not run at inference.']},
    zh: {eyebrow:'直观理解 · 32 秒动画',title:'换一个空间，<br>改变学习的难度。',intro:'同样的动作，换一种表征，可能更容易建模。先看编码器如何组织数据，再看生成模型如何学习其中的结构。',badge:'流形视角 · 几何类比',raw:'直接在原始动作空间生成',rawSub:'生成模型直接学习原始动作坐标',latent:'在预训练动作表征空间生成',legendPoints:'● 数据点：一一对应的动作样本',legendSurface:'▧ 网格：生成模型近似学到的结构',duration:'32 秒',evidenceLabel:'回到实验证据',evidence:'原始动作 <strong>13.3%</strong> → 视觉对齐表征 <strong>57.8%</strong>',evidenceLink:'DexJoCo 总体成功率 · 表 2(a) ↗',caveat:'本动画是概念示意，不是真实表征的降维投影，也不是训练过程仿真。好的表征不必低维或平坦；收益取决于预训练目标、运动信息的保留与解码质量。消融实验支持表征的有效性，但没有证明“流形变平”是提升的原因。',play:'播放',pause:'暂停',replay:'重播',timeline:'动画进度',chapters:['01 · 原始动作','02 · 编码重组','03 · 学习生成','04 · 解码动作'],sub:['编码前：与左侧一一对应的样本','动作样本 → 预训练编码器 → 动作表征','视觉观测 + 机器人状态 → 生成器 → 表征','生成的表征 → 冻结解码器 → 动作块'],titles:['动作本来有规律，原始坐标却未必容易学。','先学会一种更适合建模的坐标。','再让生成模型学习这个固定的表征空间。','最后，将生成的表征解码为动作。'],body:['每个点代表一段动作序列。关节协同与时间关系形成复杂依赖。这里用起伏、折叠的几何结构，类比有限数据下难以建模的动作分布。','观察数据点的连续移动：还是同一批样本，只是换了组织方式。ARPG 通过与人类操作视频特征对齐，为动作编码器提供学习运动与交互结构的预训练信号。','网格代表模型近似学到的结构，不是单次预测。合适的表征可能让条件分布更容易学习。ARPG 冻结表征空间，在其中训练 Flow Matching 生成模型。','推理时，生成器从噪声出发，结合视觉观测与机器人状态生成表征，再由冻结的解码器输出动作块。动作编码器不参与推理。']}
  };
  let time = 0, playing = false, visible = false, previous = 0, frame = 0, lastChapter = -1;
  let language, text;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = x => Math.max(0, Math.min(1,x));
  const smooth = x => { x=clamp(x); return x*x*(3-2*x); };
  const samples = Array.from({length:66},(_,i)=>({u: Math.sin(i*127.1+2)*.92,v:Math.sin(i*311.7+7)*.92}));
  const raw = (u,v) => .48*Math.sin(u*4+v*2)+.28*Math.cos(v*5-u*2)+.15*Math.sin(u*8-v*4);
  const simple = (u,v) => .13*Math.sin(u*2)+.10*v*v;
  function draw(canvas, latent) {
    const w=canvas.clientWidth,h=canvas.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
    const morph=latent?smooth((time-8)/7):0;
    const fit=smooth((time-16)/7);
    const project=(u,v,z)=>[w*.5+(u*.83-v*.48)*w*.31,h*.54+(u*.23+v*.36-z*.55)*h*.66];
    const target=(u,v)=>raw(u,v)*(1-morph)+simple(u,v)*morph;
    // Deliberately illustrative low-frequency approximation, not a fitted experimental model.
    const model=(u,v)=>fit*(latent?target(u,v):(.32*Math.sin(u*4+v*2)+.15*Math.cos(v*5-u*2)));
    const polygon=(pts,fill,stroke)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();c.strokeStyle=stroke;c.lineWidth=.65;c.stroke();};
    const grid=23;
    for(let j=0;j<grid;j++) for(let i=0;i<grid;i++){
      const u=-1+2*i/grid,v=-1+2*j/grid,d=2/grid;
      const z=model(u,v),pts=[[u,v],[u+d,v],[u+d,v+d],[u,v+d]].map(([a,b])=>project(a,b,model(a,b)));
      const hue=latent?173+z*40:221+z*60;
      polygon(pts,`hsla(${hue},52%,${31+z*15}%,${.17+fit*.56})`,`hsla(${hue},55%,65%,${.09+fit*.3})`);
    }
    const points=samples.map((p,i)=>({...p,i,p:project(p.u,p.v,target(p.u,p.v))})).sort((a,b)=>a.p[1]-b.p[1]);
    for(const s of points){
      const end=project(s.u,s.v,model(s.u,s.v));
      if(fit>0){c.beginPath();c.moveTo(...s.p);c.lineTo(...end);c.strokeStyle=`rgba(244,212,149,${fit*.3})`;c.stroke();}
      c.beginPath();c.arc(...s.p,2.5,0,Math.PI*2);c.fillStyle='#d0ddfa';c.shadowColor=c.fillStyle;c.shadowBlur=7;c.fill();c.shadowBlur=0;
    }
    if(time>=24){
      const progress=smooth((time-24)/6),u=-.8+1.6*progress,v=.22*Math.sin(progress*5);
      const pt=project(u,v,model(u,v));c.beginPath();c.arc(...pt,7,0,Math.PI*2);c.strokeStyle='#fff';c.lineWidth=2;c.stroke();
      c.fillStyle='#b6c7d7';c.font='12px system-ui';c.textAlign='center';c.fillText(latent?(language==='zh'?'生成表征 z → 解码 D(z) → 动作 a':'Generated z → decode D(z) → action a'):(language==='zh'?'直接输出动作 a':'Direct output: action a'),w/2,h-12);
    }
  }
  function update(){
    const chapter=Math.min(3,Math.floor(time/8));
    if(chapter!==lastChapter){lastChapter=chapter;$('space-step').textContent=`0${chapter+1} / 04`;$('space-caption-title').textContent=text.titles[chapter];$('space-caption-body').textContent=text.body[chapter];$('space-right-sub').textContent=text.sub[chapter];root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.setAttribute('aria-pressed',i===chapter));}
    $('space-play').textContent=playing?text.pause:text.play;
    $('space-time').textContent=`${String(Math.floor(time)).padStart(2,'0')} / 32 ${language==='zh'?'秒':'s'}`;
    $('space-scrub').value=time;
    draw($('space-raw'),false);draw($('space-latent'),true);
  }
  function translate(){language=document.documentElement.lang.startsWith('zh')?'zh':'en';text=strings[language];root.querySelectorAll('[data-space]').forEach(el=>el.innerHTML=text[el.dataset.space]);root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.textContent=text.chapters[i]);$('space-replay').textContent=text.replay;$('space-scrub').setAttribute('aria-label',text.timeline);lastChapter=-1;update();}
  function tick(now){frame=0;if(!playing||!visible||document.hidden)return;if(previous)time=Math.min(32,time+(now-previous)/1000);previous=now;if(time>=32)playing=false;update();if(playing)frame=requestAnimationFrame(tick);}
  function start(){if(frame)cancelAnimationFrame(frame);previous=0;if(playing&&visible&&!document.hidden)frame=requestAnimationFrame(tick);update();}
  $('space-play').onclick=()=>{if(time>=32)time=0;playing=!playing;start();};
  $('space-replay').onclick=()=>{time=0;playing=!reduced.matches;start();};
  $('space-scrub').oninput=e=>{time=Number(e.target.value);playing=false;start();};
  root.querySelectorAll('[data-space-chapter]').forEach((b,i)=>b.onclick=()=>{time=i*8;playing=false;start();});
  new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new ResizeObserver(()=>update()).observe(root);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;start();},{threshold:.1}).observe(root.querySelector('.space-player'));
  document.addEventListener('visibilitychange',start);
  reduced.addEventListener('change',()=>{if(reduced.matches){playing=false;start();}});
  translate();
})();

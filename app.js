const copy = {
  en: {},
  zh: {
    navMethod:'方法',navResults:'实验结果',navReal:'真实机器人',navScaling:'Scaling',paper:'论文',heroEyebrow:'动作表征预训练与生成',heroLine1:'通过动作表征预训练',heroLine2:'扩展灵巧操作能力',heroLine3:'ARPG',heroSub:'先学习动作空间，再学习如何行动。<br>将人类操作数据与轻量级机器人生成策略连接起来。',readPaper:'阅读论文',exploreMethod:'探索方法',heroMeta:'匿名研究稿件 · 作者信息暂不公开',hammer:'锤子交接',coffee:'倾倒咖啡豆',cabinet:'柜体取物',galleryCaption:'真实机器人 · 双手协同 · 长时程灵巧操作',galleryNote:'实验静帧 · 图 3',stat1:'DEXJOCO · 多任务整体成功率',stat1Note:'对比 π0.5 的 35.0% · 11 项任务',stat2:'DEXJOCO · 多任务双手成功率',stat2Note:'对比 π0.5 的 10.1% · 5 项任务',stat3:'下游生成主干参数量',stat3Note:'推理活跃总参数量为 0.46B',motivationLabel:'研究动机',motivationTitle:'更好的动作空间，<br>另一条扩展路径。',motivationBody:'大规模预训练推动了视觉和语言能力的发展。但复杂机器人动作仍依赖有限的示范数据，同时学习动作表征与动作生成。',motivationBody2:'ARPG 将这两个问题解耦：先利用人类操作数据学习可复用的动作表征，再训练轻量级策略，在固定的表征空间中生成动作。',conventional:'常规方法',robotDemos:'有限的机器人示范',jointLearning:'动作表征与动作生成<br>联合学习',humanData:'人类操作数据',pretrainedSpace:'预训练动作空间',compactPolicy:'轻量级机器人策略',motivationTakeaway:'独立于机器人示范数据规模与生成模型规模，扩展动作表征预训练。',methodLabel:'方法框架',methodTitle:'预训练。解码。生成。',methodIntro:'从人类操作预训练，到机器人动作生成。通过论文原始算法图，了解 ARPG 的完整架构，并沿着三个训练阶段逐步阅读。',stage0:'动作表征预训练',stage1:'机器人动作解码',stage2:'条件动作生成',fullMethod:'查看完整方法框架 · 图 2',methodCaption:'图 2. ARPG 原始方法框架。阶段 1 学习具有结构且可解码的动作空间，阶段 2 在冻结的空间中学习条件生成。动作编码器用于构建训练目标，不参与推理。',figureLabel:'ARPG 方法框架 · 图 2',enlargeFigure:'放大算法图 ↗',figurePdf:'查看原图 PDF ↗',figureScrollHint:'左右滑动，查看完整算法图 ↔',benchmarkLabel:'DEXJOCO 仿真基准',benchmarkTitle:'更强的双手协同，<br>更轻量的推理部署。',benchmarkIntro:'11 项灵巧操作任务，包括 6 项单臂任务与 5 项双手任务。遵循基准原有任务定义与成功判据，报告各任务成功率的宏平均。',multi:'多任务联合训练',single:'单任务训练',successRate:'任务成功率 (%) ↑',vram:'推理峰值显存',vramNote:'π0.5：9.05 GB',latency:'推理延迟',latencyNote:'π0.5：84.9 ms',activeParams:'推理活跃参数量',paramsNote:'π0.5：3.35B · 生成主干：130M',fullTable:'查看完整实验对比 · 表 1',tableCaption:'DexJoCo 任务成功率与推理开销 · 表 1',setting:'训练设置',method:'方法',singleArm:'单臂 (%)',bimanual:'双手 (%)',overall:'整体 (%)',benchmarkSource:'来源：表 1。基线任务结果引自 DexJoCo。推理开销遵循论文中的测量配置，不代表与硬件无关的性能保证。',realLabel:'从仿真走向现实',realTitle:'真实世界中的灵巧操作。',realIntro:'三项长时程任务，每项包含三个有序阶段。ARPG 与 π0.5 使用相同的机器人示范、初始状态分布和成功标准。每种方法在每项任务上测试 30 次。',realCaption:'图 3 · 完整任务成功率，每种方法在每项任务上测试 30 次。视频为任务演示剪辑；成功率统计基于全部评估试验。',realTakeaway:'在三个已评估任务中，ARPG 均取得更高的成功率。其中，倾倒咖啡豆的提升最大，达到 33.3 个百分点。',scalingLabel:'动作表征预训练的扩展规律',scalingTitle:'更多数据带来提升，<br>但收益并非持续增长。',scalingIntro:'在不增加机器人示范和生成主干规模的情况下，改善动作空间能否提升操作性能？我们分别考察三个预训练扩展维度。',data:'数据规模',capacity:'编码器规模',compute:'训练步数',scalingCaption:'图 4 · 下游 DexJoCo 整体成功率。数据集为嵌套子集。连线仅连接已评估配置，并非拟合的 Scaling 定律。每组实验中的其余配置保持固定。',researchNote:'实验发现及其适用边界',scalingCaveat:'从 10 到 500 小时，数据总量与行为覆盖范围同时发生变化，因此无法独立确定两者的因果贡献。3,000 小时扩展中的新增数据集中于已覆盖的任务类别。扩大编码器或增加预训练步数也未带来持续收益。',ablationLabel:'消融实验与方法分析',ablationTitle:'动作空间的结构至关重要。',ablationIntro:'保持机器人示范、观测和下游生成模型固定，在所评估的学习目标中，视觉对齐构建了最有利于生成的动作表征。',representation:'动作表征学习方法',ablationCaption:'表 2(a) · DexJoCo 整体成功率 (%)',aggregation:'多层特征聚合',layers:'编码器最后 K 层',success:'成功率 (%)',auxiliary:'辅助生成训练目标',objective:'训练目标',withoutRepa:'移除 REPA 表征对齐',withoutDecoder:'移除动作解码损失',fullObjective:'完整训练目标',outlookLabel:'局限性与未来研究',outlookTitle:'为机器人学习，<br>增加一个扩展维度。',outlookBody:'动作表征预训练为复杂灵巧控制提供了可复用的组件，并在仿真和三项真实机器人操作任务中验证了性能提升。',outlookLimits:'当前研究聚焦于灵巧手。对其他执行机构的迁移、语义理解及开放世界泛化能力，仍需系统评估。Scaling 结论仅适用于所测试的数据池与模型配置。',outlookQuestion:'怎样的动作表征才能真正有利于生成，而不只是更好地对齐？',resourcesLabel:'论文资源',resourcesTitle:'进一步了解这项研究。',resourcesIntro:'阅读完整论文，了解方法、实现细节、评估协议与补充分析。',paperDownload:'论文 PDF',code:'代码',forthcoming:'将在后续公开',citationPending:'随正式公开版本提供',abstract:'阅读论文摘要',resourceNote:'当前为匿名稿件。作者信息与完整引用将在正式公开时补充。本网页不表示论文已被会议接收。',backTop:'回到顶部 ↑'
  }
};
Object.assign(copy.zh, {"heroSub": "先学习动作空间，再学习如何行动。<br>在人类操作数据上预训练，用轻量级策略生成机器人灵巧动作。", "heroMeta": "Yanjinghao Xu · Jiexin Zhang · Huan Zhao · Jianjia Mo<br>Zhenghao Yin · Dingkang Liang · Xiang Bai · Han ding<br><span class=\"affiliation\">华中科技大学 · 预印本</span>", "methodTitle": "从人类动作，<br>到机器人行动。", "methodIntro": "先建立保留运动信息、适合生成建模的动作空间，再学习在其中生成。下面三个步骤分别解决表征学习、机器人适配与策略训练。", "scalingTitle": "扩展行为覆盖，<br>不只是累计时长。", "resourceNote": "本页依据项目中的 arxiv-paper 预印本。PDF 已包含作者信息；arXiv 编号与公开代码链接尚未提供。", "forthcoming": "公开仓库链接尚未提供", "citationPending": "待补充 arXiv 编号", "mapLabel": "用三个问题读懂论文", "mapTitle": "新的扩展方向。", "map1Title": "为什么解耦学习？", "map1Body": "有限的机器人示范需要同时学习动作结构与任务行为，这是复杂动作生成面临的瓶颈。", "map1Link": "理解研究动机 ↗", "map2Title": "人类动作如何帮助机器人？", "map2Body": "将人类动作与视频特征对齐，再用机器人示范学习动作解码与条件生成。", "map2Link": "理解方法框架 ↗", "map3Title": "实验究竟验证了什么？", "map3Body": "130M 生成主干取得更高的双手操作成功率；更广的行为覆盖提供了值得探索的扩展方向。", "map3Link": "查看实验证据 ↗", "bridgeLabel": "连接人类与机器人的关键", "bridgeTitle": "不同的手，同一套接口。", "bridgeBody": "人类与机器人的轨迹统一为 324 维双手动作格式：每只手 162 维，包含关节旋转、手掌旋转、手腕位置和手部关键点。有效性掩码处理缺失维度，再由目标机器人的解码器将表征还原为可执行控制。", "inferenceLabel": "实际部署时", "inferenceTitle": "机器人执行时运行哪些模块？", "infer1": "视觉观测<br>＋机器人状态", "infer2": "130M DiT<br>生成动作表征", "infer3": "冻结的解码器<br>输出未来动作块", "inferenceNote": "生成从高斯噪声开始。动作编码器与 V-JEPA 视频参考模型均不参与推理。完整策略的活跃参数量为 0.46B；130M 仅指其中的生成主干。", "pp": "个百分点", "resultMeaning": "多任务训练下，双手操作成功率从 10.1% 提升至 44.7%。这是基准中最突出的提升：在多个任务之间学习复杂的双手协同。"});
document.querySelectorAll('[data-i18n]').forEach(el => { copy.en[el.dataset.i18n] = el.innerHTML; });
copy.en.codeSoon='Coming soon';
copy.zh.codeSoon='即将公开';
copy.en.heroTitle='Scaling Dexterous Manipulation<br>via Action Representation Pretraining';
copy.zh.heroTitle='通过动作表征预训练<br>扩展灵巧操作能力';

Object.assign(copy.en, {
 demoTitle:'Real-world task demonstrations.', demoIntro:'Three tasks. Coordinated hands. Watch ARPG in the real world.',
 realLabel:'ON THE ROBOT', taskLabel:'Task', realEvidenceTitle:'Real-world evaluation · three tasks', auxiliaryDetails:'Additional ablations',
 methodLabel:'HOW IT WORKS', methodTitle:'Learn the action representation space.<br>Then learn to generate representations.', methodIntro:'Pretrain an action representation, adapt its decoder, and learn a compact generative policy.',
 benchmarkLabel:'THE EVIDENCE', benchmarkTitle:'Stronger coordination.<br>Measured in success.', benchmarkIntro:'Evaluated on 11 dexterous tasks: six single-arm and five bimanual.',
 resultMeaning:'Multi-task bimanual success: 10.1% → 44.7%.',
 scalingLabel:'SCALING', scalingTitle:'Broader experience.<br>Better actions.', scalingIntro:'Vary data, encoder capacity, and training compute. Keep the downstream policy fixed.',
 ablationLabel:'WHY REPRESENTATIONS MATTER', ablationTitle:'The space makes a difference.',
 ablationIntro:'The strongest representation among the evaluated objectives comes from visual alignment. Robot data, observations, and generator are held fixed.',
 inferenceTitle:'Inference: from observation to action.', infer1:'Vision + robot state',infer2:'Generate representations',infer3:'Decode an action chunk',
 outlookLabel:'WHAT COMES NEXT', resourcesLabel:'THE PAPER',
});
Object.assign(copy.zh, {
 navIntuition:'直观理解', demoTitle:'真实机器人任务演示。', demoIntro:'三项真实任务，展现灵巧操作与协同。',
 realLabel:'真实机器人', taskLabel:'任务', realEvidenceTitle:'真机评估 · 三项任务', auxiliaryDetails:'更多消融实验',
 methodLabel:'方法', methodTitle:'先学习动作表征空间，<br>再学习如何生成动作表征。', methodIntro:'预训练动作表征，适配机器人解码器，再学习轻量级生成策略。',
 benchmarkLabel:'实验证据', benchmarkTitle:'更强的协同，<br>用成功率验证。', benchmarkIntro:'在 11 项灵巧操作任务上评估：6 项单臂，5 项双手。',
 resultMeaning:'多任务双手操作成功率：10.1% → 44.7%。',
 scalingLabel:'扩展能力', scalingTitle:'更丰富的经验，<br>更好的动作。', scalingIntro:'分别改变数据、编码器规模与训练计算量，保持下游策略配置固定。',
 ablationLabel:'为什么表征重要', ablationTitle:'动作空间，决定学习的起点。',
 ablationIntro:'保持机器人数据、观测和生成模型固定，视觉对齐在所评估的目标中表现最好。',
 inferenceTitle:'推理：从观测到动作。',infer1:'视觉 + 机器人状态',infer2:'生成动作表征',infer3:'解码为动作块',
 outlookLabel:'下一步', resourcesLabel:'论文',
});
copy.en.methodScroll='Scroll to explore · or select a stage';
copy.zh.methodScroll='向下滚动，逐步了解 · 也可点击阶段切换';
let lang='en',stage=0,regime='multi',scale='data';
try { if(localStorage.getItem('arpg-language')==='zh') lang='zh'; } catch {}
const t=(en,zh)=>lang==='zh'?zh:en;
const stages=[
  {title:['Learn structure from human manipulation.','从人类操作中学习动作结构。'],body:['Align synchronized human actions with a frozen V-JEPA 2.1 video reference. A trainable action encoder learns a structured temporal representation; the final two encoder layers are aggregated.','将同步的人类动作与冻结的 V-JEPA 2.1 视频表征对齐。训练动作编码器以学习有结构的时序表征，并聚合编码器最后两层特征。'],status:['Trainable: action encoder, pooling & projection heads · Frozen: video reference','训练：动作编码器、池化与投影模块 · 冻结：视频参考编码器']},
  {title:['Recover executable robot actions.','还原可执行的机器人动作。'],body:['Freeze the pretrained action encoder and train a decoder on target-robot demonstrations. Noise-augmented decoding helps the decoder tolerate errors in generated representations.','冻结预训练动作编码器，使用目标机器人的示范训练动作解码器。通过带噪声的表征增强，提高解码器对生成误差的容忍度。'],status:['Trainable: action decoder · Frozen: pretrained action encoder','训练：动作解码器 · 冻结：预训练动作编码器']},
  {title:['Generate in the pretrained action space.','在预训练动作空间中生成。'],body:['A 130M-parameter DiT learns conditional flow matching from visual observations and robot state. At inference, generated representations are decoded into future action chunks; the action encoder is not needed.','130M 参数的 DiT 基于视觉观测与机器人状态学习条件流匹配。推理时，生成的表征被解码为未来动作块，无需动作编码器参与。'],status:['Trainable: conditional generator · Frozen: action encoder & decoder','训练：条件生成模型 · 冻结：动作编码器与解码器']}
];
const results={multi:[['π0.5',3.35,9.05,84.9,55.8,10.1,35.0],['ARPG',0.46,2.63,50.8,68.8,44.7,57.8]],single:[['π0.5',3.35,9.05,84.9,69.7,35.3,54.1],['GR00T N1.5',2.72,6.21,93.6,56.2,21.1,40.2],['ARPG',0.46,2.63,50.8,75.2,44.5,61.3]]};
function renderStage(){
  const s=stages[stage],i=lang==='en'?0:1;
  document.querySelectorAll('[data-stage]').forEach(b=>{const selected=+b.dataset.stage===stage;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1;});
  const panel=document.getElementById('stage-panel');panel.setAttribute('aria-labelledby',`stage-tab-${stage}`);
  const short=[t('Learn action representations through visual–action contrastive learning.','通过视觉–动作对比学习，学习动作表征。'),t('Adapt a decoder to the target robot.','适配目标机器人的动作解码器。'),t('Generate in the frozen action representation space.','在冻结的动作表征空间做生成。')];
  window.arpgControls.html(panel, `<div class="stage-summary"><h3>${short[stage]}</h3><details class="stage-more"><summary>${t('Training details','训练细节')}</summary><p>${s.body[i]}</p><p class="stage-status">${s.status[i]}</p></details></div>`);

  document.querySelectorAll('[data-figure-stage]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.figureStage===stage));

}
function renderBenchmark(){
  document.querySelectorAll('[data-regime]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.regime===regime));
  const cats=[t('Single-arm · 6 tasks','单臂 · 6 项任务'),t('Bimanual · 5 tasks','双手 · 5 项任务'),t('Overall · 11 tasks','整体 · 11 项任务')];
  document.getElementById('benchmark-chart').innerHTML=cats.map((cat,k)=>`<div class="bar-group"><h3>${cat}</h3>${results[regime].map(r=>`<div class="bar-row ${r[0]==='ARPG'?'ours':''}"><span>${r[0]}</span><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${r[4+k]}%"></div></div><strong>${r[4+k].toFixed(1)}%</strong></div>`).join('')}</div>`).join('');
  document.getElementById('benchmark-caption').textContent=regime==='multi'?t('Multi-task joint training · Macro-average success (%) · ARPG 57.8% overall vs. π0.5 35.0%.','多任务联合训练 · 成功率宏平均 (%) · ARPG 整体 57.8%，π0.5 为 35.0%。'):t('Single-task training · A separate policy is trained for each task · ARPG 61.3% overall.','单任务训练 · 每项任务独立训练策略 · ARPG 整体成功率为 61.3%。');
  document.getElementById('results-table').innerHTML=['single','multi'].map(key=>results[key].map(r=>`<tr class="${r[0]==='ARPG'?'best':''}"><td>${key==='single'?t('Single-task','单任务'):t('Multi-task','多任务')}</td><td>${r[0]}</td>${r.slice(1).map((n,i)=>`<td>${i<2?n.toFixed(2):n.toFixed(1)}</td>`).join('')}</tr>`).join('')).join('');
}
const tasks=[
 {key:'hammer',en:'Hammer handover',zh:'锤子交接',a:23.3,b:10.0,n:7,bn:3,description:['A long-horizon handover task requiring coordinated manipulation across ordered stages.','通过多个有序阶段完成交接，考察长时程操作中的协调能力。']},
 {key:'coffee',en:'Pouring coffee beans',zh:'倾倒咖啡豆',a:53.3,b:20.0,n:16,bn:6,description:['Coordinated object manipulation for pouring; the largest observed gain across the three tasks.','通过协调的物体操作完成倾倒，在三项任务中取得最大成功率提升。']},
 {key:'cabinet',en:'Cabinet retrieval',zh:'柜体取物',a:40.0,b:16.7,n:12,bn:5,description:['A sequential retrieval task that evaluates dexterous manipulation in a physical cabinet setting.','在真实柜体环境中完成连续取物流程，评估灵巧操作能力。']}
];
let selectedTask=0;
const demoPlayers=new Map();
function prepareDemo(video){
  const conserve=navigator.connection?.saveData;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  video.muted=true;
  video.preload=conserve?'metadata':'auto';
  let resume=true, entered=false;
  const observer=new IntersectionObserver(entries=>{
    const visible=entries[0].isIntersecting;
    if(visible){
      if(resume&&!conserve&&!reduced) video.play().catch(()=>{});
      entered=true;
    }else if(entered){
      resume=!video.paused;
      video.pause();
    }
  },{threshold:.25});
  observer.observe(video);
  demoPlayers.set(video.dataset.taskKey,{video,observer});
}

function renderReal(){
  const r=tasks[selectedTask],title=lang==='en'?r.en:r.zh;
  const existing=demoPlayers.get(r.key);
  const previousBar=document.querySelector('.demo-taskbar');
  const previous=document.getElementById('demo-video');
  const continuePlaying=previous&&!previous.paused;
  // Keep the media element outside the translated markup to preserve buffering.
  if(existing && previous===existing.video) existing.video.remove();
  const nextCards=document.createElement('div');
  nextCards.innerHTML=`
    <div class="demo-player"><video id="demo-video" data-task-key="${r.key}" controls muted loop playsinline preload="auto" poster="assets/videos/${r.key}-poster.jpg?v=annotated1080-2" aria-label="${title}"><source src="assets/videos/${r.key}-web.mp4?v=fast1080-1" type="video/mp4">${t('Your browser does not support video.','你的浏览器不支持视频。')}</video></div>
    <div class="demo-taskbar" role="group" aria-label="${t('Choose a demonstration','选择任务演示')}">${tasks.map((item,k)=>`<button type="button" data-task="${k}" aria-pressed="${selectedTask===k}"><span class="task-index">0${k+1}</span>${lang==='en'?item.en:item.zh}</button>`).join('')}</div>
    <div class="demo-caption"><p>${[
      t('A coordinated handover, from one hand to the other.','从一只手到另一只手，完成协调交接。'),
      t('Grasp, position, and pour coffee beans.','抓取、调整位置，再完成咖啡豆倾倒。'),
      t('Open the cabinet and retrieve the object.','打开柜体，取出目标物体。')
    ][selectedTask]}</p><a href="assets/videos/${r.key}.mp4?v=annotated1080-2" target="_blank" rel="noopener">${t('Open full-quality video','打开高清原视频')} ↗</a></div>
    <p class="demo-note">${t('Edited demonstrations · 2× speed.','任务演示剪辑 · 2 倍速。')} <button id="evaluation-toggle" type="button" aria-controls="real-evaluation" aria-expanded="${!document.getElementById('real-evaluation').hidden}">${document.getElementById('real-evaluation').hidden?t('See the evaluation','查看实验评估'):t('Hide the evaluation','收起实验评估')}<span aria-hidden="true">⌄</span></button></p>`;
  if(previousBar){
    const newBar=nextCards.querySelector('.demo-taskbar');
    previousBar.setAttribute('aria-label',newBar.getAttribute('aria-label'));
    [...previousBar.children].forEach((button,i)=>{button.innerHTML=newBar.children[i].innerHTML;button.setAttribute('aria-pressed',String(i===selectedTask));});
    // Keep the live capsule mounted so its CSS transition is not interrupted.
    ['.demo-player','.demo-caption','.demo-note'].forEach(selector=>{document.querySelector(selector).replaceWith(nextCards.querySelector(selector));});
  }else document.getElementById('real-cards').replaceChildren(...nextCards.children);
  window.arpgControls.setup();
  const placeholder=document.getElementById('demo-video');
  if(existing){placeholder.replaceWith(existing.video);existing.video.setAttribute('aria-label',title);if(continuePlaying)existing.video.play().catch(()=>{});}
  else prepareDemo(placeholder);
  document.getElementById('real-results').innerHTML=tasks.map(item=>`<tr><td>${lang==='en'?item.en:item.zh}</td><td><strong>${item.a.toFixed(1)}%</strong> (${item.n}/30)</td><td>${item.b.toFixed(1)}% (${item.bn}/30)</td></tr>`).join('');
}
document.getElementById('real-cards').addEventListener('click',e=>{
  const toggle=e.target.closest('#evaluation-toggle');
  if(toggle){
    const panel=document.getElementById('real-evaluation');panel.hidden=!panel.hidden;
    toggle.setAttribute('aria-expanded',String(!panel.hidden));
    toggle.innerHTML=`${panel.hidden?t('See the evaluation','查看实验评估'):t('Hide the evaluation','收起实验评估')}<span aria-hidden="true">⌄</span>`;
    return;
  }
  const button=e.target.closest('[data-task]');if(!button||+button.dataset.task===selectedTask)return;document.getElementById('demo-video').pause();selectedTask=+button.dataset.task;document.querySelectorAll('[data-task]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.task===selectedTask)));window.arpgControls.transition('demo',['.demo-player','.demo-caption'],()=>{renderReal();if(!navigator.connection?.saveData&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.getElementById('demo-video').play().catch(()=>{});});});

const scaling={
 data:{x:['10','100','500','3,000'],y:[40.9,44.4,57.8,55.5],std:[2.2,.7,.4,.9],label:['Human pretraining data (hours)','人类操作预训练数据（小时）'],eyebrow:['10 → 500 HOURS','10 → 500 小时'],title:['40.9% → 57.8%','40.9% → 57.8%'],body:['Expanding nested human-data subsets improves downstream performance up to 500 hours. From 500 to 3,000 hours, increasing data volume without adding task categories does not improve performance (57.8% → 55.5%).','扩展人类操作嵌套子集，在 500 小时前持续改善下游性能。从 500 到 3,000 小时，仅增加数据量而不增加任务种类，性能未获提升（57.8% → 55.5%）。'],note:['Robot-only reference: 42.7% from 8.8 hours of in-domain robot data. Whiskers on the other points show reported standard deviations; the 10-hour whisker is omitted.','仅机器人数据参考：8.8 小时域内机器人数据达到 42.7%。其余点的误差线表示所报告的标准差；10 小时点未显示误差线。']},
 capacity:{x:['22','40','90'],y:[57.8,57.5,55.5],label:['Action encoder parameters (M)','动作编码器参数量（M）'],eyebrow:['22M → 90M PARAMETERS','22M → 90M 参数'],title:['Capacity ≠ generation quality.','容量不等于生成质量。'],body:['Increasing action encoder size does not consistently improve downstream manipulation. A larger encoder does not automatically create a space better suited to action generation.','增大动作编码器并未持续改善下游操作。更大的编码器不一定能构建更适合动作生成的表征空间。'],note:['Encoder capacity is distinct from the fixed 130M downstream generative backbone.','此处为动作编码器规模，与保持固定的 130M 下游生成主干不同。']},
 compute:{x:['10k','20k','30k'],y:[57.8,54.5,54.5],label:['Pretraining optimization steps','预训练优化步数'],eyebrow:['10K → 30K STEPS','10K → 30K 步'],title:['Longer isn’t always better.','更久不一定更好。'],body:['More pretraining optimization does not translate into higher task success in these configurations. Representation alignment and downstream generative utility need not improve together.','在这些配置中，增加预训练优化并未带来更高任务成功率。表征对齐与下游生成效用不一定同步改善。'],note:['All other configurations are held fixed within this compute comparison.','该计算量对比中，其余实验配置保持固定。']}
};
function renderScaling(){
  const s=scaling[scale],i=lang==='en'?0:1;document.querySelectorAll('[data-scale]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.scale===scale));
  const narrow=matchMedia('(max-width:700px)').matches, chartWidth=narrow?360:610, xMin=narrow?45:65, xMax=narrow?330:558;
  const xs=s.x.map((_,k)=>xMin+k*(xMax-xMin)/(s.x.length-1)),py=v=>260-(v-30)*5.5;
  const aria=`${s.label[i]}: ${s.x.map((x,k)=>`${x}: ${s.y[k]}%`).join('; ')}`;
  document.getElementById('scaling-chart').innerHTML=`<svg viewBox="0 0 ${chartWidth} 335" role="img" aria-label="${aria}"><text x="${xMin}" y="20" fill="#8e8399" class="chart-label">${t('DexJoCo success (%)','DexJoCo 成功率 (%)')}</text>${[30,40,50,60,70].map(v=>`<line x1="${xMin}" x2="${xMax}" y1="${py(v)}" y2="${py(v)}" stroke="#e2dce7" stroke-dasharray="3 4"/><text x="${xMin-12}" y="${py(v)+4}" text-anchor="end" fill="#94899d" class="chart-label">${v}</text>`).join('')}${scale==='data'?`<line x1="${xMin}" x2="${xMax}" y1="${py(42.7)}" y2="${py(42.7)}" stroke="#b4a7c0" stroke-dasharray="5 4"/>`:''}${xs.slice(1).map((x,k)=>`<path d="M${xs[k]},${py(s.y[k])} L${x},${py(s.y[k+1])}" fill="none" stroke="#6b549b" stroke-width="2.5" stroke-linecap="round" ${scale==='data'&&k===2?'stroke-dasharray="7 6"':''}/>`).join('')}${xs.map((x,k)=>`${s.std&&!(scale==='data'&&k===0)?`<path d="M${x},${py(s.y[k]+s.std[k])}V${py(s.y[k]-s.std[k])}M${x-4},${py(s.y[k]+s.std[k])}H${x+4}M${x-4},${py(s.y[k]-s.std[k])}H${x+4}" stroke="#8a73b1" fill="none"/>`:''}<circle cx="${x}" cy="${py(s.y[k])}" r="5" fill="#6b549b" stroke="#f9f8f5" stroke-width="2"/><text x="${x}" y="${py(s.y[k])-19}" text-anchor="middle" class="chart-value" fill="#6b549b">${s.y[k].toFixed(1)}%</text><text x="${x}" y="282" text-anchor="middle" class="chart-label" fill="#8e8399">${s.x[k]}</text>`).join('')}<text x="${(xMin+xMax)/2}" y="320" text-anchor="middle" class="chart-label" fill="#8e8399">${s.label[i]}</text></svg>${scale==='data'?`<p class="scaling-segment-note"><span aria-hidden="true"></span>${t('500 → 3,000 h: more data, same task categories.','500 → 3,000 小时：仅增加数据量，任务种类不变。')}</p>`:''}`;
  document.getElementById('scaling-insight').innerHTML=`<span>${s.eyebrow[i]}</span><h3>${s.title[i]}</h3><p>${s.body[i]}</p><p class="caption">${s.note[i]}</p>`;
}
function renderAblation(){const rows=[['Raw Action','原始动作',13.3],['Action-MAE','Action-MAE',36.4],['Action-iBOT','Action-iBOT',30.5],['Visual Alignment + iBOT','视觉对齐 + iBOT',45.6],['Visual Alignment (ARPG)','视觉对齐（ARPG）',57.8]];document.getElementById('ablation-chart').innerHTML=rows.map((r,k)=>`<div class="ablation-bar ${k===4?'best-bar':''}"><div><span>${r[lang==='en'?0:1]}</span><strong>${r[2].toFixed(1)}%</strong></div><div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width:${r[2]}%"></div></div></div>`).join('');}
const abstracts={en:'Large-scale vision, language, and video pretraining has substantially improved the perception and generalization capabilities of robotic manipulation models, but action generation for complex dexterous manipulation remains constrained by the scarcity of robot demonstrations. Limited robot demonstrations must be used to learn both action representations and task-conditioned action distributions, making it difficult to train action representations sufficiently and, in turn, limiting the ability of downstream generative models to generate complex dexterous actions. To address this limitation, we propose ARPG (Action Representation Pretraining and Generation), which explicitly separates action representation learning from action generation: we first pretrain an action representation encoder on large-scale human manipulation data. We then freeze the encoder and train a compact generative backbone (130M parameters) to learn task-conditioned action distributions in the encoder’s representation space. Experimental results show that ARPG achieves state-of-the-art performance on the DexJoCo benchmark and improves the average success rate on bimanual dexterous manipulation from 10.1% for π0.5 to 44.7%. In a nested data-scaling experiment, downstream performance improves as human-manipulation pretraining data increase from 10 to 500 hours. These results indicate that action representation pretraining provides an independent scaling dimension for improving complex dexterous manipulation.',zh:'大规模视觉、语言与视频预训练显著提升了机器人操作模型的感知与泛化能力，但复杂灵巧操作的动作生成仍受限于机器人示范的稀缺性。有限的机器人示范需要同时用于学习动作表征和任务条件动作分布，使动作表征难以得到充分训练，进而限制下游生成模型生成复杂灵巧动作的能力。为解决这一问题，我们提出 ARPG（动作表征预训练与生成），显式地将动作表征学习与动作生成分离：首先在大规模人类操作数据上预训练动作表征编码器，再冻结编码器，训练轻量级生成主干（130M 参数），在编码器的表征空间中学习任务条件动作分布。实验结果表明，ARPG 在 DexJoCo 基准上取得最先进的性能，将双手灵巧操作平均成功率从 π0.5 的 10.1% 提升至 44.7%。在嵌套数据扩展实验中，人类操作预训练数据从 10 小时增加到 500 小时时，下游性能随之提升。这些结果表明，动作表征预训练为改善复杂灵巧操作提供了独立的扩展维度。'};
Object.assign(copy.en, {paperDownload:'Paper · arXiv',resourceNote:'Preprint: arXiv:2610.34453. The public code repository will be added when available.'});
Object.assign(copy.zh, {paperDownload:'论文 · arXiv',resourceNote:'预印本：arXiv:2610.34453。代码仓库链接将在公开后补充。'});
Object.assign(copy.zh, {benchmarkLabel:'实验',benchmarkTitle:'更强的灵巧操作能力。',benchmarkIntro:'在 DexJoCo 上评估。',deploymentTitle:'更低的部署消耗。',scalingTitle:'更多样的人类动作，<br>更好的动作生成。'});
Object.assign(copy.en, {benchmarkLabel:'EXPERIMENTS',benchmarkTitle:'Stronger dexterous manipulation.',benchmarkIntro:'Evaluated on DexJoCo.',deploymentTitle:'Lower deployment costs.',scalingTitle:'More diverse human actions.<br>Better action generation.'});
Object.assign(copy.en, {"researchLabel": "RESEARCH MOTIVATION", "researchTitle": "Limited robot demonstrations.<br>Two learning problems.", "researchIntro": "Learning how actions are represented, and how to generate them for a task.", "directLabel": "DIRECT LEARNING", "directTitle": "Learn both from robot data.", "robotSource": "Limited robot demonstrations", "learnRepresentation": "Learn action representations", "learnGeneration": "Learn task-conditioned generation", "directFoot": "The same demonstrations support both learning problems.", "arpgRouteTitle": "Learn the representation first.", "humanSource": "Rich human manipulation data", "pretrainRepresentation": "Pretrain action representations", "robotTransfer": "Then use robot demonstrations", "generateRepresentation": "Learn generation in this space", "arpgFoot": "Human data provides a foundation for action generation.", "researchTakeaway": "Separate representation learning from generation.<br>Bring human motion experience into robot learning."});
Object.assign(copy.zh, {"researchLabel": "研究动机", "researchTitle": "有限的机器人示范，<br>承担了两项学习任务。", "researchIntro": "既要学习动作如何表示，也要学习如何根据任务生成动作。", "directLabel": "直接学习", "directTitle": "两项学习，都依赖机器人示范。", "robotSource": "有限的机器人示范", "learnRepresentation": "学习动作表征", "learnGeneration": "学习任务条件下的动作生成", "directFoot": "同一份示范，同时支撑两项学习。", "arpgRouteTitle": "先借助人类数据，学好表征。", "humanSource": "丰富的人类操作数据", "pretrainRepresentation": "预训练动作表征", "robotTransfer": "再使用机器人示范", "generateRepresentation": "学习在表征空间中生成", "arpgFoot": "让人类动作经验，成为机器人生成动作的基础。", "researchTakeaway": "将动作表征学习与动作生成分开，<br>让丰富的人类动作数据参与其中。"});
function render(){document.dispatchEvent(new Event('arpg:before-render'));document.documentElement.lang=lang==='en'?'en':'zh-CN';document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=copy[lang][el.dataset.i18n]??copy.en[el.dataset.i18n];});document.getElementById('language').innerHTML=lang==='en'?'EN <span>/ 中文</span>':'中文 <span>/ EN</span>';document.getElementById('language').setAttribute('aria-label',t('Switch language to Chinese','切换为英文'));document.getElementById('abstract-text').textContent=abstracts[lang];renderStage();renderBenchmark();renderReal();renderScaling();renderAblation();document.dispatchEvent(new Event('arpg:render'));}
document.getElementById('language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';try{localStorage.setItem('arpg-language',lang);}catch{}render();});
function focusFigureStage(value,fromScroll=false){
  stage=value;renderStage();
  const figure=document.querySelector('.method-figure'),scroller=document.querySelector('.method-figure-scroll'),region=document.querySelector(`[data-figure-stage="${stage}"]`);
  figure.dataset.focus=String(stage);
  if(!fromScroll) document.dispatchEvent(new CustomEvent('arpg:stage',{detail:stage}));
  if(scroller.scrollWidth>scroller.clientWidth){scroller.scrollTo({left:region.offsetLeft-(scroller.clientWidth-region.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
}
document.querySelectorAll('[data-stage]').forEach(b=>b.addEventListener('click',()=>focusFigureStage(+b.dataset.stage)));
document.querySelectorAll('[data-figure-stage]').forEach(b=>b.addEventListener('click',()=>focusFigureStage(+b.dataset.figureStage)));
document.querySelector('.stage-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();stage=e.key==='Home'?0:e.key==='End'?2:(stage+(e.key==='ArrowRight'?1:2))%3;focusFigureStage(stage);document.querySelector(`[data-stage="${stage}"]`).focus();});
document.querySelectorAll('[data-regime]').forEach(b=>b.addEventListener('click',()=>{if(regime===b.dataset.regime)return;regime=b.dataset.regime;document.querySelectorAll('[data-regime]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.regime===regime)));window.arpgControls.transition('benchmark',['#benchmark-chart','#benchmark-caption'],renderBenchmark);}));
document.querySelectorAll('[data-scale]').forEach(b=>b.addEventListener('click',()=>{if(scale===b.dataset.scale)return;scale=b.dataset.scale;document.querySelectorAll('[data-scale]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.scale===scale)));window.arpgControls.transition('scaling',['#scaling-chart','#scaling-insight'],renderScaling);}));
const dialog=document.getElementById('image-dialog');document.addEventListener('click',e=>{const b=e.target.closest('[data-zoom]');if(!b)return;dialog.classList.toggle('method-lightbox',b.dataset.zoom==='assets/method.svg');document.getElementById('dialog-image').src=b.dataset.zoom;document.getElementById('dialog-image').alt=b.dataset.alt;dialog.showModal();});document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
let ticking=false;function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.width=`${height>0?scrollY/height*100:0}%`;ticking=false;}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){document.querySelectorAll('.header nav a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
matchMedia('(max-width:700px)').addEventListener('change',renderScaling);
render();focusFigureStage(stage);updateProgress();

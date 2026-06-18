import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const skillRoot = "C:\\Users\\Administrator\\.codex\\skills\\guizang-ppt-skill";
const templatePath = path.join(skillRoot, "assets", "template-swiss.html");
const outDir = path.join(root, "outputs", "AI就业班产品培训PPT-Guizang");
const outHtml = path.join(outDir, "index.html");
const scriptOut = path.join(root, "outputs", "AI就业班产品培训PPT-逐页讲稿.md");
const title = "AI就业班产品培训：销售团队理解版";
const total = 18;

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, "images"), { recursive: true });

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function chrome(n, label = "AI JOB TRAINING") {
  return `<div class="chrome-min"><div class="l">${label}</div><div class="r">${String(n).padStart(2, "0")} / ${total}</div></div>`;
}

function head(kicker, heading, lead = "") {
  return `<div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh;margin-bottom:3vh">
    <div class="t-meta" style="letter-spacing:.18em">${esc(kicker)}</div>
    <h2 class="h-xl-zh" style="font-size:min(5.2vw,9.2vh);line-height:1.05">${heading}</h2>
    ${lead ? `<p class="lead" style="max-width:62ch;margin-top:.8vh">${esc(lead)}</p>` : ""}
  </div>`;
}

function card(title, body, cls = "card-fill") {
  return `<div class="${cls}" data-anim="item" style="padding:2.2vh 1.6vw;display:flex;flex-direction:column;gap:1.2vh;min-height:18vh">
    <div class="t-cat">${esc(title)}</div>
    <p style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,1.02vw);line-height:1.55;color:inherit;font-weight:400">${esc(body)}</p>
  </div>`;
}

function smallCard(title, body, cls = "card-fill") {
  return `<div class="${cls}" data-anim="item" style="padding:1.8vh 1.35vw;display:flex;flex-direction:column;gap:.9vh">
    <div class="t-cat">${esc(title)}</div>
    <p style="font-family:var(--sans),var(--sans-zh);font-size:max(15px,.9vw);line-height:1.52;color:inherit;font-weight:400">${esc(body)}</p>
  </div>`;
}

function bulletRows(items) {
  return `<div data-anim="items" style="display:flex;flex-direction:column;border-top:1px solid var(--border-subtle)">
    ${items.map((item, i) => `<div style="display:grid;grid-template-columns:5vw 1fr;gap:2vw;align-items:start;padding:2.2vh 0;border-bottom:1px solid var(--border-subtle)">
      <div style="font-family:var(--sans);font-size:min(3.8vw,6.8vh);font-weight:200;line-height:.9;color:${i === items.length - 1 ? "var(--accent)" : "var(--text-primary)"}">${String(i + 1).padStart(2, "0")}</div>
      <div>
        <h3 style="font-family:var(--sans),var(--sans-zh);font-size:max(18px,1.55vw);font-weight:400;line-height:1.22;margin-bottom:.8vh;color:${i === items.length - 1 ? "var(--accent)" : "var(--text-primary)"}">${esc(item.title)}</h3>
        <p style="font-family:var(--sans),var(--sans-zh);font-size:max(16px,.95vw);line-height:1.55;color:var(--text-secondary)">${esc(item.body)}</p>
      </div>
    </div>`).join("\n")}
  </div>`;
}

function slide(n, layout, cls, animate, inner, label) {
  return `<section class="slide ${cls}" data-layout="${layout}" data-animate="${animate}">
  <div class="canvas-card">
    ${chrome(n, label)}
    ${inner}
  </div>
</section>`;
}

function cover() {
  return `<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card">
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    ${chrome(1, "AI JOB TRAINING")}
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh">
      <div data-anim="kicker" class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">PRODUCT TRAINING / SALES ENABLEMENT</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(9.6vw,16vh);line-height:.94;letter-spacing:-.025em;color:#fff">AI就业班<br/>产品培训</h1>
      <div data-anim="bottom" style="display:grid;grid-template-rows:auto auto;gap:1.6vh;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh">
        <div class="lead" style="max-width:58ch;color:rgba(255,255,255,.86)">让销售听懂：每个模块解决什么问题，学生能拿到什么成果，我们到底提供什么。</div>
        <div style="display:flex;justify-content:space-between;align-items:end">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">20-30 MIN INTERNAL TRAINING</div>
          <div class="t-meta" style="color:rgba(255,255,255,.6)">→ arrow keys / swipe</div>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

const slides = [
  cover(),
  slide(2, "S03", "split", "split-statement", `
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2.2vh">
          <div class="t-meta" style="color:rgba(255,255,255,.62);letter-spacing:.22em">TODAY'S GOAL</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(6.8vw,12vh);line-height:.98;color:#fff">不是讲技术课</h2>
          <p class="lead" style="color:rgba(255,255,255,.78);max-width:34ch">而是让销售能把技术课翻译成购买者听得懂的价值。</p>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${bulletRows([
          { title: "听懂产品路径", body: "知道学生从迷茫到作品集，中间每一步怎么被课程和服务承接。" },
          { title: "会讲模块价值", body: "不背课程名，而是讲清每个模块能帮学生解决什么就业问题。" },
          { title: "避免错误承诺", body: "不做结果型承诺，只讲可控交付和求职准备支持。" },
        ])}
      </div>
    </div>
  `, "TRAINING GOAL"),
  slide(3, "S11", "grey", "progression", `
    ${head("ONE SENTENCE VALUE", "一条完整路径", "把“90+课时、20+项目”翻译成学生能感知的成长链路。")}
    <div class="timeline-h" style="margin-top:6vh">
      <div class="tl-row">
        ${[
          ["01", "看懂岗位", "知道目标岗位到底要什么"],
          ["02", "补齐能力", "补 Python、模型、工程基础"],
          ["03", "做出项目", "完成可演示的 AI 项目"],
          ["04", "整理材料", "README、Demo、简历表达"],
          ["05", "进入求职准备", "面试、笔试、岗位资料支持"],
        ].map(([yr, name, desc], i) => `<div class="th-node ${i === 4 ? "accent" : ""} ${i % 2 ? "down" : "up"}">
          <div class="dot"></div><div class="label"><div class="yr">${yr}</div><div class="name">${esc(name)}</div><div class="desc">${esc(desc)}</div></div>
        </div>`).join("")}
      </div>
    </div>
  `, "VALUE CHAIN"),
  slide(4, "S19", "light", "grid-reveal", `
    ${head("USER PAINS", "销售先讲痛点", "购买者不关心课程名，先关心自己卡在哪里。")}
    <div class="grid-12" style="gap:1.4vw">
      ${card("方向不清", "不知道 AI 就业岗位看什么，也不知道该先学什么。", "card-fill span-3")}
      ${card("基础不稳", "看教程能懂，一上手就卡在环境、代码和数据处理。", "card-fill span-3")}
      ${card("项目太弱", "简历只有课程作业，没有完整项目、Demo 和复盘材料。", "card-accent span-3")}
      ${card("表达不深", "面试只能说“我会用工具”，讲不清模型逻辑和项目过程。", "card-fill span-3")}
    </div>
  `, "USER PAINS"),
  slide(5, "S16", "grey", "grid-reveal", `
    ${head("TARGET USERS", "三类适配人群", "同一套产品，对不同用户要讲不同价值。")}
    <div class="grid-12" style="gap:1.4vw">
      ${smallCard("计算机类学生", "有基础但项目弱。重点讲作品集、简历项目和面试表达。", "card-fill span-4")}
      ${smallCard("互联网从业者", "会业务或工具但缺 AI 项目沉淀。重点讲经验迁移和项目化。", "card-fill span-4")}
      ${smallCard("跨专业/传统行业", "有行业背景但缺技术路径。重点讲入门顺序和 AI 增强能力。", "card-accent span-4")}
      ${smallCard("不适配人群", "纯算法研究、完全不写代码、不能投入时间、只期待结果承诺的人。", "card-ink span-12")}
    </div>
  `, "TARGET USERS"),
  slide(6, "S17", "light", "stack-build", `
    ${head("PRODUCT MAP", "六个模块，一条主线", "销售要把模块讲成路径，而不是讲成课程表。")}
    <div class="grid-12" style="gap:1.2vw;align-items:stretch">
      ${["新手通识", "Python基础与实战", "机器学习与深度学习", "Vibe Coding", "就业技术栈", "综合项目与作品集"].map((name, i) => `<div class="${i === 4 ? "card-accent" : i === 5 ? "card-ink" : "card-fill"} span-2" data-anim="item" style="padding:2vh 1vw;display:flex;flex-direction:column;justify-content:space-between;min-height:38vh">
        <div class="t-meta">${String(i + 1).padStart(2, "0")}</div>
        <div style="font-size:max(20px,1.6vw);line-height:1.18;font-weight:400">${esc(name)}</div>
      </div>`).join("")}
    </div>
    <div class="t-meta" style="margin-top:3vh;color:var(--text-helper)">讲法：先让学生动起来，再让学生做出来，最后让学生讲得出来。</div>
  `, "PRODUCT MAP"),
  slide(7, "S08", "split", "duo-mirror", `
    <div class="split-half">
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${head("MODULE 01", "新手通识", "让学生从“想学但不知道怎么开始”进入可执行状态。")}
        ${bulletRows([
          { title: "解决迷茫", body: "理解 AI 能做什么、岗位看什么、学习路径怎么走。" },
          { title: "解决卡环境", body: "搭好系统环境、GitHub、模板项目和排错入口。" },
          { title: "销售表达", body: "我们先帮他把地图、工具和第一步跑通，不是上来就堆概念。" },
        ])}
      </div>
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div class="num-mega" style="color:#fff;font-size:min(14vw,24vh)">01</div>
        <p class="lead" style="color:rgba(255,255,255,.86);max-width:26ch">把“我想学 AI”变成“我知道今天该做什么”。</p>
      </div>
    </div>
  `, "MODULE 01"),
  slide(8, "S08", "split", "duo-mirror", `
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div class="num-mega" style="color:#fff;font-size:min(14vw,24vh)">02</div>
        <p class="lead" style="color:rgba(255,255,255,.8);max-width:28ch">能写代码，才可能把 AI 学习变成项目产出。</p>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${head("MODULE 02", "Python基础与实战", "补齐真实项目里最底层的可执行能力。")}
        ${bulletRows([
          { title: "学生原始问题", body: "会看教程，但不会处理文件、数据、图表和真实任务。" },
          { title: "学完获得", body: "能读写数据、清洗数据、可视化分析，并做出电商分析报告生成器。" },
          { title: "销售表达", body: "这部分不是为了刷语法，而是让学生具备做项目的基本手脚。" },
        ])}
      </div>
    </div>
  `, "MODULE 02"),
  slide(9, "S08", "split", "duo-mirror", `
    <div class="split-half">
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${head("MODULE 03", "机器学习与深度学习", "让学生从工具层表达，升级到模型层理解。")}
        ${bulletRows([
          { title: "学生原始问题", body: "只会调工具，不知道模型为什么这样训练、验证和调参。" },
          { title: "学完获得", body: "理解 ML 流水线、模型调优、PyTorch、CNN、RNN、GNN、Transformer。" },
          { title: "销售表达", body: "面试时不只说用了什么工具，还能讲清项目逻辑和实验过程。" },
        ])}
      </div>
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div class="num-mega" style="color:#fff;font-size:min(14vw,24vh)">03</div>
        <p class="lead" style="color:rgba(255,255,255,.86);max-width:28ch">不是培养研究员，而是补足 AI 岗位面试的技术底盘。</p>
      </div>
    </div>
  `, "MODULE 03"),
  slide(10, "S08", "split", "duo-mirror", `
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div class="num-mega" style="color:#fff;font-size:min(14vw,24vh)">04</div>
        <p class="lead" style="color:rgba(255,255,255,.8);max-width:27ch">让 AI 成为学生做项目的协作伙伴。</p>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${head("MODULE 04", "Vibe Coding", "解决做得慢、卡得久、最后没产出的问题。")}
        ${bulletRows([
          { title: "学生原始问题", body: "写代码慢、调试挫败、看不懂报错，项目推进很容易中断。" },
          { title: "学完获得", body: "会用 AI 读代码、改代码、定位问题、拆任务、补测试和推进项目。" },
          { title: "销售表达", body: "不是让 AI 替他学，而是教他借助 AI 更快完成真实项目。" },
        ])}
      </div>
    </div>
  `, "MODULE 04"),
  slide(11, "S21", "grey", "grid-reveal", `
    ${head("MODULE 05", "就业技术栈", "把 AI 能力转成就业作品，而不是只听前沿名词。")}
    <div class="grid-12" style="gap:1.2vw">
      ${smallCard("RAG + Prompt", "能做知识库问答、资料检索、提示词与上下文设计。", "card-fill span-4")}
      ${smallCard("Agent 工作流", "能用 Agent 拆任务、委派子任务、评估输出并优化。", "card-fill span-4")}
      ${smallCard("Skill 封装", "能把重复能力封装成可复用技能，形成个人工具栈。", "card-accent span-4")}
      ${smallCard("MCP / OAuth", "理解外部工具连接、认证和服务端集成方式。", "card-fill span-4")}
      ${smallCard("Hooks / Harness", "建立安全审查、自动化管道和交付流程意识。", "card-fill span-4")}
      ${smallCard("就业作品集", "把技术栈组合成能展示、能写简历、能面试讲清的项目。", "card-ink span-4")}
    </div>
  `, "MODULE 05"),
  slide(12, "S21", "light", "grid-reveal", `
    ${head("MODULE 06", "综合项目与作品集", "真正值钱的不是学了多少课，而是最后能拿出什么。")}
    <div class="grid-12" style="gap:1.4vw">
      ${card("完整项目链路", "从选题、环境、数据、模型、工程到展示，形成闭环。", "card-fill span-3")}
      ${card("可展示 Demo", "让销售能讲清：学生不是只有听课记录，而是有可演示成果。", "card-accent span-3")}
      ${card("README 与复盘", "把项目背景、技术路线、难点、结果写成可被面试官理解的材料。", "card-fill span-3")}
      ${card("简历项目描述", "把课堂产出转成简历中的项目经历和面试讲述素材。", "card-ink span-3")}
    </div>
  `, "MODULE 06"),
  slide(13, "S05", "grey", "stack-build", `
    ${head("SERVICE VALUE", "服务不是赠品，是交付系统", "销售不能只讲课程多，还要讲怎么陪学生走完。")}
    <div class="grid-12" style="gap:1.4vw">
      ${card("入学启动", "建档、确认目标、开通社群和录播，让学生第一天知道怎么开始。", "card-fill span-4")}
      ${card("过程监督", "封班强监督、直播提醒、进度跟进，降低半途掉队概率。", "card-accent span-4")}
      ${card("答疑支持", "环境报错、代码跑不通、知识点卡壳时，有老师驻场答疑。", "card-fill span-4")}
      ${card("项目推进", "作业检查、项目产出检查，推动学生把学习变成材料。", "card-fill span-4")}
      ${card("求职准备", "简历优化、模拟面试、技术面/项目面/HR面准备。", "card-ink span-4")}
      ${card("资料供给", "岗位库、面经、笔试资料持续更新，帮助学生进入求职状态。", "card-fill span-4")}
    </div>
  `, "SERVICE VALUE"),
  slide(14, "S11", "light", "progression", `
    ${head("SALES METHOD", "销售表达顺序", "别从技术名词开始，从购买者的问题开始。")}
    <div class="timeline-h" style="margin-top:6vh">
      <div class="tl-row">
        ${[
          ["01", "先讲痛点", "你现在卡在方向、项目还是求职材料？"],
          ["02", "再讲路径", "我们按模块把能力一步步补起来"],
          ["03", "讲可见产出", "Demo、README、简历项目、面试表达"],
          ["04", "讲服务保障", "督学、答疑、项目推进、求职准备"],
          ["05", "讲边界", "不承诺结果，只承诺可控交付"],
        ].map(([yr, name, desc], i) => `<div class="th-node ${i === 2 ? "accent" : ""} ${i % 2 ? "down" : "up"}">
          <div class="dot"></div><div class="label"><div class="yr">${yr}</div><div class="name">${esc(name)}</div><div class="desc">${esc(desc)}</div></div>
        </div>`).join("")}
      </div>
    </div>
  `, "SALES METHOD"),
  slide(15, "S08", "split", "duo-mirror", `
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        <div class="t-meta" style="color:rgba(255,255,255,.62);letter-spacing:.22em">DO NOT SAY</div>
        <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(6.2vw,10.8vh);font-weight:200;line-height:1;color:#fff">不要这样讲</h2>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:center">
        ${bulletRows([
          { title: "不要堆技术名词", body: "RAG、Agent、MCP 不是卖点本身，能做出什么才是。" },
          { title: "不要只说课很多", body: "课时数量不能替代学习结果，要落到项目和材料。" },
          { title: "不要做结果型承诺", body: "我们讲课程、项目、服务、求职准备，不讲不可控结果。" },
        ])}
      </div>
    </div>
  `, "DO NOT SAY"),
  slide(16, "S16", "grey", "grid-reveal", `
    ${head("USER-SPECIFIC PITCH", "三类用户，三种重点", "同一句产品介绍，不适合所有人。")}
    <div class="grid-12" style="gap:1.4vw">
      ${card("计算机学生", "重点讲：项目弱怎么补、简历空怎么填、面试怎么讲深。", "card-fill span-4")}
      ${card("互联网转岗", "重点讲：原经验如何迁移到 AI 项目，工具使用如何升级成作品。", "card-accent span-4")}
      ${card("跨专业人群", "重点讲：学习顺序、入门门槛、行业背景如何变成 AI 增强能力。", "card-fill span-4")}
    </div>
    <div class="card-ink" style="margin-top:2vh;padding:2.2vh 1.6vw">
      <div class="t-cat">统一收束</div>
      <p style="font-size:max(17px,1.08vw);line-height:1.55">不管哪类人，最后都要落到：路径清楚、项目可见、表达可用。</p>
    </div>
  `, "PITCH BY USER"),
  slide(17, "S12", "light", "grid-reveal", `
    ${head("TALK TRACK", "成交沟通模板", "销售可以直接套这四句，把产品讲完整。")}
    ${bulletRows([
      { title: "一句话总价值", body: "这套课不是只教 AI，而是帮你从看懂岗位到做出项目，再到进入求职准备状态。" },
      { title: "模块价值", body: "前面补基础，中间提效率，后面做就业技术栈和作品集。" },
      { title: "服务保障", body: "过程中有督学、答疑、项目推进、简历优化和模拟面试。" },
      { title: "可见产出", body: "最终要沉淀 Demo、README、项目描述和面试表达，而不是只留下听课记录。" },
    ])}
  `, "TALK TRACK"),
  `<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1"><div class="l">18 / ${total}</div><div class="r">CLOSING</div></div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em;margin-bottom:1.6vh">REMEMBER</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(7.2vw,12.8vh);line-height:.96;letter-spacing:-.025em;font-weight:200;color:#fff">路径<br/>项目<br/>表达</h2>
          <div style="font-size:max(16px,1vw);line-height:1.6;color:rgba(255,255,255,.82);font-weight:400;max-width:34ch;margin-top:1.4vh">销售不需要讲懂每节课，但要讲清学生最后能得到什么。</div>
        </div>
        <div data-anim="signature" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">AI JOB TRAINING</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">END</div>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min"><div class="l">TAKEAWAYS</div><div class="r">03 RULES</div></div>
        ${bulletRows([
          { title: "路径", body: "把课程讲成从迷茫到求职准备的路径。" },
          { title: "项目", body: "把模块讲成学生能做出的可见成果。" },
          { title: "表达", body: "把技术讲成简历、面试和成交沟通里的语言。" },
        ])}
        <div data-anim="foot" class="t-meta" style="color:var(--text-helper);text-align:right">→ END OF TRAINING</div>
      </div>
    </div>
  </div>
</section>`,
];

const notes = [
  ["封面", "开场先定调：这不是技术教学培训，而是销售团队的产品理解培训。销售需要知道每个模块怎么帮助学生，而不是去讲每节课怎么教。"],
  ["培训目标", "强调今天要解决三个问题：销售听懂产品路径、讲清模块价值、避免错误承诺。"],
  ["产品一句话", "把产品从课时和项目数量，翻译成一条完整路径：看懂岗位、补齐能力、做出项目、整理材料、进入求职准备。"],
  ["用户痛点", "提醒销售先问痛点。用户买的不是课程名，而是希望解决方向、基础、项目、表达这些问题。"],
  ["目标人群", "三类适配人群要分开讲。不适配人群也要讲清，避免错误成交和后续交付风险。"],
  ["产品路径图", "用六个模块解释产品结构。注意不要逐课讲，而是讲每个模块在路径中的角色。"],
  ["模块1 新手通识", "讲给销售听：这一模块负责让学生启动，不是负责把学生教成专家。重点是地图、环境、项目入口。"],
  ["模块2 Python基础与实战", "强调 Python 不是抽象语法课，而是让学生具备做真实项目的基本手脚。"],
  ["模块3 机器学习与深度学习", "强调这部分让学生面试不止会说工具，而能说清模型、训练、验证、调参和实验过程。"],
  ["模块4 Vibe Coding", "讲清 AI 协作开发的价值：提高推进项目的效率，降低卡住不动的概率。"],
  ["模块5 就业技术栈", "这是最能体现就业作品差异的模块。RAG、Agent、Skill、MCP 等都要落到作品和简历表达。"],
  ["模块6 综合项目与作品集", "强调最终可见成果：Demo、README、复盘、简历项目描述。"],
  ["服务模块", "课程只是内容，服务是交付系统。讲督学、答疑、项目推进、求职准备这些可控动作。"],
  ["销售表达顺序", "训练销售别从技术名词开始，先问痛点，再讲路径、成果、服务和边界。"],
  ["不要这样讲", "重点提醒风险：不堆名词、不只说课多、不做结果型承诺。"],
  ["三类用户讲法", "让销售针对不同人群换重点：学生讲项目和面试，转岗讲迁移，跨专业讲路径和门槛。"],
  ["成交沟通模板", "这页可以让销售直接记四句话：总价值、模块价值、服务保障、可见产出。"],
  ["结尾", "收束成三个词：路径、项目、表达。销售只要围绕这三个词讲，产品价值就不会跑偏。"],
];

let template = fs.readFileSync(templatePath, "utf8");
template = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
template = template.replace(/<div id="deck">[\s\S]*?<div id="nav"><\/div>/, `<div id="deck">\n${slides.join("\n\n")}\n</div>\n\n<div id="nav"></div>`);
fs.writeFileSync(outHtml, template, "utf8");

const noteMd = `# AI就业班产品培训PPT：逐页讲稿\n\n` + notes.map((note, index) => `## ${index + 1}. ${note[0]}\n\n${note[1]}\n`).join("\n");
fs.writeFileSync(scriptOut, noteMd, "utf8");

console.log(outHtml);
console.log(scriptOut);

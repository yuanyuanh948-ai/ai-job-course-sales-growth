import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const mdPath = path.join(root, "outputs", "AI就业班课程与服务价值拆解-销售团队沟通版.md");
const htmlPath = path.join(root, "outputs", "AI就业班课程与服务价值拆解-销售团队沟通版.html");

const markdown = fs.readFileSync(mdPath, "utf8");
const lines = markdown.replace(/\r\n/g, "\n").split("\n");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value, index) {
  const clean = value
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return clean || `section-${index}`;
}

const headings = [];
let h2Index = 0;
for (const line of lines) {
  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) {
    h2Index += 1;
    headings.push({ title: h2[1].trim(), id: slugify(h2[1], h2Index) });
  }
}

function countCards(sectionTitle) {
  let active = false;
  let count = 0;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      active = h2[1].trim() === sectionTitle;
      continue;
    }
    if (active && /^###\s+/.test(line)) count += 1;
  }
  return count;
}

const stats = [
  { label: "产品模块", value: countCards("产品模块总览") },
  { label: "基础课程价值卡", value: countCards("逐模块价值拆解") },
  { label: "就业技术栈卡", value: countCards("就业技术栈模块价值拆解") },
  { label: "服务动作卡", value: countCards("服务模块价值拆解") },
];

let html = "";
let inList = false;
let inDetails = false;
let inField = false;
let inSection = false;
let h2Counter = 0;

function closeList() {
  if (inList) {
    html += "</ul>\n";
    inList = false;
  }
}

function closeField() {
  if (inField) {
    closeList();
    html += "</div>\n";
    inField = false;
  }
}

function closeDetails() {
  if (inDetails) {
    closeField();
    closeList();
    html += "</div></details>\n";
    inDetails = false;
  }
}

function closeSection() {
  if (inSection) {
    closeDetails();
    closeField();
    closeList();
    html += "</section>\n";
    inSection = false;
  }
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

for (const rawLine of lines) {
  const line = rawLine.trimEnd();
  if (!line.trim()) {
    closeList();
    continue;
  }

  const h1 = line.match(/^#\s+(.+)$/);
  if (h1) continue;

  const h2 = line.match(/^##\s+(.+)$/);
  if (h2) {
    closeSection();
    h2Counter += 1;
    const title = h2[1].trim();
    html += `<section class="doc-section" id="${slugify(title, h2Counter)}">\n`;
    html += `<div class="section-kicker">Section ${String(h2Counter).padStart(2, "0")}</div>\n`;
    html += `<h2>${inlineMarkdown(title)}</h2>\n`;
    inSection = true;
    continue;
  }

  const h3 = line.match(/^###\s+(.+)$/);
  if (h3) {
    closeDetails();
    const title = h3[1].trim();
    const kind = title.startsWith("模块") ? "module" : /^\d+\./.test(title) ? "numbered" : "plain";
    html += `<details class="value-card ${kind}">\n`;
    html += `<summary><span>${inlineMarkdown(title)}</span></summary>\n`;
    html += `<div class="card-body">\n`;
    inDetails = true;
    continue;
  }

  const field = line.match(/^\*\*(.+?)\*\*：\s*(.*)$/);
  if (field) {
    closeField();
    const label = field[1].trim();
    const body = field[2].trim();
    const fieldClass = label === "销售表达" ? "field sales-field" : "field";
    html += `<div class="${fieldClass}" data-label="${escapeHtml(label)}">`;
    html += `<div class="field-label">${inlineMarkdown(label)}</div>`;
    if (body) html += `<p>${inlineMarkdown(body)}</p>`;
    inField = true;
    continue;
  }

  const list = line.match(/^-\s+(.+)$/);
  if (list) {
    if (!inList) {
      html += "<ul>\n";
      inList = true;
    }
    html += `<li>${inlineMarkdown(list[1])}</li>\n`;
    continue;
  }

  closeList();
  html += `<p>${inlineMarkdown(line)}</p>\n`;
}

closeDetails();
closeField();
closeList();
closeSection();

const title = (lines.find((line) => line.startsWith("# ")) || "# AI就业班课程与服务价值拆解")
  .replace(/^#\s+/, "")
  .trim();

const page = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --bg: #f5f5f7;
      --paper: #ffffff;
      --ink: #1d1d1f;
      --muted: #6e6e73;
      --soft: #86868b;
      --line: #d2d2d7;
      --hairline: #e8e8ed;
      --accent: #0071e3;
      --accent-dark: #005bb5;
      --accent-soft: #eaf4ff;
      --warn-soft: #f5f5f7;
      --shadow: 0 22px 70px rgba(0, 0, 0, 0.08);
      --radius: 8px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
      line-height: 1.68;
      letter-spacing: 0;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    a { color: inherit; }

    .layout {
      display: grid;
      grid-template-columns: 276px minmax(0, 1fr);
      min-height: 100dvh;
    }

    .sidebar {
      position: sticky;
      top: 0;
      height: 100dvh;
      border-right: 1px solid var(--hairline);
      background: rgba(245, 245, 247, 0.82);
      backdrop-filter: saturate(180%) blur(18px);
      padding: 32px 22px;
      overflow: auto;
    }

    .brand {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 12px;
      font-weight: 700;
    }

    .sidebar h2 {
      font-size: 22px;
      line-height: 1.16;
      margin: 0 0 28px;
      letter-spacing: 0;
    }

    .nav-title {
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      margin: 28px 0 12px;
      font-weight: 800;
    }

    .toc {
      display: grid;
      gap: 2px;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    .toc a {
      display: block;
      padding: 8px 10px;
      border-radius: var(--radius);
      color: #424245;
      font-size: 13px;
      text-decoration: none;
    }

    .toc a:hover {
      background: #ffffff;
      color: var(--accent);
    }

    .content {
      width: min(1160px, calc(100vw - 276px));
      margin: 0 auto;
      padding: 40px 34px 88px;
    }

    .hero {
      background:
        radial-gradient(circle at 82% 18%, rgba(0, 113, 227, 0.14), transparent 30%),
        linear-gradient(145deg, #ffffff, #f8f8fa);
      border: 1px solid #ffffff;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: clamp(34px, 6vw, 76px);
      margin-bottom: 28px;
      min-height: 430px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--accent);
      font-weight: 800;
      font-size: 13px;
      margin-bottom: 16px;
    }

    .eyebrow::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: var(--accent);
    }

    h1 {
      max-width: 980px;
      margin: 0;
      font-size: clamp(42px, 7vw, 86px);
      line-height: 1.02;
      font-weight: 800;
      letter-spacing: 0;
    }

    .hero p {
      max-width: 760px;
      margin: 24px 0 0;
      color: var(--muted);
      font-size: clamp(18px, 2vw, 24px);
      line-height: 1.45;
      font-weight: 500;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 44px;
    }

    .stat {
      border: 1px solid var(--hairline);
      border-radius: var(--radius);
      padding: 18px;
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: blur(12px);
    }

    .stat strong {
      display: block;
      font-size: 34px;
      line-height: 1;
      color: var(--ink);
      margin-bottom: 9px;
      letter-spacing: 0;
    }

    .stat span {
      color: var(--muted);
      font-size: 13px;
      font-weight: 700;
    }

    .toolbar {
      position: sticky;
      top: 16px;
      z-index: 5;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto auto;
      gap: 8px;
      align-items: center;
      margin: 0 0 22px;
      padding: 8px;
      border: 1px solid rgba(210, 210, 215, 0.8);
      border-radius: var(--radius);
      background: rgba(255, 255, 255, 0.72);
      backdrop-filter: saturate(180%) blur(18px);
      box-shadow: 0 12px 34px rgba(0, 0, 0, 0.06);
    }

    .search {
      width: 100%;
      border: 1px solid transparent;
      border-radius: var(--radius);
      padding: 12px 14px;
      font-size: 14px;
      color: var(--ink);
      outline: none;
      background: #f5f5f7;
    }

    .search:focus {
      border-color: var(--accent);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.14);
    }

    button {
      min-height: 40px;
      border: 1px solid transparent;
      border-radius: var(--radius);
      background: #1d1d1f;
      color: #fff;
      padding: 0 15px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: transform 140ms ease, background 140ms ease, color 140ms ease;
    }

    button:hover {
      color: #fff;
      background: var(--accent);
      transform: translateY(-1px);
    }

    .doc-section {
      background: var(--paper);
      border: 1px solid #ffffff;
      border-radius: var(--radius);
      padding: clamp(26px, 4vw, 48px);
      margin: 22px 0;
      box-shadow: 0 16px 42px rgba(0, 0, 0, 0.045);
    }

    .section-kicker {
      color: var(--accent);
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .doc-section h2 {
      margin: 0 0 24px;
      font-size: clamp(30px, 4vw, 52px);
      line-height: 1.08;
      letter-spacing: 0;
    }

    .doc-section > p {
      max-width: 900px;
      margin: 0 0 14px;
      color: #424245;
      font-size: 16px;
    }

    .doc-section > ul {
      margin: 8px 0 20px;
    }

    .value-card {
      border: 1px solid var(--hairline);
      border-radius: var(--radius);
      background: var(--paper);
      margin: 12px 0;
      overflow: clip;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }

    .value-card[open] {
      border-color: #d8d8de;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.055);
    }

    .value-card summary {
      list-style: none;
      cursor: pointer;
      padding: 18px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-weight: 800;
      color: var(--ink);
      background: #ffffff;
      font-size: 16px;
    }

    .value-card summary::-webkit-details-marker { display: none; }

    .value-card summary::after {
      content: "+";
      width: 28px;
      height: 28px;
      display: inline-grid;
      place-items: center;
      border: 1px solid var(--hairline);
      border-radius: 999px;
      color: var(--accent);
      flex: 0 0 auto;
      font-weight: 600;
    }

    .value-card[open] summary::after { content: "-"; }

    .card-body {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      padding: 16px;
      border-top: 1px solid var(--hairline);
      background: #fbfbfd;
    }

    .field {
      min-width: 0;
      border: 1px solid var(--hairline);
      border-radius: var(--radius);
      padding: 14px 15px;
      background: #fff;
    }

    .field-label {
      display: inline-block;
      color: var(--soft);
      font-size: 12px;
      font-weight: 900;
      margin-bottom: 8px;
    }

    .field p {
      margin: 0;
      color: #424245;
      font-size: 14px;
    }

    .field ul {
      margin: 0;
      padding-left: 18px;
      color: #424245;
      font-size: 14px;
    }

    .sales-field {
      grid-column: 1 / -1;
      background: var(--accent-soft);
      border-color: #b8dcff;
      position: relative;
      padding-right: 118px;
    }

    .copy-sales {
      position: absolute;
      right: 12px;
      top: 12px;
      min-height: 30px;
      font-size: 12px;
      background: var(--accent);
      color: #fff;
    }

    .doc-section > .field {
      margin: 10px 0;
    }

    .doc-section > ul {
      border-left: 2px solid var(--accent);
      padding: 12px 12px 12px 22px;
      background: #fbfbfd;
      border-radius: var(--radius);
    }

    .hidden { display: none !important; }

    .empty-state {
      display: none;
      border: 1px dashed var(--line);
      border-radius: var(--radius);
      padding: 22px;
      color: var(--muted);
      background: #fff;
      text-align: center;
    }

    .empty-state.show { display: block; }

    @media print {
      body { background: #fff; }
      .layout { display: block; }
      .sidebar, .toolbar { display: none; }
      .content { width: auto; padding: 0; }
      .hero, .doc-section, .value-card { box-shadow: none; break-inside: avoid; }
      .value-card { display: block; }
      .value-card:not([open]) .card-body { display: grid; }
      .value-card summary::after { display: none; }
    }

    @media (max-width: 980px) {
      .layout { display: block; }
      .sidebar {
        position: relative;
        height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }
      .content {
        width: 100%;
        padding: 18px;
      }
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .toolbar {
        top: 0;
        grid-template-columns: 1fr;
      }
      .card-body { grid-template-columns: 1fr; }
      .sales-field { padding-right: 13px; }
      .copy-sales {
        position: static;
        margin-top: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="layout">
    <aside class="sidebar">
      <span class="brand">AI就业班销售资料</span>
      <h2>课程与服务价值拆解</h2>
      <div class="nav-title">目录</div>
      <ol class="toc">
        ${headings.map((heading) => `<li><a href="#${heading.id}">${escapeHtml(heading.title)}</a></li>`).join("\n        ")}
      </ol>
      <div class="nav-title">使用方式</div>
      <p style="font-size:13px;color:var(--muted);margin:0;">搜索学员痛点、岗位能力或模块名；展开卡片后可复制“销售表达”。</p>
    </aside>

    <main class="content">
      <header class="hero">
        <div class="eyebrow">销售团队沟通版</div>
        <h1>${escapeHtml(title)}</h1>
        <p>把课程表翻译成购买者能感知的价值：为什么要学、解决什么就业问题、能拿出什么成果、销售该怎么讲。</p>
        <div class="stats">
          ${stats.map((stat) => `<div class="stat"><strong>${stat.value}</strong><span>${escapeHtml(stat.label)}</span></div>`).join("\n          ")}
        </div>
      </header>

      <div class="toolbar">
        <input class="search" id="search" type="search" placeholder="搜索：RAG / 简历 / 面试 / 0基础 / 销售表达" />
        <button id="expandAll" type="button">全部展开</button>
        <button id="collapseAll" type="button">全部收起</button>
        <button id="printPage" type="button">打印</button>
      </div>

      <div id="emptyState" class="empty-state">没有找到匹配内容，换一个关键词试试。</div>
      ${html}
    </main>
  </div>

  <script>
    const cards = Array.from(document.querySelectorAll(".value-card"));
    const search = document.querySelector("#search");
    const emptyState = document.querySelector("#emptyState");

    cards.slice(0, 10).forEach((card) => card.open = true);

    document.querySelector("#expandAll").addEventListener("click", () => {
      cards.forEach((card) => card.open = true);
    });

    document.querySelector("#collapseAll").addEventListener("click", () => {
      cards.forEach((card) => card.open = false);
    });

    document.querySelector("#printPage").addEventListener("click", () => {
      cards.forEach((card) => card.open = true);
      window.print();
    });

    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    document.querySelectorAll(".sales-field").forEach((field) => {
      const button = document.createElement("button");
      button.className = "copy-sales";
      button.type = "button";
      button.textContent = "复制话术";
      button.addEventListener("click", async () => {
        const text = field.innerText.replace("销售表达", "").replace("复制话术", "").trim();
        await copyText(text);
        button.textContent = "已复制";
        setTimeout(() => button.textContent = "复制话术", 1200);
      });
      field.appendChild(button);
    });

    search.addEventListener("input", () => {
      const keyword = search.value.trim().toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const match = !keyword || card.innerText.toLowerCase().includes(keyword);
        card.classList.toggle("hidden", !match);
        if (match) {
          visible += 1;
          if (keyword) card.open = true;
        }
      });
      emptyState.classList.toggle("show", Boolean(keyword) && visible === 0);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(htmlPath, page, "utf8");
console.log(htmlPath);

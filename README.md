# AI就业班销售与产品培训材料归档

本目录是 AI就业班销售团队材料的工作区，包含课程价值拆解、可视化 HTML、Word 版、产品培训网页 PPT、常规 PPTX 和逐页讲稿。

## 主要产物

- `docs/ai-job-growth-sales-strategy.md`
  - 本轮关于老学员二转、公域社群、两条漏斗和销售分层的策略归档。
- `docs/public-traffic-community-operation-plan.md`
  - 公域社群运营方案，包含 17:00 固定投送 SOP、两周滚动内容池、触发词、私信分层和公开课预热链路。
- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.md`
  - 核心源文档，面向销售团队，把课程和服务拆成“痛点、收获、就业价值、可见产出、销售表达”。
- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.html`
  - Markdown 的可视化网页版，含搜索、展开、复制话术、打印。
- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.docx`
  - Word 版本，含目录和标题层级。
- `outputs/AI就业班产品培训PPT-Guizang/index.html`
  - 使用 `guizang-ppt-skill` Swiss Style 模板生成的横向翻页网页 PPT。
- `outputs/AI就业班产品培训PPT-销售团队版.pptx`
  - 常规 PowerPoint 版本，共 18 页。
- `outputs/AI就业班产品培训PPT-逐页讲稿.md`
  - 产品培训 PPT 的逐页讲稿。

## 生成脚本

- `work/build-sales-html.mjs`
  - 从 Markdown 生成可视化 HTML。
- `work/build-guizang-sales-training-deck.mjs`
  - 从 Guizang Swiss 模板生成网页 PPT 和逐页讲稿。
- `work/build-sales-training-pptx.py`
  - 生成常规 `.pptx` 文件。

## 重新生成命令

```powershell
node work\build-sales-html.mjs
node work\build-guizang-sales-training-deck.mjs
python work\build-sales-training-pptx.py
```

## 验证命令

```powershell
node C:\Users\Administrator\.codex\skills\guizang-ppt-skill\scripts\validate-swiss-deck.mjs outputs\AI就业班产品培训PPT-Guizang\index.html
```

已验证的关键边界：

- 使用 `就业技术栈`，不再使用旧标题 `就业向实验室`。
- 已删除 `数据基础与课程路线`。
- 已删除 `四大实验室详解与就业向路径`。
- 成品中不使用 `包就业`、`保证就业`、`保证涨薪` 等风险表达。

更多交接细节见 `docs/handoff-ai-job-course-sales-materials.md`。

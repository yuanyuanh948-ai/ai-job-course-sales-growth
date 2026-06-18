# AI就业班销售材料交接说明

更新时间：2026-06-13

## 当前状态

本工作区已完成三类销售支持材料：

1. 课程与服务价值拆解文档
2. 销售团队可视化阅读版
3. 20-30 分钟产品培训 PPT 和逐页讲稿

核心定位是“帮助销售听懂产品价值”，不是给教研老师做逐课教学讲义。

## 新增归档

- `docs/ai-job-growth-sales-strategy.md`
  - 本轮关于老学员二转、公域社群、两条漏斗和销售分层的策略归档。

## 内容原则

- 面向销售团队，表达偏“用户痛点、产品路径、可见成果、销售话术”。
- 不逐节课讲教学内容，只讲课程模块能帮助学生解决什么就业问题。
- 技术名词必须翻译成购买者能感知的价值。
- 不承诺就业结果，只讲课程、项目、服务、作品集、简历、面试准备等可控交付。

禁用或避免的表达：

- `包就业`
- `保证就业`
- `保证涨薪`
- 暗示必然拿 offer、必然转岗成功、必然涨薪的表达

## 已确认的重要修改

- 模块标题已统一为 `就业技术栈`。
- 旧标题 `就业向实验室` 已移除。
- `数据基础与课程路线` 小节已删除。
- `四大实验室详解与就业向路径` 小节已删除。
- 文档和 PPT 均围绕 6 个产品模块展开：
  - 新手通识
  - Python基础与实战
  - 机器学习与深度学习
  - Vibe Coding
  - 就业技术栈
  - 综合项目与作品集

## 产物说明

### 课程价值拆解

源文件：

- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.md`

衍生文件：

- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.html`
- `outputs/AI就业班课程与服务价值拆解-销售团队沟通版.docx`

HTML 版功能：

- 左侧目录
- 搜索
- 课程/服务卡片展开收起
- 销售表达复制
- 打印

### 产品培训 PPT

Guizang 网页 PPT：

- `outputs/AI就业班产品培训PPT-Guizang/index.html`

常规 PPTX：

- `outputs/AI就业班产品培训PPT-销售团队版.pptx`

讲稿：

- `outputs/AI就业班产品培训PPT-逐页讲稿.md`

PPT 结构为 18 页，适合 20-30 分钟内部培训。重点讲：

- 产品一句话价值
- 目标用户和痛点
- 六个课程模块的作用
- 服务模块的价值
- 销售表达顺序
- 不该怎么讲
- 三类用户的不同讲法
- 成交沟通模板

## 生成与维护

如果只改课程价值拆解内容，优先修改：

```text
outputs/AI就业班课程与服务价值拆解-销售团队沟通版.md
```

然后重新生成 HTML：

```powershell
node work\build-sales-html.mjs
```

如果要改网页 PPT 或逐页讲稿，修改：

```text
work/build-guizang-sales-training-deck.mjs
```

然后重新生成：

```powershell
node work\build-guizang-sales-training-deck.mjs
```

如果要改常规 PPTX，修改：

```text
work/build-sales-training-pptx.py
```

然后重新生成：

```powershell
python work\build-sales-training-pptx.py
```

## 验证清单

每次修改后至少检查：

```powershell
node C:\Users\Administrator\.codex\skills\guizang-ppt-skill\scripts\validate-swiss-deck.mjs outputs\AI就业班产品培训PPT-Guizang\index.html
```

关键词检查：

```powershell
Select-String -Path outputs\* -Pattern "就业向实验室|数据基础与课程路线|四大实验室详解与就业向路径|包就业|保证就业|保证涨薪" -Recurse
```

期望结果：

- Guizang validator 通过。
- 不出现旧标题和已删除小节。
- 不出现风险承诺表达。
- `就业技术栈` 仍然存在。

## 原始素材与中间材料

原始/抽取材料主要在：

- `work/job_project_materials/`
- `work/pdf_extract/`

这些目录保存了产品手册、产品详情图、课程大纲图、内部大纲 Excel 的抽取结果。后续如果要重新做更深版本，应优先回看这些材料，而不是只看 PPT。

## 下次 Agent 接手建议

1. 先读本文件和 `README.md`。
2. 再读核心 Markdown 源文档。
3. 如果任务是“改内容”，先改 Markdown 或对应构建脚本。
4. 如果任务是“改视觉”，优先改生成脚本，不要只改生成后的 HTML/PPT。
5. 修改后必须重新跑生成命令和验证命令。

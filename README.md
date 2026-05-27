# Orion · Personal Homepage

[**jesson-hh.github.io**](https://jesson-hh.github.io) — Yi Xu 的个人 AI 工作室主页。深夜星空主题(Orion · Dream Stars),Astro 5 + 原生 HTML/CSS,canvas 真实星空 + cursor 唤醒 + 流星 + 滚动卷轴 + 多页双语。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # 输出到 dist/
npm run preview      # 预览构建产物
```

## 部署

每次 push 到 `main`,GitHub Actions(`.github/workflows/deploy.yml`)自动 `npm ci && astro build`,把 `dist/` 部署到 Pages。

在仓库 **Settings → Pages → Source** 选 **GitHub Actions** 一次就行。

## 结构

```
src/
├── components/      # Hero, WorkList, About, Writing, Footer, Nav, ProjectDetail, PostArticle, ...
├── data/content.ts  # 项目 + 文章 + 站点元数据(中英双语)
├── i18n/ui.ts       # 路径本地化 + UI 翻译
├── layouts/Base.astro    # 全站布局,星空 canvas / spotlight / reading-thread 在这里
├── pages/                # /(zh) + /en/ + /writing + /projects/[slug] + /writing/[slug]
└── styles/global.css     # Dream Stars 暗色主题变量
public/
├── stars/                # 3 张深空 SVG 背景
│   └── thumbs/           # 7 张项目缩略图(每项目一张主题图)
├── portrait.jpg          # About 区头像
└── favicon.svg
```

## 项目

7 个项目陈列在主页 Work 区,点击进入详情页:Agent 组网(进行中)/ PDE 神经算子 / 觀瀾 / OSS-Scout / 记忆共享 / Paper Distiller / Jarvis。

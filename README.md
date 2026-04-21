# HiHarmonyOS

基于 Astro 构建的鸿蒙技术博客，定位为 IT 极客风格内容站，使用域名 `www.hiharmonyos.com`，适合部署到 GitHub + Vercel。

## 技术栈

- Astro 5
- Markdown 内容管理
- Vercel 静态部署

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## Vercel 部署

1. 将仓库推送到 GitHub。
2. 在 Vercel 导入该仓库。
3. Framework Preset 选择 `Astro`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 在 Vercel 域名设置中绑定 `www.hiharmonyos.com`。

## 内容目录

- 文章：`src/content/posts`
- 首页：`src/pages/index.astro`
- 博客列表：`src/pages/blog/index.astro`
- 文章详情：`src/pages/blog/[slug].astro`

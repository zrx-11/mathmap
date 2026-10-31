# 数学学习全景图（3D 交互版）

从最初接触数学（数与运算）到世界前沿研究方向的**数学知识全景地图**。

154 个知识节点、256 条依赖边、15 个大类，按知识深度划分为 **L0–L6 七个阶段**（而非学期），重点标注 **AI 大模型** 与 **金融量化** 两条垂直路径。

## 特性

- **3D 立体图谱**（three.js）：按住拖动旋转、滚轮 / 双指缩放、悬停节点放大
- 每个节点包含**五要素**：所属大类、内容介绍、前置知识、后置方向、具体应用
- 点击详情中的前置 / 后置标签，可跳转并高亮对应依赖链
- 按阶段 / 大类 / 路径筛选，支持关键词搜索
- 打开时三批分层点亮入场动画；桌面与移动端自适应
- 三类节点造型：圆球 = 公共基础 · 八面体 = AI 路径 · 圆柱 = 金融量化

## 文件说明

| 文件 | 说明 |
| --- | --- |
| `index.html` | 页面入口（结构 + 引用样式与脚本） |
| `style.css` | 全部样式 |
| `app.js` | 154 个节点数据 + three.js 3D 渲染与交互逻辑 |
| `preview.png` | 桌面端效果预览 |
| `README.md` | 本说明 |

## 本地打开

直接用浏览器打开 `index.html` 即可（需与 `style.css`、`app.js` 同目录）。

> 注意：页面通过 jsDelivr CDN 加载 three.js，**首次打开需要联网**；离线状态下图谱无法渲染（会显示不支持提示）。

## 部署到 GitHub Pages

1. **推送仓库**：把本目录三个文件提交到 GitHub 仓库（根目录）：

   ```bash
   git init
   git add index.html README.md preview.png
   git commit -m "数学学习全景图 3D 版"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. **开启 Pages**：打开仓库 **Settings → Pages**：
   - Source 选 `Deploy from a branch`
   - Branch 选 `main`，目录选 `/ (root)`
   - 点击 Save，等待 1–2 分钟即可通过
     `https://<你的用户名>.github.io/<仓库名>/` 访问

3. **（推荐）添加 `.nojekyll`**：在仓库根目录放一个空文件 `.nojekyll`，避免 Jekyll 干扰纯静态页面。

4. **更新内容**：修改后执行 `git add . && git commit -m "update" && git push`，Pages 会自动重新部署。

## 数据说明

- 节点间连线表示「前置 → 后续」学习依赖
- 阶段按知识深度划分：L0 数与运算 → L1 初等数学 → L2 高中阶段 → L3 大学基础 → L4 大学中级 → L5 大学高级 → L6 前沿研究
- 节点内容的掌握标准为建议基准，可按个人目标调整
- 构建于 2026-10

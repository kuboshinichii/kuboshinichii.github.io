# FreeTools.top - 免费在线工具集合

一个现代化的单页网站，为全球用户提供实用、高效的在线工具服务。

## 🌟 项目特性

### ✨ 核心功能
- **JSON格式化工具** - 支持格式化和压缩JSON数据
- **Base64编码/解码工具** - 快速进行Base64转换
- **二维码生成器** - 自定义尺寸和颜色的二维码生成

### 🎨 设计特色
- **响应式设计** - 完美适配桌面、平板和移动设备
- **现代化UI** - 使用CSS变量和渐变效果
- **深色模式支持** - 自动适应系统主题偏好
- **平滑动画** - 优雅的过渡效果和交互反馈

### 🚀 技术特性
- **纯前端实现** - 无需后端服务器，快速部署
- **本地存储** - 自动保存用户输入和偏好设置
- **键盘快捷键** - 提升操作效率
- **错误处理** - 完善的错误提示和用户引导

## 🛠️ 技术栈

- **HTML5** - 语义化标记和现代Web标准
- **CSS3** - 变量、Grid布局、Flexbox、动画
- **JavaScript ES6+** - 模块化、异步处理、本地存储
- **Font Awesome** - 图标库
- **Google AdSense** - 广告集成

## 📁 项目结构

```
FreeToolsGuide/
├── index.html          # 主页面
├── privacy.html        # 隐私政策页面
├── styles.css          # 样式文件
├── script.js           # 功能脚本
└── README.md           # 项目说明
```

## 🚀 快速开始

### 本地运行
1. 克隆或下载项目文件
2. 使用现代浏览器打开 `index.html`
3. 开始使用各种工具

### 在线部署
1. 上传所有文件到Web服务器
2. 确保服务器支持HTTPS（AdSense要求）
3. 配置域名和DNS设置

## 📱 功能详解

### JSON格式化工具
- **格式化** - 将压缩的JSON转换为易读格式
- **压缩** - 移除所有空格和换行符
- **验证** - 自动检测JSON语法错误
- **快捷键** - `Ctrl + Enter` 快速格式化

### Base64工具
- **编码** - 将文本转换为Base64格式
- **解码** - 将Base64转换回原始文本
- **支持Unicode** - 完美处理中文和特殊字符
- **快捷键** - `Ctrl + Shift + E` 编码，`Ctrl + Shift + D` 解码

### 二维码生成器
- **自定义尺寸** - 128x128, 256x256, 512x512
- **颜色选择** - 自定义二维码颜色
- **高纠错级别** - 支持30%数据损坏仍可识别
- **下载功能** - PNG格式高清下载

## 🔧 自定义配置

### AdSense设置
在 `index.html` 中修改以下代码：
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
```

### 颜色主题
在 `styles.css` 中修改CSS变量：
```css
:root {
    --primary-color: #2563eb;    /* 主色调 */
    --secondary-color: #7c3aed;  /* 次要色调 */
    --accent-color: #06b6d4;     /* 强调色 */
}
```

## 📊 性能优化

- **懒加载** - 工具卡片进入视口时才加载
- **防抖处理** - 输入框自动保存优化
- **本地存储** - 减少重复输入
- **代码分割** - 按需加载功能模块

## 🌍 国际化支持

- **多语言界面** - 支持中文和英文
- **全球用户** - 优化的字体和布局
- **时区友好** - 本地化时间显示
- **文化适应** - 符合不同地区的使用习惯

## 🔒 隐私和安全

- **本地处理** - 所有数据在用户浏览器中处理
- **无服务器存储** - 不收集或存储用户数据
- **HTTPS支持** - 安全的数据传输
- **Cookie管理** - 透明的Cookie使用说明

## 📈 部署指南

### GitHub Pages部署

1. **创建仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FreeTools.top website"
   ```

2. **推送到GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/freetools-guide.git
   git branch -M main
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - 选择 Source: Deploy from a branch
   - 选择 main 分支和 / (root) 文件夹
   - 保存设置

4. **自定义域名** (可选)
   - 在 Pages 设置中添加自定义域名
   - 配置DNS记录指向GitHub Pages

### 传统Web服务器部署

1. **上传文件**
   - 将所有项目文件上传到Web服务器
   - 确保文件权限正确

2. **配置服务器**
   ```apache
   # Apache .htaccess
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

3. **SSL证书**
   - 安装SSL证书确保HTTPS访问
   - 配置HTTP到HTTPS的重定向

## 🎯 SEO优化

- **语义化HTML** - 使用正确的标签结构
- **Meta标签** - 完整的页面描述和关键词
- **结构化数据** - 支持搜索引擎理解
- **性能优化** - 快速加载提升排名
- **移动友好** - 响应式设计优化

## 🔧 维护和更新

### 定期检查
- 测试所有工具功能
- 验证AdSense代码有效性
- 检查浏览器兼容性
- 更新依赖库版本

### 功能扩展
- 添加新的实用工具
- 优化用户界面
- 增加数据分析功能
- 支持更多文件格式

## 📞 支持和反馈

- **问题报告** - 通过GitHub Issues提交
- **功能建议** - 欢迎提出改进意见
- **技术支持** - 邮件联系: support@freetools.top

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- Font Awesome 提供的图标
- Google AdSense 的广告服务
- 开源社区的技术支持

---

**FreeTools.top** - 让在线工具使用更简单、更高效！

*最后更新: 2024年12月*

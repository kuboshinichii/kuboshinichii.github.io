# 🛠️ 在线工具集合 - shinichikubo.top

一个功能丰富的在线工具集合网站，提供多种实用的Web工具，包括二维码生成器、代码美化、格式转换等。

## ✨ 功能特色

### 🔧 核心工具
- **📱 二维码生成器** - 生成可扫描的二维码，支持自定义颜色和大小
- **📄 JSON格式化/验证** - JSON数据的格式化和压缩
- **🔐 Base64编码/解码** - 文本的Base64编码和解码
- **💻 代码美化/压缩** - 支持JavaScript、CSS、HTML、JSON、XML的格式化和压缩
- **🔍 正则表达式测试** - 实时测试正则表达式的匹配结果
- **🖼️ 图片格式转换** - 支持JPG、PNG、WEBP格式转换
- **🎬 视频转GIF** - 将视频文件转换为GIF动画

### 🎨 用户体验
- **响应式设计** - 完美适配桌面和移动设备
- **现代化UI** - 简洁美观的界面设计
- **键盘快捷键** - 提高操作效率
- **实时预览** - 即时查看处理结果
- **一键下载** - 方便保存生成的文件
- **多语言支持** - 完整的中英文双语界面，支持语言切换

## 🚀 快速开始

### 本地运行
```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd 在线工具集合

# 启动本地服务器
python -m http.server 8000

# 打开浏览器访问
http://localhost:8000
```

### 在线访问
- **中文版**: [https://shinichikubo.top](https://shinichikubo.top)
- **英文版**: [https://shinichikubo.top/index-en.html](https://shinichikubo.top/index-en.html)

### 🌍 多语言支持
网站提供完整的中英文双语支持：
- **语言切换**: 在导航栏右上角可以切换中英文界面
- **SEO优化**: 支持hreflang标签，帮助搜索引擎识别语言版本
- **独立页面**: 中英文版本使用独立的HTML和JavaScript文件
- **功能一致**: 所有工具功能在两种语言下完全一致

## 📁 项目结构

```
在线工具集合/
├── index.html          # 中文主页面
├── index-en.html       # 英文主页面
├── script.js           # 中文JavaScript逻辑
├── script-en.js        # 英文JavaScript逻辑
├── styles.css          # 样式文件
├── test.html           # 中文测试页面
├── test-en.html        # 英文测试页面
├── README.md           # 项目说明
├── TROUBLESHOOTING.md  # 故障排除指南
├── sitemap.xml         # 网站地图
├── robots.txt          # 搜索引擎爬虫配置
└── 其他资源文件...
```

## 🛠️ 技术栈

- **前端框架**：原生HTML5 + CSS3 + JavaScript
- **二维码生成**：QRCode.js + 在线API备用方案
- **代码美化**：js-beautify
- **GIF生成**：gif.js
- **图标库**：Font Awesome
- **CDN服务**：Cloudflare CDN

## 🔧 功能详解

### 二维码生成器
- 支持文本、URL、联系方式等多种内容
- 自定义二维码大小（128-512px）
- 自定义颜色主题
- 高容错率，确保扫描成功率
- 一键下载PNG格式

### 代码美化工具
- **JavaScript**：ES6+语法支持，智能缩进
- **CSS**：自动格式化，规则分组
- **HTML**：标签对齐，属性排序
- **JSON**：语法验证，格式化输出
- **XML**：标签缩进，属性格式化

### 正则表达式测试器
- 实时匹配结果预览
- 支持全局、忽略大小写、多行模式
- 显示匹配位置和分组信息
- 替换功能演示

### 图片格式转换
- 支持JPG、PNG、WEBP格式
- 可调节压缩质量
- 保持原始尺寸
- 浏览器端处理，保护隐私

### 视频转GIF
- 支持多种视频格式
- 可调节帧率和时长
- 自定义输出尺寸
- 实时预览效果

## 🎯 SEO优化建议

### 1. 添加Meta标签
```html
<meta name="description" content="免费在线工具集合，包含二维码生成器、代码美化、格式转换等实用工具">
<meta name="keywords" content="二维码生成器,在线工具,代码美化,JSON格式化,Base64编码,正则表达式测试">
<meta name="author" content="shinichikubo.top">
```

### 2. 优化页面标题
```html
<title>免费在线工具集合 - 二维码生成器、代码美化、格式转换 | shinichikubo.top</title>
```

### 3. 添加结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "在线工具集合",
  "description": "提供二维码生成器、代码美化等多种实用工具",
  "url": "https://shinichikubo.top",
  "applicationCategory": "DeveloperApplication"
}
</script>
```

### 4. 创建sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://shinichikubo.top/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5. 添加robots.txt
```
User-agent: *
Allow: /
Sitemap: https://shinichikubo.top/sitemap.xml
```

## 🌐 部署指南

### 静态网站托管
推荐使用以下服务：
- **GitHub Pages** - 免费，适合开源项目
- **Netlify** - 免费，自动部署
- **Vercel** - 免费，性能优秀
- **Cloudflare Pages** - 免费，全球CDN

### 部署步骤
1. 将代码推送到GitHub仓库
2. 在托管平台连接GitHub仓库
3. 配置域名（可选）
4. 启用HTTPS
5. 提交sitemap到搜索引擎

## 🔍 搜索引擎优化

### 关键词策略
- **主要关键词**：二维码生成器、在线工具、代码美化
- **长尾关键词**：免费二维码生成器、在线JSON格式化、Base64编码工具
- **本地化关键词**：中文二维码生成器、在线工具集合

### 内容优化
- 添加详细的功能说明
- 提供使用教程和示例
- 定期更新工具功能
- 添加用户反馈和评价

### 技术优化
- 提高页面加载速度
- 优化移动端体验
- 添加面包屑导航
- 实现URL优化

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发环境
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

### 代码规范
- 使用ES6+语法
- 遵循JavaScript标准
- 添加必要的注释
- 确保跨浏览器兼容性

## 📄 许可证

本项目采用MIT许可证，详见[LICENSE](LICENSE)文件。

## 📞 联系方式

- **网站**：[https://shinichikubo.top](https://shinichikubo.top)
- **邮箱**：[contact@shinichikubo.top](mailto:contact@shinichikubo.top)
- **GitHub**：[项目地址]

## 🙏 致谢

感谢以下开源项目的支持：
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) - 二维码生成
- [js-beautify](https://github.com/beautify-web/js-beautify) - 代码美化
- [gif.js](https://github.com/buzzfeed/libgif-js) - GIF生成
- [Font Awesome](https://fontawesome.com/) - 图标库

---

⭐ 如果这个项目对您有帮助，请给我们一个Star！

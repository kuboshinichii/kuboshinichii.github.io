# FreeTools.top 部署指南

本指南将帮助您将FreeTools.top网站部署到各种平台。

## 🚀 快速部署选项

### 1. GitHub Pages (推荐)

**优点：**
- 完全免费
- 自动HTTPS
- 易于维护
- 支持自定义域名

**步骤：**

1. **创建GitHub仓库**
   ```bash
   # 在本地项目目录中
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
   - 进入仓库 → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, Folder: / (root)
   - 点击 Save

4. **等待部署**
   - 通常需要1-5分钟
   - 访问 `https://yourusername.github.io/freetools-guide`

### 2. Netlify

**优点：**
- 免费计划
- 自动部署
- 全球CDN
- 自定义域名支持

**步骤：**

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 连接GitHub仓库
4. 构建命令留空，发布目录设为 `/`
5. 点击 "Deploy site"

### 3. Vercel

**优点：**
- 免费计划
- 极速部署
- 自动HTTPS
- 边缘网络

**步骤：**

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入GitHub仓库
4. 框架预设选择 "Other"
5. 点击 "Deploy"

## 🌐 传统Web服务器部署

### Apache服务器

1. **上传文件**
   ```bash
   # 使用FTP或SCP上传
   scp -r ./* user@your-server:/var/www/html/
   ```

2. **创建.htaccess文件**
   ```apache
   RewriteEngine On
   
   # 强制HTTPS
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   
   # 缓存设置
   <IfModule mod_expires.c>
       ExpiresActive on
       ExpiresByType text/css "access plus 1 year"
       ExpiresByType application/javascript "access plus 1 year"
       ExpiresByType image/png "access plus 1 year"
       ExpiresByType image/jpg "access plus 1 year"
   </IfModule>
   
   # 压缩设置
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/plain
       AddOutputFilterByType DEFLATE text/html
       AddOutputFilterByType DEFLATE text/xml
       AddOutputFilterByType DEFLATE text/css
       AddOutputFilterByType DEFLATE application/xml
       AddOutputFilterByType DEFLATE application/xhtml+xml
       AddOutputFilterByType DEFLATE application/rss+xml
       AddOutputFilterByType DEFLATE application/javascript
       AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   ```

3. **设置文件权限**
   ```bash
   chmod 644 /var/www/html/*
   chmod 755 /var/www/html/
   ```

### Nginx服务器

1. **创建配置文件**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl http2;
       server_name your-domain.com www.your-domain.com;
       
       root /var/www/html;
       index index.html;
       
       # SSL配置
       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;
       
       # 安全头
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       
       # 缓存设置
       location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # 主页面
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # 隐私政策页面
       location /privacy {
           try_files $uri $uri/ /privacy.html;
       }
   }
   ```

2. **重启Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## 🔒 SSL证书配置

### Let's Encrypt (免费)

1. **安装Certbot**
   ```bash
   # Ubuntu/Debian
   sudo apt install certbot python3-certbot-nginx
   
   # CentOS/RHEL
   sudo yum install certbot python3-certbot-nginx
   ```

2. **获取证书**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **自动续期**
   ```bash
   sudo crontab -e
   # 添加以下行
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 📱 移动端优化

### PWA支持

1. **创建manifest.json**
   ```json
   {
     "name": "FreeTools.top",
     "short_name": "FreeTools",
     "description": "免费在线工具集合",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#2563eb",
     "icons": [
       {
         "src": "icon-192x192.png",
         "sizes": "192x192",
         "type": "image/png"
       },
       {
         "src": "icon-512x512.png",
         "sizes": "512x512",
         "type": "image/png"
       }
     ]
   }
   ```

2. **在index.html中添加**
   ```html
   <link rel="manifest" href="/manifest.json">
   <meta name="theme-color" content="#2563eb">
   ```

## 🔍 SEO优化

### 1. 创建sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/privacy.html</loc>
    <lastmod>2024-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 2. 创建robots.txt
```txt
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

### 3. 添加结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FreeTools.top",
  "description": "免费在线工具集合",
  "url": "https://your-domain.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://your-domain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

## 📊 性能监控

### 1. Google PageSpeed Insights
- 访问 [pagespeed.web.dev](https://pagespeed.web.dev)
- 输入您的网站URL
- 分析性能得分和优化建议

### 2. GTmetrix
- 访问 [gtmetrix.com](https://gtmetrix.com)
- 测试网站加载速度
- 获取详细的性能报告

### 3. WebPageTest
- 访问 [webpagetest.org](https://webpagetest.org)
- 从全球多个位置测试
- 分析加载瀑布图

## 🚨 常见问题解决

### 1. AdSense不显示
- 确保网站使用HTTPS
- 检查AdSense代码是否正确插入
- 等待Google审核通过（通常1-3天）

### 2. 移动端显示异常
- 检查viewport meta标签
- 测试响应式断点
- 验证CSS媒体查询

### 3. 加载速度慢
- 启用Gzip压缩
- 设置适当的缓存头
- 优化图片大小
- 使用CDN服务

## 📈 部署后检查清单

- [ ] 网站可以正常访问
- [ ] HTTPS证书正常工作
- [ ] 所有工具功能正常
- [ ] 移动端显示正常
- [ ] AdSense广告显示
- [ ] 隐私政策页面可访问
- [ ] 搜索引擎可以抓取
- [ ] 性能测试通过
- [ ] 错误日志检查
- [ ] 备份策略确认

## 🔄 持续部署

### GitHub Actions自动部署

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /var/www/html
          git pull origin main
          chmod 644 *
          chmod 755 .
```

## 📞 技术支持

如果在部署过程中遇到问题，请：

1. 检查浏览器控制台错误信息
2. 查看服务器错误日志
3. 在GitHub Issues中提交问题
4. 发送邮件到 support@freetools.top

---

**祝您部署顺利！** 🎉

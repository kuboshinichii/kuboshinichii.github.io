// 全局变量


// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupMobileNavigation();
    setupSmoothScrolling();
    setupToolAnimations();
});

// 应用初始化
function initializeApp() {
    console.log('shinichikubo.top 应用已启动');
    
    // 检查必要的库是否已加载
    checkRequiredLibraries();
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化工具状态
    initializeTools();
    
    // 设置自动保存功能
    setupAutoSave();
    
    // 初始化AdSense
    initializeAdSense();
}

// 检查必要的库是否已加载
function checkRequiredLibraries() {
    const libraries = {
        'QRCode': '二维码生成库',
        'js_beautify': '代码美化库',
        'css_beautify': 'CSS美化库',
        'html_beautify': 'HTML美化库',
        'GIF': 'GIF生成库'
    };
    
    const missingLibraries = [];
    const availableLibraries = [];
    
    for (const [lib, name] of Object.entries(libraries)) {
        if (typeof window[lib] !== 'undefined') {
            availableLibraries.push(name);
        } else {
            missingLibraries.push(name);
        }
    }
    
    // 检查二维码库的特殊情况
    const hasQRCode = typeof window.QRCode !== 'undefined';
    
    if (missingLibraries.length > 0) {
        console.warn('以下库加载失败:', missingLibraries.join(', '));
        
        // 如果二维码库缺失但有备用方案，不显示警告
        if (missingLibraries.includes('二维码生成库') && hasQRCode) {
            const filteredMissing = missingLibraries.filter(lib => lib !== '二维码生成库');
            if (filteredMissing.length > 0) {
                showMessage(`部分功能可能不可用: ${filteredMissing.join(', ')}`, 'warning');
            }
        } else {
            showMessage(`部分功能可能不可用: ${missingLibraries.join(', ')}`, 'warning');
        }
        
        // 如果QRCode库缺失且没有备用方案，尝试加载
        if (missingLibraries.includes('二维码生成库') && !hasQRCode) {
            loadQRCodeFallback();
        }
    } else {
        console.log('所有必要的库已成功加载');
    }
    
    // 显示二维码库状态
    if (hasQRCode) {
        console.log('二维码功能可用');
    } else {
        console.warn('二维码功能不可用');
    }
}

// 加载二维码库的备用方案
function loadQRCodeFallback() {
    console.log('尝试加载二维码库备用方案...');
    
    // 尝试从其他CDN加载
    const fallbackScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js',
        'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.js'
    ];
    
    let scriptIndex = 0;
    
    function tryLoadScript() {
        if (scriptIndex >= fallbackScripts.length) {
            console.warn('所有备用CDN都无法加载QRCode库');
            return;
        }
        
        const script = document.createElement('script');
        script.src = fallbackScripts[scriptIndex];
        script.onload = function() {
            console.log('QRCode库从备用CDN加载成功');
            if (typeof QRCode !== 'undefined') {
                showMessage('二维码功能已恢复', 'success');
            }
        };
        script.onerror = function() {
            console.warn(`备用CDN ${fallbackScripts[scriptIndex]} 加载失败`);
            scriptIndex++;
            tryLoadScript();
        };
        
        document.head.appendChild(script);
    }
    
    // 延迟加载，避免阻塞页面
    setTimeout(tryLoadScript, 1000);
}

// 移动端导航设置
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // 点击链接后关闭移动菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// 平滑滚动设置
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 工具动画设置
function setupToolAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.tool-card').forEach(card => {
        observer.observe(card);
    });
}

// 工具初始化
function initializeTools() {
    // 设置输入框自动调整高度
    setupAutoResize();
    
    // 设置键盘快捷键
    setupKeyboardShortcuts();
}

// 自动保存设置 - 已禁用
function setupAutoSave() {
    // 自动保存功能已禁用
    console.log('自动保存功能已禁用');
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(later);
        timeout = setTimeout(later, wait);
    };
}

// 本地存储保存
function saveToLocalStorage() {
    const data = {
        jsonInput: document.getElementById('json-input')?.value || '',
        base64Input: document.getElementById('base64-input')?.value || '',
        qrInput: document.getElementById('qr-input')?.value || '',
        codeInput: document.getElementById('code-input')?.value || '',
        regexPattern: document.getElementById('regex-pattern')?.value || '',
        regexText: document.getElementById('regex-text')?.value || ''
    };
    
    try {
        localStorage.setItem('freetools_data', JSON.stringify(data));
    } catch (e) {
        console.warn('无法保存到本地存储:', e);
    }
}

// 从本地存储恢复
function restoreFromLocalStorage() {
    try {
        const data = localStorage.getItem('freetools_data');
        if (data) {
            const parsed = JSON.parse(data);
            if (parsed.jsonInput) document.getElementById('json-input').value = parsed.jsonInput;
            if (parsed.base64Input) document.getElementById('base64-input').value = parsed.base64Input;
            if (parsed.qrInput) document.getElementById('qr-input').value = parsed.qrInput;
            if (parsed.codeInput) document.getElementById('code-input').value = parsed.codeInput;
            if (parsed.regexPattern) document.getElementById('regex-pattern').value = parsed.regexPattern;
            if (parsed.regexText) document.getElementById('regex-text').value = parsed.regexText;
        }
    } catch (e) {
        console.warn('无法从本地存储恢复数据:', e);
    }
}

// 自动调整输入框高度
function setupAutoResize() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// 键盘快捷键设置
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter 格式化JSON
        if (e.ctrlKey && e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.id === 'json-input') {
                e.preventDefault();
                formatJSON();
            }
        }
        
        // Ctrl+Shift+E 编码Base64
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            encodeBase64();
        }
        
        // Ctrl+Shift+D 解码Base64
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            decodeBase64();
        }
        
        // Ctrl+Shift+Q 生成二维码
        if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
            e.preventDefault();
            generateQR();
        }
        
        // Ctrl+Shift+B 美化代码
        if (e.ctrlKey && e.shiftKey && e.key === 'B') {
            e.preventDefault();
            beautifyCode();
        }
        
        // Ctrl+Shift+R 测试正则表达式
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            testRegex();
        }
    });
}

// ==================== JSON格式化工具 ====================

function formatJSON() {
    const input = document.getElementById('json-input').value.trim();
    const output = document.getElementById('json-output');
    
    if (!input) {
        showMessage('请输入JSON数据', 'error');
        return;
    }
    
    try {
        // 解析JSON
        const parsed = JSON.parse(input);
        
        // 格式化输出
        const formatted = JSON.stringify(parsed, null, 2);
        output.value = formatted;
        
        // 自动调整输出框高度
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('JSON格式化成功！', 'success');
        
    } catch (error) {
        showMessage(`JSON格式错误: ${error.message}`, 'error');
        output.value = '';
    }
}

function minifyJSON() {
    const input = document.getElementById('json-input').value.trim();
    const output = document.getElementById('json-output');
    
    if (!input) {
        showMessage('请输入JSON数据', 'error');
        return;
    }
    
    try {
        // 解析JSON
        const parsed = JSON.parse(input);
        
        // 压缩输出
        const minified = JSON.stringify(parsed);
        output.value = minified;
        
        // 自动调整输出框高度
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('JSON压缩成功！', 'success');
        
    } catch (error) {
        showMessage(`JSON格式错误: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearJSON() {
    document.getElementById('json-input').value = '';
    document.getElementById('json-output').value = '';
    showMessage('JSON数据已清空', 'success');
}

// ==================== Base64工具 ====================

function encodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');
    
    if (!input) {
        showMessage('请输入要编码的文本', 'error');
        return;
    }
    
    try {
        // 编码为Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        output.value = encoded;
        
        // 自动调整输出框高度
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('Base64编码成功！', 'success');
        
    } catch (error) {
        showMessage(`编码失败: ${error.message}`, 'error');
        output.value = '';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');
    
    if (!input) {
        showMessage('请输入要解码的Base64文本', 'error');
        return;
    }
    
    try {
        // 解码Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        output.value = decoded;
        
        // 自动调整输出框高度
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('Base64解码成功！', 'success');
        
    } catch (error) {
        showMessage(`解码失败: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearBase64() {
    document.getElementById('base64-input').value = '';
    document.getElementById('base64-output').value = '';
    showMessage('Base64数据已清空', 'success');
}

// ==================== 二维码生成器 ====================

function generateQR() {
    const input = document.getElementById('qr-input').value.trim();
    const size = parseInt(document.getElementById('qr-size').value) || 256;
    const color = document.getElementById('qr-color').value || '#000000';
    const canvas = document.getElementById('qr-canvas');
    
    if (!input) {
        showMessage('请输入要生成二维码的文本或URL', 'error');
        return;
    }
    
    // 清空之前的二维码
    canvas.innerHTML = '';
    
    // 显示加载状态
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">正在生成二维码...</div>';
    
    // 创建canvas元素
    const canvasElement = document.createElement('canvas');
    canvas.appendChild(canvasElement);
    
    // 尝试使用QRCode库
    if (typeof QRCode !== 'undefined') {
        try {
            // 使用QRCode.toCanvas方法生成二维码
            QRCode.toCanvas(canvasElement, input, {
                width: size,
                margin: 2,
                color: {
                    dark: color,
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            }, function (error) {
                if (error) {
                    console.error('QRCode生成错误:', error);
                    // 如果QRCode库出错，使用备用方案
                    generateQRWithFallback(canvasElement, input, size, color);
                } else {
                    // 显示下载按钮
                    const downloadBtn = document.querySelector('.btn-download');
                    if (downloadBtn) {
                        downloadBtn.style.display = 'inline-flex';
                    }
                    showMessage('二维码生成成功！', 'success');
                }
            });
        } catch (error) {
            console.error('QRCode异常:', error);
            generateQRWithFallback(canvasElement, input, size, color);
        }
    } else {
        // QRCode库未加载，使用备用方案
        generateQRWithFallback(canvasElement, input, size, color);
    }
}

// 使用备用方案生成二维码
function generateQRWithFallback(canvasElement, input, size, color) {
    try {
        // 使用在线API生成二维码
        const qr = new QRCode(input, {
            width: size,
            margin: 2,
            color: {
                dark: color,
                light: '#FFFFFF'
            }
        });
        
        qr.toCanvas(canvasElement, function(error) {
            if (error) {
                console.error('在线API生成错误:', error);
                generateQRFallback();
            } else {
                // 显示下载按钮
                const downloadBtn = document.querySelector('.btn-download');
                if (downloadBtn) {
                    downloadBtn.style.display = 'inline-flex';
                }
                showMessage('二维码生成成功（使用在线API）！', 'success');
            }
        });
    } catch (error) {
        console.error('备用方案异常:', error);
        generateQRFallback();
    }
}

// 备用二维码生成方案（如果QRCode库加载失败）
function generateQRFallback() {
    const input = document.getElementById('qr-input').value.trim();
    const canvas = document.getElementById('qr-canvas');
    
    if (!input) {
        showMessage('请输入要生成二维码的文本或URL', 'error');
        return;
    }
    
    try {
        // 清空之前的二维码
        canvas.innerHTML = '';
        
        // 创建一个更美观的备用显示方案
        const fallbackDiv = document.createElement('div');
        fallbackDiv.style.cssText = `
            padding: 30px;
            border: 2px dashed #e5e7eb;
            border-radius: 12px;
            text-align: center;
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            max-width: 300px;
            margin: 0 auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `;
        
        // 添加图标
        const icon = document.createElement('div');
        icon.innerHTML = '📱';
        icon.style.cssText = `
            font-size: 48px;
            margin-bottom: 15px;
        `;
        
        // 添加标题
        const title = document.createElement('div');
        title.textContent = '二维码内容';
        title.style.cssText = `
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
            font-size: 16px;
        `;
        
        // 添加内容
        const content = document.createElement('div');
        content.textContent = input;
        content.style.cssText = `
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            word-break: break-all;
            color: #6b7280;
            font-size: 14px;
            line-height: 1.5;
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        `;
        
        // 添加提示
        const tip = document.createElement('div');
        tip.textContent = '请使用手机扫描二维码或手动输入内容';
        tip.style.cssText = `
            font-size: 12px;
            color: #9ca3af;
            margin-top: 10px;
        `;
        
        fallbackDiv.appendChild(icon);
        fallbackDiv.appendChild(title);
        fallbackDiv.appendChild(content);
        fallbackDiv.appendChild(tip);
        
        canvas.appendChild(fallbackDiv);
        showMessage('二维码库未加载，显示文本内容', 'warning');
        
    } catch (error) {
        showMessage(`备用方案失败: ${error.message}`, 'error');
    }
}

function clearQR() {
    const canvas = document.getElementById('qr-canvas');
    canvas.innerHTML = '';
    document.querySelector('.btn-download').style.display = 'none';
    document.getElementById('qr-input').value = '';
    showMessage('二维码已清空', 'success');
}

function downloadQR() {
    const canvas = document.querySelector('#qr-canvas canvas');
    if (!canvas) {
        showMessage('请先生成二维码', 'error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
        showMessage('二维码下载成功！', 'success');
    } catch (error) {
        showMessage(`下载失败: ${error.message}`, 'error');
    }
}

// ==================== 通用功能 ====================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element || !element.value) {
        showMessage('没有内容可复制', 'error');
        return;
    }
    
    try {
        // 现代浏览器使用 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(element.value).then(() => {
                showMessage('内容已复制到剪贴板！', 'success');
            }).catch(() => {
                fallbackCopyTextToClipboard(element.value);
            });
        } else {
            fallbackCopyTextToClipboard(element.value);
        }
    } catch (error) {
        fallbackCopyTextToClipboard(element.value);
    }
}

// 备用复制方法
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMessage('内容已复制到剪贴板！', 'success');
    } catch (error) {
        showMessage('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 显示消息
function showMessage(message, type = 'success') {
    // 移除现有消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // 插入到页面顶部
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(messageElement, container.firstChild);
    }
    
    // 自动移除消息
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

// 工具提示功能
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    });
}

// 性能监控
function logPerformance(label, startTime) {
    const endTime = performance.now();
    console.log(`${label}: ${endTime - startTime}ms`);
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    showMessage('发生了一个错误，请刷新页面重试', 'error');
});

// 页面可见性API - 已禁用自动保存
document.addEventListener('visibilitychange', function() {
    // 自动保存功能已禁用
});

// 页面卸载前保存数据 - 已禁用
window.addEventListener('beforeunload', function() {
    // 自动保存功能已禁用
});

// AdSense初始化
function initializeAdSense() {
    // 等待页面完全加载后再初始化AdSense
    if (document.readyState === 'complete') {
        loadAdSense();
    } else {
        window.addEventListener('load', loadAdSense);
    }
}

function loadAdSense() {
    try {
        // 检查AdSense容器是否可见
        const adContainer = document.querySelector('.adsense-container');
        if (adContainer && adContainer.offsetWidth > 0) {
            // 只有当容器有宽度时才加载广告
            if (window.adsbygoogle) {
                (adsbygoogle = window.adsbygoogle || []).push({});
                console.log('AdSense广告已加载');
            } else {
                console.warn('AdSense脚本未加载，等待重试...');
                setTimeout(loadAdSense, 2000);
            }
        } else {
            // 如果容器不可见，延迟加载
            console.log('AdSense容器不可见，延迟加载...');
            setTimeout(loadAdSense, 1000);
        }
    } catch (error) {
        console.warn('AdSense加载失败:', error);
        // 重试机制
        setTimeout(loadAdSense, 3000);
    }
}

// 监听窗口大小变化，重新加载AdSense
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const adContainer = document.querySelector('.adsense-container');
        if (adContainer && adContainer.offsetWidth > 0) {
            // 如果之前加载失败，重新尝试
            if (!adContainer.querySelector('ins iframe')) {
                loadAdSense();
            }
        }
    }, 500);
});

// ==================== 代码美化/压缩工具 ====================

function beautifyCode() {
    const input = document.getElementById('code-input').value.trim();
    const output = document.getElementById('code-output');
    const language = document.getElementById('code-language').value;
    
    if (!input) {
        showMessage('请输入要美化的代码', 'error');
        return;
    }
    
    try {
        let beautified;
        
        switch (language) {
            case 'javascript':
                if (typeof js_beautify === 'undefined') {
                    throw new Error('JavaScript美化库未加载');
                }
                beautified = js_beautify(input, {
                    indent_size: 2,
                    space_in_empty_paren: true,
                    preserve_newlines: true
                });
                break;
            case 'css':
                if (typeof css_beautify === 'undefined') {
                    throw new Error('CSS美化库未加载');
                }
                beautified = css_beautify(input, {
                    indent_size: 2,
                    newline_between_rules: true
                });
                break;
            case 'html':
                if (typeof html_beautify === 'undefined') {
                    throw new Error('HTML美化库未加载');
                }
                beautified = html_beautify(input, {
                    indent_size: 2,
                    wrap_line_length: 80
                });
                break;
            case 'json':
                try {
                    const parsed = JSON.parse(input);
                    beautified = JSON.stringify(parsed, null, 2);
                } catch (e) {
                    throw new Error('无效的JSON格式');
                }
                break;
            case 'xml':
                if (typeof html_beautify === 'undefined') {
                    throw new Error('XML美化库未加载');
                }
                beautified = html_beautify(input, {
                    indent_size: 2,
                    wrap_line_length: 80
                });
                break;
            default:
                beautified = input;
        }
        
        output.value = beautified;
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('代码美化成功！', 'success');
        
    } catch (error) {
        showMessage(`代码美化失败: ${error.message}`, 'error');
        output.value = '';
    }
}

function minifyCode() {
    const input = document.getElementById('code-input').value.trim();
    const output = document.getElementById('code-output');
    const language = document.getElementById('code-language').value;
    
    if (!input) {
        showMessage('请输入要压缩的代码', 'error');
        return;
    }
    
    try {
        let minified;
        
        switch (language) {
            case 'javascript':
                // 简单的JavaScript压缩（移除注释和多余空格）
                minified = input
                    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除多行注释
                    .replace(/\/\/.*$/gm, '') // 移除单行注释
                    .replace(/\s+/g, ' ') // 压缩空格
                    .replace(/\s*([{}();,=])\s*/g, '$1') // 移除操作符周围的空格
                    .trim();
                break;
            case 'css':
                // 简单的CSS压缩
                minified = input
                    .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
                    .replace(/\s+/g, ' ') // 压缩空格
                    .replace(/\s*([{}:;,])\s*/g, '$1') // 移除操作符周围的空格
                    .trim();
                break;
            case 'html':
                // 简单的HTML压缩
                minified = input
                    .replace(/<!--[\s\S]*?-->/g, '') // 移除注释
                    .replace(/\s+/g, ' ') // 压缩空格
                    .replace(/>\s+</g, '><') // 移除标签间的空格
                    .trim();
                break;
            case 'json':
                try {
                    const parsed = JSON.parse(input);
                    minified = JSON.stringify(parsed);
                } catch (e) {
                    throw new Error('无效的JSON格式');
                }
                break;
            case 'xml':
                minified = input
                    .replace(/<!--[\s\S]*?-->/g, '') // 移除注释
                    .replace(/\s+/g, ' ') // 压缩空格
                    .replace(/>\s+</g, '><') // 移除标签间的空格
                    .trim();
                break;
            default:
                minified = input;
        }
        
        output.value = minified;
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('代码压缩成功！', 'success');
        
    } catch (error) {
        showMessage(`代码压缩失败: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearCode() {
    document.getElementById('code-input').value = '';
    document.getElementById('code-output').value = '';
    showMessage('代码数据已清空', 'success');
}

// ==================== 正则表达式测试工具 ====================

function testRegex() {
    const pattern = document.getElementById('regex-pattern').value.trim();
    const text = document.getElementById('regex-text').value;
    const output = document.getElementById('regex-output');
    
    if (!pattern) {
        showMessage('请输入正则表达式', 'error');
        return;
    }
    
    if (!text) {
        showMessage('请输入测试文本', 'error');
        return;
    }
    
    try {
        // 构建正则表达式
        let flags = '';
        if (document.getElementById('regex-global').checked) flags += 'g';
        if (document.getElementById('regex-ignorecase').checked) flags += 'i';
        if (document.getElementById('regex-multiline').checked) flags += 'm';
        
        // 移除正则表达式的斜杠
        let cleanPattern = pattern;
        if (pattern.startsWith('/') && pattern.includes('/')) {
            const lastSlashIndex = pattern.lastIndexOf('/');
            cleanPattern = pattern.substring(1, lastSlashIndex);
            const patternFlags = pattern.substring(lastSlashIndex + 1);
            flags = flags + patternFlags;
        }
        
        const regex = new RegExp(cleanPattern, flags);
        
        // 测试匹配
        let results = [];
        
        if (flags.includes('g')) {
            // 全局匹配
            let match;
            while ((match = regex.exec(text)) !== null) {
                results.push({
                    match: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
            }
        } else {
            // 单次匹配
            const match = text.match(regex);
            if (match) {
                results.push({
                    match: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
            }
        }
        
        // 测试替换
        const replaced = text.replace(regex, '***REPLACED***');
        
        // 格式化输出
        let outputText = `正则表达式: ${pattern}\n`;
        outputText += `标志: ${flags || '无'}\n`;
        outputText += `测试文本: ${text}\n\n`;
        
        if (results.length > 0) {
            outputText += `找到 ${results.length} 个匹配:\n`;
            results.forEach((result, index) => {
                outputText += `${index + 1}. 匹配: "${result.match}" (位置: ${result.index})\n`;
                if (result.groups && result.groups.length > 0) {
                    result.groups.forEach((group, groupIndex) => {
                        outputText += `   组 ${groupIndex + 1}: "${group}"\n`;
                    });
                }
            });
        } else {
            outputText += '未找到匹配\n';
        }
        
        outputText += `\n替换结果: ${replaced}\n`;
        
        output.value = outputText;
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage(`正则表达式测试完成，找到 ${results.length} 个匹配`, 'success');
        
    } catch (error) {
        showMessage(`正则表达式错误: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearRegex() {
    document.getElementById('regex-pattern').value = '';
    document.getElementById('regex-text').value = '';
    document.getElementById('regex-output').value = '';
    document.getElementById('regex-global').checked = false;
    document.getElementById('regex-ignorecase').checked = false;
    document.getElementById('regex-multiline').checked = false;
    showMessage('正则表达式数据已清空', 'success');
}

// ==================== 图片格式转换工具 ====================

let currentImageData = null;

function convertImage() {
    const fileInput = document.getElementById('image-input');
    const format = document.getElementById('image-format').value;
    const quality = parseInt(document.getElementById('image-quality').value) / 100;
    
    if (!fileInput.files[0]) {
        showMessage('请选择图片文件', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 绘制图片到canvas
            ctx.drawImage(img, 0, 0);
            
            // 转换为指定格式
            let mimeType;
            switch (format) {
                case 'jpeg':
                    mimeType = 'image/jpeg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    break;
                case 'webp':
                    mimeType = 'image/webp';
                    break;
                default:
                    mimeType = 'image/png';
            }
            
            try {
                const dataURL = canvas.toDataURL(mimeType, quality);
                currentImageData = dataURL;
                
                // 显示预览
                const preview = document.getElementById('image-preview');
                preview.innerHTML = `<img src="${dataURL}" alt="转换后的图片" style="max-width: 100%; max-height: 300px;">`;
                
                // 显示下载按钮
                document.querySelector('#image-converter .btn-download').style.display = 'inline-flex';
                
                showMessage('图片格式转换成功！', 'success');
                
            } catch (error) {
                showMessage(`图片转换失败: ${error.message}`, 'error');
            }
        };
        
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function downloadImage() {
    if (!currentImageData) {
        showMessage('请先转换图片', 'error');
        return;
    }
    
    try {
        const format = document.getElementById('image-format').value;
        const link = document.createElement('a');
        link.download = `converted_image.${format}`;
        link.href = currentImageData;
        link.click();
        showMessage('图片下载成功！', 'success');
    } catch (error) {
        showMessage(`下载失败: ${error.message}`, 'error');
    }
}

function clearImage() {
    document.getElementById('image-input').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.querySelector('#image-converter .btn-download').style.display = 'none';
    currentImageData = null;
    showMessage('图片数据已清空', 'success');
}

// 图片质量滑块显示
document.addEventListener('DOMContentLoaded', function() {
    const qualitySlider = document.getElementById('image-quality');
    const qualityValue = document.getElementById('quality-value');
    
    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', function() {
            qualityValue.textContent = this.value;
        });
    }
});

// ==================== 视频转GIF工具 ====================

let gif = null;
let videoElement = null;

function convertToGif() {
    const fileInput = document.getElementById('video-input');
    const width = parseInt(document.getElementById('gif-width').value);
    const fps = parseInt(document.getElementById('gif-fps').value);
    const duration = parseInt(document.getElementById('gif-duration').value);
    
    if (!fileInput.files[0]) {
        showMessage('请选择视频文件', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const videoURL = URL.createObjectURL(file);
    
    // 创建视频元素
    if (videoElement) {
        videoElement.remove();
    }
    
    videoElement = document.createElement('video');
    videoElement.src = videoURL;
    videoElement.muted = true;
    videoElement.controls = true;
    
    const preview = document.getElementById('video-preview');
    preview.innerHTML = '';
    preview.appendChild(videoElement);
    
    videoElement.onloadedmetadata = function() {
        // 检查GIF库是否已加载
        if (typeof GIF === 'undefined') {
            showMessage('GIF生成库未加载，请刷新页面重试', 'error');
            return;
        }
        
        // 创建GIF
        gif = new GIF({
            workers: 2,
            quality: 10,
            width: width,
            height: Math.round((width * videoElement.videoHeight) / videoElement.videoWidth)
        });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = Math.round((width * videoElement.videoHeight) / videoElement.videoWidth);
        
        const frameInterval = 1000 / fps;
        const totalFrames = Math.min(duration * fps, videoElement.duration * fps);
        let currentFrame = 0;
        
        videoElement.currentTime = 0;
        
        function captureFrame() {
            if (currentFrame >= totalFrames) {
                gif.render();
                return;
            }
            
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            gif.addFrame(canvas, {delay: frameInterval});
            
            currentFrame++;
            videoElement.currentTime += frameInterval / 1000;
            
            setTimeout(captureFrame, 50);
        }
        
        gif.on('finished', function(blob) {
            const gifURL = URL.createObjectURL(blob);
            preview.innerHTML = `<img src="${gifURL}" alt="生成的GIF" style="max-width: 100%; max-height: 300px;">`;
            document.querySelector('#video-gif .btn-download').style.display = 'inline-flex';
            document.querySelector('#video-gif .btn-download').onclick = function() {
                downloadGif(blob);
            };
            showMessage('GIF生成成功！', 'success');
        });
        
        videoElement.play();
        setTimeout(captureFrame, 100);
    };
}

function downloadGif(blob) {
    if (!blob) {
        showMessage('请先生成GIF', 'error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = 'video.gif';
        link.href = URL.createObjectURL(blob);
        link.click();
        showMessage('GIF下载成功！', 'success');
    } catch (error) {
        showMessage(`下载失败: ${error.message}`, 'error');
    }
}

function clearVideo() {
    document.getElementById('video-input').value = '';
    document.getElementById('video-preview').innerHTML = '';
    document.querySelector('#video-gif .btn-download').style.display = 'none';
    
    if (videoElement) {
        videoElement.remove();
        videoElement = null;
    }
    
    if (gif) {
        gif = null;
    }
    
    showMessage('视频数据已清空', 'success');
}

// 导出函数供全局使用
window.FreeTools = {
    formatJSON,
    minifyJSON,
    clearJSON,
    encodeBase64,
    decodeBase64,
    clearBase64,
    generateQR,
    clearQR,
    downloadQR,
    beautifyCode,
    minifyCode,
    clearCode,
    testRegex,
    clearRegex,
    convertImage,
    downloadImage,
    clearImage,
    convertToGif,
    downloadGif,
    clearVideo,
    copyToClipboard
};

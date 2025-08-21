// 全局变量
let currentQRCode = null;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupMobileNavigation();
    setupSmoothScrolling();
    setupToolAnimations();
});

// 应用初始化
function initializeApp() {
    console.log('FreeTools.top 应用已启动');
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 初始化工具状态
    initializeTools();
    
    // 设置自动保存功能
    setupAutoSave();
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
    // 从本地存储恢复数据
    restoreFromLocalStorage();
    
    // 设置输入框自动调整高度
    setupAutoResize();
    
    // 设置键盘快捷键
    setupKeyboardShortcuts();
}

// 自动保存设置
function setupAutoSave() {
    const inputs = document.querySelectorAll('textarea, input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            saveToLocalStorage();
        }, 1000));
    });
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
        qrInput: document.getElementById('qr-input')?.value || ''
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
        
        // 保存到本地存储
        saveToLocalStorage();
        
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
        
        // 保存到本地存储
        saveToLocalStorage();
        
    } catch (error) {
        showMessage(`JSON格式错误: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearJSON() {
    document.getElementById('json-input').value = '';
    document.getElementById('json-output').value = '';
    showMessage('JSON数据已清空', 'success');
    saveToLocalStorage();
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
        
        // 保存到本地存储
        saveToLocalStorage();
        
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
        
        // 保存到本地存储
        saveToLocalStorage();
        
    } catch (error) {
        showMessage(`解码失败: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearBase64() {
    document.getElementById('base64-input').value = '';
    document.getElementById('base64-output').value = '';
    showMessage('Base64数据已清空', 'success');
    saveToLocalStorage();
}

// ==================== 二维码生成器 ====================

function generateQR() {
    const input = document.getElementById('qr-input').value.trim();
    const size = parseInt(document.getElementById('qr-size').value);
    const color = document.getElementById('qr-color').value;
    
    if (!input) {
        showMessage('请输入要生成二维码的文本或URL', 'error');
        return;
    }
    
    try {
        // 创建二维码
        const qr = new QRCode(document.getElementById('qr-canvas'), {
            text: input,
            width: size,
            height: size,
            colorDark: color,
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });
        
        currentQRCode = qr;
        
        // 显示下载按钮
        document.querySelector('.btn-download').style.display = 'inline-flex';
        
        showMessage('二维码生成成功！', 'success');
        
        // 保存到本地存储
        saveToLocalStorage();
        
    } catch (error) {
        showMessage(`二维码生成失败: ${error.message}`, 'error');
    }
}

function clearQR() {
    const canvas = document.getElementById('qr-canvas');
    canvas.innerHTML = '';
    document.querySelector('.btn-download').style.display = 'none';
    document.getElementById('qr-input').value = '';
    currentQRCode = null;
    showMessage('二维码已清空', 'success');
    saveToLocalStorage();
}

function downloadQR() {
    if (!currentQRCode) {
        showMessage('请先生成二维码', 'error');
        return;
    }
    
    try {
        const canvas = document.querySelector('#qr-canvas canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvas.toDataURL();
            link.click();
            showMessage('二维码下载成功！', 'success');
        }
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

// 页面可见性API
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时保存数据
        saveToLocalStorage();
    }
});

// 页面卸载前保存数据
window.addEventListener('beforeunload', function() {
    saveToLocalStorage();
});

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
    copyToClipboard
};

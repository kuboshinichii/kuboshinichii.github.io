// Global variables

// DOM initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupMobileNavigation();
    setupSmoothScrolling();
    setupToolAnimations();
});

// App initialization
function initializeApp() {
    console.log('shinichikubo.top application started');
    
    // Check if required libraries are loaded
    checkRequiredLibraries();
    
    // Add page loading animation
    document.body.classList.add('loaded');
    
    // Initialize tool states
    initializeTools();
    
    // Setup auto-save functionality
    setupAutoSave();
    
    // Initialize AdSense
    initializeAdSense();
}

// Check if required libraries are loaded
function checkRequiredLibraries() {
    const libraries = {
        'QRCode': 'QR Code Generation Library',
        'js_beautify': 'Code Beautification Library',
        'css_beautify': 'CSS Beautification Library',
        'html_beautify': 'HTML Beautification Library',
        'GIF': 'GIF Generation Library'
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
    
    // Check QR code library special case
    const hasQRCode = typeof window.QRCode !== 'undefined';
    
    if (missingLibraries.length > 0) {
        console.warn('The following libraries failed to load:', missingLibraries.join(', '));
        
        // If QR code library is missing but has backup solution, don't show warning
        if (missingLibraries.includes('QR Code Generation Library') && hasQRCode) {
            const filteredMissing = missingLibraries.filter(lib => lib !== 'QR Code Generation Library');
            if (filteredMissing.length > 0) {
                showMessage(`Some features may be unavailable: ${filteredMissing.join(', ')}`, 'warning');
            }
        } else {
            showMessage(`Some features may be unavailable: ${missingLibraries.join(', ')}`, 'warning');
        }
        
        // If QRCode library is missing and no backup solution, try to load
        if (missingLibraries.includes('QR Code Generation Library') && !hasQRCode) {
            loadQRCodeFallback();
        }
    } else {
        console.log('All required libraries loaded successfully');
    }
    
    // Display QR code library status
    if (hasQRCode) {
        console.log('QR code functionality available');
    } else {
        console.warn('QR code functionality unavailable');
    }
}

// Load QR code library backup solution
function loadQRCodeFallback() {
    console.log('Attempting to load QR code library backup solution...');
    
    // Try to load from other CDNs
    const fallbackScripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js',
        'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.js'
    ];
    
    let scriptIndex = 0;
    
    function tryLoadScript() {
        if (scriptIndex >= fallbackScripts.length) {
            console.warn('All backup CDNs failed to load QRCode library');
            return;
        }
        
        const script = document.createElement('script');
        script.src = fallbackScripts[scriptIndex];
        script.onload = function() {
            console.log('QRCode library loaded successfully from backup CDN');
            if (typeof QRCode !== 'undefined') {
                showMessage('QR code functionality restored', 'success');
            }
        };
        script.onerror = function() {
            console.warn(`Backup CDN ${fallbackScripts[scriptIndex]} failed to load`);
            scriptIndex++;
            tryLoadScript();
        };
        
        document.head.appendChild(script);
    }
    
    // Delay loading to avoid blocking page
    setTimeout(tryLoadScript, 1000);
}

// Mobile navigation setup
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling setup
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

// Tool animations setup
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

// Tool initialization
function initializeTools() {
    // Setup auto-resize for input fields
    setupAutoResize();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// Auto-save setup - disabled
function setupAutoSave() {
    // Auto-save functionality disabled
    console.log('Auto-save functionality disabled');
}

// Debounce function
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

// Save to local storage
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
        console.warn('Unable to save to local storage:', e);
    }
}

// Restore from local storage
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
        console.warn('Unable to restore data from local storage:', e);
    }
}

// Auto-resize input fields
function setupAutoResize() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Keyboard shortcuts setup
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter format JSON
        if (e.ctrlKey && e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.id === 'json-input') {
                e.preventDefault();
                formatJSON();
            }
        }
        
        // Ctrl+Shift+E encode Base64
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            e.preventDefault();
            encodeBase64();
        }
        
        // Ctrl+Shift+D decode Base64
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            decodeBase64();
        }
        
        // Ctrl+Shift+Q generate QR code
        if (e.ctrlKey && e.shiftKey && e.key === 'Q') {
            e.preventDefault();
            generateQR();
        }
        
        // Ctrl+Shift+B beautify code
        if (e.ctrlKey && e.shiftKey && e.key === 'B') {
            e.preventDefault();
            beautifyCode();
        }
        
        // Ctrl+Shift+R test regex
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            testRegex();
        }
    });
}

// ==================== JSON Formatter Tool ====================

function formatJSON() {
    const input = document.getElementById('json-input').value.trim();
    const output = document.getElementById('json-output');
    
    if (!input) {
        showMessage('Please enter JSON data', 'error');
        return;
    }
    
    try {
        // Parse JSON
        const parsed = JSON.parse(input);
        
        // Format output
        const formatted = JSON.stringify(parsed, null, 2);
        output.value = formatted;
        
        // Auto-adjust output field height
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('JSON formatted successfully!', 'success');
        
    } catch (error) {
        showMessage(`JSON format error: ${error.message}`, 'error');
        output.value = '';
    }
}

function minifyJSON() {
    const input = document.getElementById('json-input').value.trim();
    const output = document.getElementById('json-output');
    
    if (!input) {
        showMessage('Please enter JSON data', 'error');
        return;
    }
    
    try {
        // Parse JSON
        const parsed = JSON.parse(input);
        
        // Minify output
        const minified = JSON.stringify(parsed);
        output.value = minified;
        
        // Auto-adjust output field height
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('JSON minified successfully!', 'success');
        
    } catch (error) {
        showMessage(`JSON format error: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearJSON() {
    document.getElementById('json-input').value = '';
    document.getElementById('json-output').value = '';
    showMessage('JSON data cleared', 'success');
}

// ==================== Base64 Tools ====================

function encodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');
    
    if (!input) {
        showMessage('Please enter text to encode', 'error');
        return;
    }
    
    try {
        // Encode to Base64
        const encoded = btoa(unescape(encodeURIComponent(input)));
        output.value = encoded;
        
        // Auto-adjust output field height
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('Base64 encoding successful!', 'success');
        
    } catch (error) {
        showMessage(`Encoding failed: ${error.message}`, 'error');
        output.value = '';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value.trim();
    const output = document.getElementById('base64-output');
    
    if (!input) {
        showMessage('Please enter Base64 text to decode', 'error');
        return;
    }
    
    try {
        // Decode Base64
        const decoded = decodeURIComponent(escape(atob(input)));
        output.value = decoded;
        
        // Auto-adjust output field height
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('Base64 decoding successful!', 'success');
        
    } catch (error) {
        showMessage(`Decoding failed: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearBase64() {
    document.getElementById('base64-input').value = '';
    document.getElementById('base64-output').value = '';
    showMessage('Base64 data cleared', 'success');
}

// ==================== QR Code Generator ====================

function generateQR() {
    const input = document.getElementById('qr-input').value.trim();
    const size = parseInt(document.getElementById('qr-size').value) || 256;
    const color = document.getElementById('qr-color').value || '#000000';
    const canvas = document.getElementById('qr-canvas');
    
    if (!input) {
        showMessage('Please enter text or URL to generate QR code', 'error');
        return;
    }
    
    // Clear previous QR code
    canvas.innerHTML = '';
    
    // Show loading state
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Generating QR code...</div>';
    
    // Create canvas element
    const canvasElement = document.createElement('canvas');
    canvas.appendChild(canvasElement);
    
    // Try to use QRCode library
    if (typeof QRCode !== 'undefined') {
        try {
            // Check if it's local QRCode library (QRCodeLocal)
            if (QRCode.prototype && QRCode.prototype.toCanvas) {
                // Use local QRCode library
                const qr = new QRCode(input, {
                    width: size,
                    margin: 0,
                    color: {
                        dark: color,
                        light: '#FFFFFF'
                    }
                });
                
                qr.toCanvas(canvasElement, function (error) {
                    if (error) {
                        console.error('Local QRCode generation error:', error);
                        generateQRFallback();
                    } else {
                        // Show download button
                        const downloadBtn = document.querySelector('.btn-download');
                        if (downloadBtn) {
                            downloadBtn.style.display = 'inline-flex';
                        }
                        showMessage('QR code generated successfully!', 'success');
                    }
                });
            } else {
                // Use standard QRCode library - redesigned method
                // First create a temporary div to generate QR code
                const tempDiv = document.createElement('div');
                tempDiv.style.position = 'absolute';
                tempDiv.style.left = '-9999px';
                document.body.appendChild(tempDiv);
                
                const qr = new QRCode(tempDiv, {
                    text: input,
                    width: size,
                    height: size,
                    colorDark: color,
                    colorLight: '#FFFFFF',
                    correctLevel: QRCode.CorrectLevel.H
                });
                
                // Wait for QR code generation to complete
                setTimeout(() => {
                    const qrCanvas = tempDiv.querySelector('canvas');
                    if (qrCanvas) {
                        // Clear container and set styles
                        canvas.innerHTML = '';
                        canvas.style.display = 'flex';
                        canvas.style.justifyContent = 'center';
                        canvas.style.alignItems = 'center';
                        canvas.style.minHeight = '200px';
                        canvas.style.padding = '20px';
                        
                        // Create new canvas and copy content
                        const newCanvas = document.createElement('canvas');
                        newCanvas.width = qrCanvas.width;
                        newCanvas.height = qrCanvas.height;
                        newCanvas.style.margin = '0';
                        newCanvas.style.padding = '0';
                        newCanvas.style.border = 'none';
                        newCanvas.style.display = 'block';
                        
                        const ctx = newCanvas.getContext('2d');
                        ctx.drawImage(qrCanvas, 0, 0);
                        
                        // Add new canvas to container
                        canvas.appendChild(newCanvas);
                        
                        // Remove temporary div
                        document.body.removeChild(tempDiv);
                        
                        // Show download button
                        const downloadBtn = document.querySelector('.btn-download');
                        if (downloadBtn) {
                            downloadBtn.style.display = 'inline-flex';
                        }
                        showMessage('QR code generated successfully!', 'success');
                    } else {
                        document.body.removeChild(tempDiv);
                        generateQRFallback();
                    }
                }, 200);
            }
        } catch (error) {
            console.error('QRCode exception:', error);
            generateQRFallback();
        }
    } else {
        // QRCode library not loaded, use fallback
        generateQRFallback();
    }
}

// Use backup solution to generate QR code (deprecated, directly use generateQRFallback)
function generateQRWithFallback(canvasElement, input, size, color) {
    console.log('Using backup solution to generate QR code');
    generateQRFallback();
}

// Backup QR code generation solution (if QRCode library fails to load)
function generateQRFallback() {
    const input = document.getElementById('qr-input').value.trim();
    const canvas = document.getElementById('qr-canvas');
    
    if (!input) {
        showMessage('Please enter text or URL to generate QR code', 'error');
        return;
    }
    
    try {
        // Clear previous QR code
        canvas.innerHTML = '';
        
        // Create a more beautiful backup display solution
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
        
        // Add icon
        const icon = document.createElement('div');
        icon.innerHTML = '📱';
        icon.style.cssText = `
            font-size: 48px;
            margin-bottom: 15px;
        `;
        
        // Add title
        const title = document.createElement('div');
        title.textContent = 'QR Code Content';
        title.style.cssText = `
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
            font-size: 16px;
        `;
        
        // Add content
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
        
        // Add tip
        const tip = document.createElement('div');
        tip.textContent = 'Please use your phone to scan the QR code or manually enter the content';
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
        showMessage('QR code library not loaded, displaying text content', 'warning');
        
    } catch (error) {
        showMessage(`Backup solution failed: ${error.message}`, 'error');
    }
}

function clearQR() {
    const canvas = document.getElementById('qr-canvas');
    canvas.innerHTML = '';
    document.querySelector('.btn-download').style.display = 'none';
    document.getElementById('qr-input').value = '';
    showMessage('QR code cleared', 'success');
}

function downloadQR() {
    const canvas = document.querySelector('#qr-canvas canvas');
    if (!canvas) {
        showMessage('Please generate a QR code first', 'error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
        showMessage('QR code downloaded successfully!', 'success');
    } catch (error) {
        showMessage(`Download failed: ${error.message}`, 'error');
    }
}

// ==================== General Functions ====================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element || !element.value) {
        showMessage('No content to copy', 'error');
        return;
    }
    
    try {
        // Modern browsers use Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(element.value).then(() => {
                showMessage('Content copied to clipboard!', 'success');
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

// Fallback copy method
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
        showMessage('Content copied to clipboard!', 'success');
    } catch (error) {
        showMessage('Copy failed, please copy manually', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show message
function showMessage(message, type = 'success') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Insert at top of page
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(messageElement, container.firstChild);
    }
    
    // Auto-remove message
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 3000);
}

// Tooltip functionality
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

// Performance monitoring
function logPerformance(label, startTime) {
    const endTime = performance.now();
    console.log(`${label}: ${endTime - startTime}ms`);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Page error:', e.error);
    showMessage('An error occurred, please refresh the page and try again', 'error');
});

// Page visibility API - auto-save disabled
document.addEventListener('visibilitychange', function() {
    // Auto-save functionality disabled
});

// Page unload save - disabled
window.addEventListener('beforeunload', function() {
    // Auto-save functionality disabled
});

// AdSense initialization
function initializeAdSense() {
    // Wait for page to fully load before initializing AdSense
    if (document.readyState === 'complete') {
        loadAdSense();
    } else {
        window.addEventListener('load', loadAdSense);
    }
}

function loadAdSense() {
    try {
        // Check if AdSense container is visible
        const adContainer = document.querySelector('.adsense-container');
        if (adContainer && adContainer.offsetWidth > 0) {
            // Only load ads when container has width
            if (window.adsbygoogle) {
                (adsbygoogle = window.adsbygoogle || []).push({});
                console.log('AdSense ads loaded');
            } else {
                console.warn('AdSense script not loaded, waiting to retry...');
                setTimeout(loadAdSense, 2000);
            }
        } else {
            // If container not visible, delay loading
            console.log('AdSense container not visible, delaying load...');
            setTimeout(loadAdSense, 1000);
        }
    } catch (error) {
        console.warn('AdSense loading failed:', error);
        // Retry mechanism
        setTimeout(loadAdSense, 3000);
    }
}

// Listen for window resize, reload AdSense
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const adContainer = document.querySelector('.adsense-container');
        if (adContainer && adContainer.offsetWidth > 0) {
            // If previous load failed, try again
            if (!adContainer.querySelector('ins iframe')) {
                loadAdSense();
            }
        }
    }, 500);
});

// ==================== Code Beautifier/Minifier Tool ====================

function beautifyCode() {
    const input = document.getElementById('code-input').value.trim();
    const output = document.getElementById('code-output');
    const language = document.getElementById('code-language').value;
    
    if (!input) {
        showMessage('Please enter code to beautify', 'error');
        return;
    }
    
    try {
        let beautified;
        
        switch (language) {
            case 'javascript':
                if (typeof js_beautify === 'undefined') {
                    throw new Error('JavaScript beautification library not loaded');
                }
                beautified = js_beautify(input, {
                    indent_size: 2,
                    space_in_empty_paren: true,
                    preserve_newlines: true
                });
                break;
            case 'css':
                if (typeof css_beautify === 'undefined') {
                    throw new Error('CSS beautification library not loaded');
                }
                beautified = css_beautify(input, {
                    indent_size: 2,
                    newline_between_rules: true
                });
                break;
            case 'html':
                if (typeof html_beautify === 'undefined') {
                    throw new Error('HTML beautification library not loaded');
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
                    throw new Error('Invalid JSON format');
                }
                break;
            case 'xml':
                if (typeof html_beautify === 'undefined') {
                    throw new Error('XML beautification library not loaded');
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
        
        showMessage('Code beautified successfully!', 'success');
        
    } catch (error) {
        showMessage(`Code beautification failed: ${error.message}`, 'error');
        output.value = '';
    }
}

function minifyCode() {
    const input = document.getElementById('code-input').value.trim();
    const output = document.getElementById('code-output');
    const language = document.getElementById('code-language').value;
    
    if (!input) {
        showMessage('Please enter code to minify', 'error');
        return;
    }
    
    try {
        let minified;
        
        switch (language) {
            case 'javascript':
                // Simple JavaScript minification (remove comments and extra spaces)
                minified = input
                    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                    .replace(/\/\/.*$/gm, '') // Remove single-line comments
                    .replace(/\s+/g, ' ') // Compress spaces
                    .replace(/\s*([{}();,=])\s*/g, '$1') // Remove spaces around operators
                    .trim();
                break;
            case 'css':
                // Simple CSS minification
                minified = input
                    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                    .replace(/\s+/g, ' ') // Compress spaces
                    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around operators
                    .trim();
                break;
            case 'html':
                // Simple HTML minification
                minified = input
                    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                    .replace(/\s+/g, ' ') // Compress spaces
                    .replace(/>\s+</g, '><') // Remove spaces between tags
                    .trim();
                break;
            case 'json':
                try {
                    const parsed = JSON.parse(input);
                    minified = JSON.stringify(parsed);
                } catch (e) {
                    throw new Error('Invalid JSON format');
                }
                break;
            case 'xml':
                minified = input
                    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                    .replace(/\s+/g, ' ') // Compress spaces
                    .replace(/>\s+</g, '><') // Remove spaces between tags
                    .trim();
                break;
            default:
                minified = input;
        }
        
        output.value = minified;
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage('Code minified successfully!', 'success');
        
    } catch (error) {
        showMessage(`Code minification failed: ${error.message}`, 'error');
        output.value = '';
    }
}

function clearCode() {
    document.getElementById('code-input').value = '';
    document.getElementById('code-output').value = '';
    showMessage('Code data cleared', 'success');
}

// ==================== Regular Expression Tester Tool ====================

function testRegex() {
    const pattern = document.getElementById('regex-pattern').value.trim();
    const text = document.getElementById('regex-text').value;
    const output = document.getElementById('regex-output');
    
    if (!pattern) {
        showMessage('Please enter a regular expression', 'error');
        return;
    }
    
    if (!text) {
        showMessage('Please enter test text', 'error');
        return;
    }
    
    try {
        // Build regular expression
        let flags = '';
        if (document.getElementById('regex-global').checked) flags += 'g';
        if (document.getElementById('regex-ignorecase').checked) flags += 'i';
        if (document.getElementById('regex-multiline').checked) flags += 'm';
        
        // Remove regex slashes
        let cleanPattern = pattern;
        if (pattern.startsWith('/') && pattern.includes('/')) {
            const lastSlashIndex = pattern.lastIndexOf('/');
            cleanPattern = pattern.substring(1, lastSlashIndex);
            const patternFlags = pattern.substring(lastSlashIndex + 1);
            flags = flags + patternFlags;
        }
        
        const regex = new RegExp(cleanPattern, flags);
        
        // Test matching
        let results = [];
        
        if (flags.includes('g')) {
            // Global matching
            let match;
            while ((match = regex.exec(text)) !== null) {
                results.push({
                    match: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
            }
        } else {
            // Single match
            const match = text.match(regex);
            if (match) {
                results.push({
                    match: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
            }
        }
        
        // Test replacement
        const replaced = text.replace(regex, '***REPLACED***');
        
        // Format output
        let outputText = `Regular Expression: ${pattern}\n`;
        outputText += `Flags: ${flags || 'None'}\n`;
        outputText += `Test Text: ${text}\n\n`;
        
        if (results.length > 0) {
            outputText += `Found ${results.length} match(es):\n`;
            results.forEach((result, index) => {
                outputText += `${index + 1}. Match: "${result.match}" (Position: ${result.index})\n`;
                if (result.groups && result.groups.length > 0) {
                    result.groups.forEach((group, groupIndex) => {
                        outputText += `   Group ${groupIndex + 1}: "${group}"\n`;
                    });
                }
            });
        } else {
            outputText += 'No matches found\n';
        }
        
        outputText += `\nReplacement Result: ${replaced}\n`;
        
        output.value = outputText;
        output.style.height = 'auto';
        output.style.height = output.scrollHeight + 'px';
        
        showMessage(`Regex test completed, found ${results.length} match(es)`, 'success');
        
    } catch (error) {
        showMessage(`Regex error: ${error.message}`, 'error');
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
    showMessage('Regex data cleared', 'success');
}

// ==================== Image Format Converter Tool ====================

let currentImageData = null;

function convertImage() {
    const fileInput = document.getElementById('image-input');
    const format = document.getElementById('image-format').value;
    const quality = parseInt(document.getElementById('image-quality').value) / 100;
    
    if (!fileInput.files[0]) {
        showMessage('Please select an image file', 'error');
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
            
            // Draw image to canvas
            ctx.drawImage(img, 0, 0);
            
            // Convert to specified format
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
                
                // Show preview
                const preview = document.getElementById('image-preview');
                preview.innerHTML = `<img src="${dataURL}" alt="Converted image" style="max-width: 100%; max-height: 300px;">`;
                
                // Show download button
                document.querySelector('#image-converter .btn-download').style.display = 'inline-flex';
                
                showMessage('Image format conversion successful!', 'success');
                
            } catch (error) {
                showMessage(`Image conversion failed: ${error.message}`, 'error');
            }
        };
        
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function downloadImage() {
    if (!currentImageData) {
        showMessage('Please convert an image first', 'error');
        return;
    }
    
    try {
        const format = document.getElementById('image-format').value;
        const link = document.createElement('a');
        link.download = `converted_image.${format}`;
        link.href = currentImageData;
        link.click();
        showMessage('Image downloaded successfully!', 'success');
    } catch (error) {
        showMessage(`Download failed: ${error.message}`, 'error');
    }
}

function clearImage() {
    document.getElementById('image-input').value = '';
    document.getElementById('image-preview').innerHTML = '';
    document.querySelector('#image-converter .btn-download').style.display = 'none';
    currentImageData = null;
    showMessage('Image data cleared', 'success');
}

// Image quality slider display
document.addEventListener('DOMContentLoaded', function() {
    const qualitySlider = document.getElementById('image-quality');
    const qualityValue = document.getElementById('quality-value');
    
    if (qualitySlider && qualityValue) {
        qualitySlider.addEventListener('input', function() {
            qualityValue.textContent = this.value;
        });
    }
});

// ==================== Video to GIF Tool ====================

let gif = null;
let videoElement = null;

function convertToGif() {
    const fileInput = document.getElementById('video-input');
    const width = parseInt(document.getElementById('gif-width').value);
    const fps = parseInt(document.getElementById('gif-fps').value);
    const duration = parseInt(document.getElementById('gif-duration').value);
    
    if (!fileInput.files[0]) {
        showMessage('Please select a video file', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const videoURL = URL.createObjectURL(file);
    
    // Create video element
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
        // Check if GIF library is loaded
        if (typeof GIF === 'undefined') {
            showMessage('GIF generation library not loaded, please refresh the page and try again', 'error');
            return;
        }
        
        // Create GIF
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
            preview.innerHTML = `<img src="${gifURL}" alt="Generated GIF" style="max-width: 100%; max-height: 300px;">`;
            document.querySelector('#video-gif .btn-download').style.display = 'inline-flex';
            document.querySelector('#video-gif .btn-download').onclick = function() {
                downloadGif(blob);
            };
            showMessage('GIF generated successfully!', 'success');
        });
        
        videoElement.play();
        setTimeout(captureFrame, 100);
    };
}

function downloadGif(blob) {
    if (!blob) {
        showMessage('Please generate a GIF first', 'error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = 'video.gif';
        link.href = URL.createObjectURL(blob);
        link.click();
        showMessage('GIF downloaded successfully!', 'success');
    } catch (error) {
        showMessage(`Download failed: ${error.message}`, 'error');
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
    
    showMessage('Video data cleared', 'success');
}

// Export functions for global use
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

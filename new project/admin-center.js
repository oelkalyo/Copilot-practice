// Admin Center JavaScript

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const actionItems = document.querySelectorAll('.action-item');
const menuButtons = document.querySelectorAll('.icon-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Center loaded successfully!');
    initNavigation();
    initActions();
    initMenuButtons();
});

// Navigation Handler
function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            const href = item.getAttribute('href');
            console.log('Navigating to:', href);
            
            // Update header title
            const label = item.querySelector('.nav-label').textContent;
            updateHeaderTitle(label);
        });
    });
}

// Action Items Handler
function initActions() {
    actionItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const title = item.querySelector('h4').textContent;
            console.log('Action clicked:', title);
            
            // Show notification
            showNotification(`Action: ${title}`, 'success');
        });
    });
}

// Menu Buttons Handler
function initMenuButtons() {
    menuButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menu clicked');
            showMenu(btn);
        });
    });
}

// Update Header Title
function updateHeaderTitle(title) {
    const headerTitle = document.querySelector('.header-left h1');
    if (headerTitle) {
        headerTitle.textContent = title;
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#057642' : '#0a66c2'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show Context Menu
function showMenu(button) {
    const menu = document.createElement('div');
    menu.style.cssText = `
        position: absolute;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        min-width: 150px;
    `;
    
    menu.innerHTML = `
        <div style="padding: 8px 0;">
            <a style="display: block; padding: 8px 16px; color: var(--text); text-decoration: none; cursor: pointer;">Edit</a>
            <a style="display: block; padding: 8px 16px; color: var(--text); text-decoration: none; cursor: pointer;">Delete</a>
            <a style="display: block; padding: 8px 16px; color: var(--text); text-decoration: none; cursor: pointer;">More info</a>
        </div>
    `;
    
    document.body.appendChild(menu);
    
    const rect = button.getBoundingClientRect();
    menu.style.top = rect.bottom + 'px';
    menu.style.right = (window.innerWidth - rect.right) + 'px';
    
    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (e.target !== button && !menu.contains(e.target)) {
            menu.remove();
        }
    }, { once: true });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

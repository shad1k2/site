// Только легкие оптимизированные эффекты

// Плавное появление элементов
function initSmoothAppear() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    document.querySelectorAll('.glass-btn').forEach(btn => {
        observer.observe(btn);
    });
}

// Легкий эффект нажатия
function initClickEffects() {
    const buttons = document.querySelectorAll('.glass-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Простой эффект - без создания DOM элементов
            this.style.transform = 'translateY(-1px) scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 100);
        });
    });
}

// Оптимизированный параллакс (отключим если лагает)
function initLightParallax() {
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;
                
                document.querySelector('.main-container').style.transform = 
                    `translate(${x}px, ${y}px)`;
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Инициализация только легких эффектов
document.addEventListener('DOMContentLoaded', () => {
    initSmoothAppear();
    initClickEffects();
    
    // Параллакс можно отключить если будут лаги
    // initLightParallax();
    
    console.log('⚡ Optimized site loaded!');
});

// Отложенная загрузка фона для производительности
function optimizeBackground() {
    const bgImage = new Image();
    bgImage.src = 'background.jpg';
    bgImage.onload = function() {
        document.body.style.backgroundImage = `url('${bgImage.src}')`;
    };
}

// Оптимизация анимаций
function optimizeAnimations() {
    // Отключает анимации при уменьшенной motion настройке
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
        });
    }

// Эффект перетекания жидкого стекла между кнопками
class LiquidGlassEffect {
    constructor() {
        this.follower = null;
        this.currentButton = null;
        this.isMoving = false;
        this.init();
    }

    init() {
        // Создаем элемент-преследователь
        this.createFollower();
        
        // Находим все контейнеры с кнопками
        const containers = document.querySelectorAll('.buttons-container, .contacts-buttons');
        
        containers.forEach(container => {
            const buttons = container.querySelectorAll('.glass-btn, .contact-btn');
            
            buttons.forEach(button => {
                this.addButtonEvents(button, container);
            });
        });
    }

    createFollower() {
        this.follower = document.createElement('div');
        this.follower.className = 'liquid-follower';
        document.body.appendChild(this.follower);
    }

    addButtonEvents(button, container) {
        button.addEventListener('mouseenter', (e) => {
            this.handleMouseEnter(e, button, container);
        });

        button.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e, button);
        });

        button.addEventListener('mouseleave', (e) => {
            this.handleMouseLeave(e, button, container);
        });
    }

    handleMouseEnter(e, button, container) {
        this.currentButton = button;
        this.isMoving = true;

        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Позиционируем follower на кнопку
        this.follower.style.width = `${buttonRect.width}px`;
        this.follower.style.height = `${buttonRect.height}px`;
        this.follower.style.left = `${buttonRect.left}px`;
        this.follower.style.top = `${buttonRect.top}px`;
        this.follower.style.borderRadius = window.getComputedStyle(button).borderRadius;
        this.follower.style.opacity = '1';

        // Добавляем эффект пульсации
        this.follower.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.follower.style.transform = 'scale(1)';
        }, 150);
    }

    handleMouseMove(e, button) {
        if (!this.isMoving || !this.currentButton || this.currentButton !== button) return;

        const buttonRect = button.getBoundingClientRect();
        const mouseX = e.clientX - buttonRect.left;
        const mouseY = e.clientY - buttonRect.top;

        // Эффект волны от курсора
        const distanceFromCenterX = (mouseX / buttonRect.width - 0.5) * 2;
        const distanceFromCenterY = (mouseY / buttonRect.height - 0.5) * 2;
        
        this.follower.style.transform = `
            scale(1.01)
            translateX(${distanceFromCenterX * 3}px)
            translateY(${distanceFromCenterY * 3}px)
        `;
    }

    handleMouseLeave(e, button, container) {
        this.isMoving = false;
        
        // Проверяем, переходит ли курсор на другую кнопку
        const relatedButton = e.relatedTarget?.closest('.glass-btn, .contact-btn');
        
        if (!relatedButton) {
            // Если уходит совсем - плавно скрываем
            this.hideFollower();
        } else {
            // Если переходит на другую кнопку - плавно перемещаем
            this.moveToButton(relatedButton);
        }
    }

    moveToButton(newButton) {
        const newRect = newButton.getBoundingClientRect();
        
        this.follower.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        this.follower.style.width = `${newRect.width}px`;
        this.follower.style.height = `${newRect.height}px`;
        this.follower.style.left = `${newRect.left}px`;
        this.follower.style.top = `${newRect.top}px`;
        this.follower.style.borderRadius = window.getComputedStyle(newButton).borderRadius;

        this.currentButton = newButton;

        // После перемещения возвращаем стандартную анимацию
        setTimeout(() => {
            this.follower.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        }, 400);
    }

    hideFollower() {
        this.follower.style.opacity = '0';
        this.follower.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.follower.style.transform = 'scale(1)';
            this.currentButton = null;
        }, 300);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new LiquidGlassEffect();
    console.log('🌊 Liquid glass effect activated!');
});

// Оптимизация для мобильных устройств
function checkTouchDevice() {
    if ('ontouchstart' in window) {
        document.querySelectorAll('.glass-btn, .contact-btn').forEach(btn => {
            btn.style.cursor = 'default';
        });
    }
}

checkTouchDevice();
}
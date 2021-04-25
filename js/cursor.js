let mousePos = {
    x: 0,
    y: 0
}

let cursor = {
    text: '',
    el: null,
    textEl: null,
    width: {
        target: 2,
        default: 2,
    },
    height: {
        target: 20,
        default: 10
    },
    textOpacity: {
        current: 0
    }
}

const arrowRight = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.7072 197.5391"><path d="M201.7072,98.77l-74.9131,98.77H107.3768l34.6778-45.7815,34.1243-44.6631H0v-16.65H176.1789L142.0546,45.77,107.3768,0h19.4173Z"/></svg>`
const arrowLeft = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.7072 197.5391"><path d="M0,98.77,74.913,0H94.33L59.6525,45.7814,25.5283,90.4446H201.7072v16.65H25.5283l34.1242,44.6744,34.6778,45.77H74.913Z"/></svg>`

function animate() {
    requestAnimationFrame(animate);
    drawCursor(mousePos)
};

function drawCursor(mouse) {
    let x = mouse.x;
    let y = mouse.y;

    const ratio = (mouse.x / window.innerWidth);
    document.body.style.fontVariationSettings = `'tong' ${100 + (ratio * 100)}`

    cursor.el.style.transform = `translateX(calc(${x}px - 50%)) translateY(${y}px)`;
    cursor.el.style.width = `${cursor.width.target}px`;
    cursor.textEl.style.opacity = cursor.textOpacity.current;
}

function initCursor() {
    cursor.el = document.querySelector('.cursor-container')
    cursor.textEl = document.querySelector('.cursor-text')

    let activeElements = document.querySelectorAll('[data-cursorText]');
    activeElements.forEach(el => {
        el.addEventListener('mouseover', (e) => {
            e.stopPropagation();
            const newText = el.getAttribute('data-cursorText')
            if (newText === 'arrowRight') {
                cursor.textEl.innerHTML = arrowRight;
            } else if (newText === 'arrowLeft') {
                cursor.textEl.innerHTML = arrowLeft;
            } else {
                cursor.textEl.textContent = newText
            }
            cursor.width.target = cursor.textEl.scrollWidth;
            cursor.textOpacity.current = 1;

        })
        el.addEventListener('mouseout', function () {
            cursor.width.target = cursor.width.default;
            cursor.height.target = cursor.height.default;
            cursor.textOpacity.current = 0;
            cursor.textEl.textContent = ''
        })
    })
}

window.addEventListener('DOMContentLoaded', () => {
    initCursor();
    animate()
    window.addEventListener('resize', e => {
        initCursor()
    })
    window.addEventListener('mousemove', e => {
        mousePos = {
            x: e.clientX,
            y: e.clientY,
        }
    })
})
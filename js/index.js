String.prototype.capitalize = function () {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

function shuffle() {
    var container = document.querySelector(".works");
    if (container) {
        var elementsArray = Array.prototype.slice.call(container.querySelectorAll('.work'));
        elementsArray.forEach(function (element) {
            container.removeChild(element);
        })
        shuffleArray(elementsArray);
        elementsArray.forEach(function (element) {
            container.appendChild(element);
        })
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function initFontToggles() {
    const toggles = document.querySelectorAll('.toggleTypeface')
    const overlay = document.querySelector('.typeface-overlay')

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active')
        document.body.setAttribute('data-font', '')
        toggles.forEach(to => {
            to.classList.remove('active')
        })
    })

    toggles.forEach(t => {
        t.addEventListener('click', e => {
            e.stopPropagation();
            if (t.classList.contains('active')) {
                t.classList.remove('active')
                document.body.setAttribute('data-font', '')
            } else {
                toggles.forEach(to => {
                    to.classList.remove('active')
                })
                t.classList.add('active')
                document.body.setAttribute('data-font', t.getAttribute('data-typeface'))
                overlay.classList.add('active')
            }
        })
    })
}

function initControls() {
    const controls = document.querySelectorAll('.controls .control');
    controls.forEach((c) => {
        c.addEventListener('click', e => {
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
                toggleSections(e.target.getAttribute('data-section'), 'off');

            } else {
                e.target.classList.add('active');
                toggleSections(e.target.getAttribute('data-section'), 'on');
            }
        })
    })
}


function toggleSections(section, status) {
    const targetSections = document.querySelectorAll(`.work-${section}`)
    targetSections.forEach(s => {
        loadVideos(s);
        if (status === 'off') {
            s.classList.remove('open')
        } else if (status === 'on') {
            s.classList.add('open')
        }

    })
}

function loadVideos(container) {
    const videoEls = container.querySelectorAll('video')
    videoEls.forEach(v => {

        if (!v.getAttribute('src')) {
            v.setAttribute('src', v.getAttribute('data-src'))
            console.log(`Setting src ${v.getAttribute('data-src')}`)
        }
    })
}

function expandImage(url) {
    const lb = document.querySelector('.lightbox')
    const lbImage = lb.querySelector('img')
    const lbVideo = lb.querySelector('.lightbox-video')
    lb.classList.remove('image')
    lb.classList.remove('video')

    if (url.includes('.mp4')) {
        lbVideo.setAttribute('src', url)
        lb.classList.add('video')
    } else {
        lbImage.setAttribute('src', url)
        lb.classList.add('image')
    }
    lb.classList.add('active')
}

function initImages(container) {
    const images = container.querySelectorAll('.work-figure')
    images.forEach((img, i) => {
        if (i === 0) {
            img.classList.add('active')
        }

        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (i <= images.length - 2) {
                if (images[i + 1].classList.contains('active')) {
                    images[i + 1].classList.remove('active')
                } else {
                    images[i + 1].classList.add('active')
                }
            } else if (i === images.length - 1) {
                const c = container.querySelector(".work-images").getAttribute('data-controls')
                const nextSection = container.querySelector(`.work-${c}`)
                nextSection.classList.toggle('open')
            }

        })

        const url = img.getAttribute('data-large')
        const toggle = img.querySelector('.figure-expand')
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            expandImage(url)
        })
    })
}

function initLightbox() {
    const lb = document.querySelector('.lightbox')
    if (lb) {
        lb.addEventListener('click', () => {
            lb.classList.remove('active')
        })
    }
}

function initWorks() {
    const works = document.querySelectorAll('.work')
    works.forEach((w) => {

        initImages(w)
        initArtistResponse(w);

        // Bind comment form 
        const commentSection = w.querySelector('.comment-form')
        const commentSubmit = w.querySelector('.comment-submit')
        const commentInput = w.querySelector('.comment-form .input')
        if (commentSubmit) {

            commentSubmit.addEventListener('click', (e) => {
                handleCommentSubmit(e, commentSection.getAttribute('data-project'), commentInput.textContent)
                commentInput.textContent = "";
                commentInput.focus()
            })


            const toggleCommentForm = w.querySelector('.toggleCommentForm');
            toggleCommentForm.addEventListener('click', (e) => {
                e.stopPropagation()

                if (document.body.classList.contains('signed-in')) {
                    if (commentSection.classList.contains('form-active')) {
                        commentSection.classList.remove('form-active')
                        toggleCommentForm.setAttribute('data-cursorText', 'Add Response')
                        toggleCommentForm.dispatchEvent(new Event('mouseover'))
                    } else {
                        toggleCommentForm.setAttribute('data-cursorText', 'Cancel')
                        commentSection.classList.add('form-active')
                        commentInput.focus();
                        toggleCommentForm.dispatchEvent(new Event('mouseover'))
                    }
                } else {
                    const signInEl = document.querySelector('#js-signin')
                    signInEl.click()
                }
            })
            commentInput.addEventListener('input', () => {
                if (commentInput.textContent.length > 5) {
                    commentSubmit.classList.remove('disabled')
                } else {
                    commentSubmit.classList.add('disabled')
                }
            })
        }

        // Bind section events
        let sections = w.querySelectorAll('.work-section')
        sections.forEach((s) => {
            s.addEventListener('click', e => {
                const parent = s.closest(".work")
                const c = s.getAttribute('data-controls')
                const target = parent.querySelector(`.work-${c}`)
                target.classList.toggle('open')
                loadVideos(target)
            })

            let openBracket = document.createElement('span')
            const sectionTitle = s.getAttribute('data-section')
            openBracket.classList.add('bracket')
            openBracket.setAttribute('data-cursorText', sectionTitle.capitalize())
            openBracket.innerText = s.getAttribute('data-brackets').split('')[0]
            openBracket.addEventListener('click', (e) => {
                s.classList.toggle('open')
                loadVideos(s)
            })

            let closeBracket = document.createElement('span')
            closeBracket.setAttribute('data-cursorText', sectionTitle.capitalize())
            closeBracket.innerText = s.getAttribute('data-brackets').split('')[1]
            closeBracket.classList.add('bracket')

            closeBracket.addEventListener('click', (e) => {
                s.classList.toggle('open')
                loadVideos(s)
            })

            s.insertAdjacentElement('beforebegin', openBracket)
            s.insertAdjacentElement('afterend', closeBracket)

        })
    })
}

function initArtistResponse(w) {
    const toggle = w.querySelector('.toggleArtistResponse')
    if (toggle) {
        toggle.addEventListener('click', () => {
            w.classList.toggle('open')
        })
    }
}

function initRoland() {
    const expands = document.querySelectorAll('.roland .letter-expand')
    expands.forEach(b => {
        b.addEventListener('click', (e) => {
            e.stopPropagation();
            b.parentElement.classList.toggle('open')
            b.parentElement.querySelector('.letter').classList.toggle('active')
        })
    })
}


window.addEventListener('DOMContentLoaded', () => {
    shuffle();
    initWorks()
    initControls()
    initLightbox();
    initFontToggles();
    initRoland();
    toggleSections('title', 'on')
})

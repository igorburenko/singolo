const NAVIGATION = document.getElementById('navigation');
const PORTFOLIO_FILTER = document.getElementById('portfolio_buttons');
const BUTTON_SUBMIT = document.getElementById('submit-button');
const BUTTON_OK = document.getElementById('popup-close-btn');
const PORTFOLIO_PICT = document.getElementById('portfolio-pictures');
const PHONE_HORIZONTAL_SCREEN = document.getElementById('iphone-horizontal');
const PHONE_VERTICAL_SCREEN = document.getElementById('iphone-vertical');

let iphoneVerticalScreenState = true,
    iphoneHorizontalScreenState = true,
    firstSliderItem = true,
    sliderAnimationEnd = true;

NAVIGATION.addEventListener('click', (event) => {
    if (event.target.tagName !== 'A') return;
    NAVIGATION.querySelectorAll('.navigation__item')
        .forEach(el => el.classList.remove('navigation__item_active'));
    event.target.classList.add('navigation__item_active');
});

PORTFOLIO_FILTER.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return;
    PORTFOLIO_FILTER.querySelectorAll('li')
        .forEach(el => el.classList.remove('portfolio__button-item_active'));
    event.target.classList.add('portfolio__button-item_active');
    portfolioPrint();
});

PORTFOLIO_PICT.addEventListener('click', (event) => {
    if (event.target.tagName !== 'IMG') return;
    PORTFOLIO_PICT.querySelectorAll('li')
        .forEach(el => el.classList.remove('portfolio__image-item_active'));
    event.target.parentNode.classList.add('portfolio__image-item_active');
});

//form submissions
BUTTON_SUBMIT.addEventListener('click', (event) => {

    if (document.querySelector('.form-quote').checkValidity()) {
        event.preventDefault();
        let messageText = getSubjectInput();
        messageText += getDescriptionInput();
        document.getElementById('result').innerText = messageText;
        document.getElementById('quote-popup-block').classList.remove('hidden')

    }
});

function getSubjectInput() {
    const subject = document.getElementById('subject').value;
    return subject ? `\nТема: ${subject}` : '\nБез темы';
}

function getDescriptionInput() {
    const description = document.getElementById('description').value;
    let sliced = description.slice(0, 300);
    if (sliced.length < description.length) {
        sliced += '...';
    }
    return description ? `\nОписание: ${sliced}` : '\nБез описания';
}


BUTTON_OK.addEventListener('click', (event) => {
    document.getElementById('quote-popup-block').classList.add('hidden')
});

//phone screens tap off
PHONE_HORIZONTAL_SCREEN.addEventListener('click', (event) => {
    iphoneHorizontalScreenState ?
        document.getElementById('iphone-horizontal-screen').classList.add('screen_off') :
        document.getElementById('iphone-horizontal-screen').classList.remove('screen_off');
    iphoneHorizontalScreenState = !iphoneHorizontalScreenState;
});

PHONE_VERTICAL_SCREEN.addEventListener('click', (event) => {
    iphoneVerticalScreenState ?
        document.getElementById('iphone-vertical-screen').classList.add('screen_off') :
        document.getElementById('iphone-vertical-screen').classList.remove('screen_off');
    iphoneVerticalScreenState = !iphoneVerticalScreenState;
});

//слайдер

document.querySelector('.slider__arrow_left').addEventListener('click', () => slider());
document.querySelector('.slider__arrow_right').addEventListener('click', () => slider(false));


function slider(leftArrow = true) {
    if (sliderAnimationEnd) {
        sliderAnimationEnd = !sliderAnimationEnd;

        const currentPicture = firstSliderItem ? 'picture-1' : 'picture-2';
        const nextPicture = firstSliderItem ? 'picture-2' : 'picture-1';
        const nextSlide = document.getElementsByClassName(nextPicture)[0];
        const currentSlide = document.getElementsByClassName(currentPicture)[0];
        const background = document.getElementsByClassName('slider__Picture-wrapper')[0];
        const arrow = Array.from(document.getElementsByClassName('arrow'));
        let firstOffset, secondOffset;

        if (leftArrow) {
            firstOffset = 'slider_left-offset';
            secondOffset = 'slider_right-offset';
        } else {
            firstOffset = 'slider_right-offset';
            secondOffset = 'slider_left-offset';
        }

        nextSlide.classList.add(secondOffset);
        nextSlide.addEventListener("transitionend",
            () => {
                nextSlide.classList.remove('hidden_opacity');
                nextSlide.classList.remove(secondOffset);
            }, {once: true});
        currentSlide.classList.add(firstOffset);

        if (firstSliderItem) {
            arrow.forEach(element => element.classList.add('arrow_blue'));
            background.classList.add('second-picture');
        } else {
            arrow.forEach(element => element.classList.remove('arrow_blue'));
            background.classList.remove('second-picture');
        }

        currentSlide.addEventListener("transitionend",
            () => {
                currentSlide.classList.add('hidden_opacity');
                nextSlide.style.zIndex = '100';
                currentSlide.style.zIndex = '1';
                currentSlide.classList.remove(firstOffset);
                sliderAnimationEnd = !sliderAnimationEnd;
            }, {once: true});

        firstSliderItem = !firstSliderItem;
    }
}
// console.log(portfolioRandom(['1','2','3','4','5','6','7','8','9','10','11','12']));

function portfolioGalleryGenerate(arr) {
    return arr.reduce((acc, val) => { return acc + `
        <li class="image-portfolio portfolio__image-item">
             <img src="assest/img/portfolio/${val}.png" alt="portfolio-image-item">
        </li>`}, '');
}

function portfolioPrint() {
    document.getElementById('portfolio-pictures')
        .innerHTML = portfolioGalleryGenerate(shuffle(['1','2','3','4','5','6','7','8','9','10','11','12']))
}

function shuffle(arr){
    let j, temp;
    for(let i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
window.onload = function () {

    const NAVIGATION = document.getElementById('navigation');
    const PORTFOLIO_FILTER = document.getElementById('portfolio_buttons');
    const BUTTON_SUBMIT = document.getElementById('submit-button');
    const BUTTON_OK = document.getElementById('popup-close-btn');
    const PORTFOLIO_PICT = document.getElementById('portfolio-pictures');
    const PHONE_HORIZONTAL_SCREEN = document.getElementById('iphone-horizontal');
    const PHONE_VERTICAL_SCREEN = document.getElementById('iphone-vertical');
    const BURGER_MENU = document.getElementById('menu-icon');

    let firstSliderItem = true,
        sliderAnimationEnd = true;

    BURGER_MENU.addEventListener('click', (event) => {
        openBurgerMenu (event);
    });

    function openBurgerMenu (event) {
        document.querySelector('.header-wrapper').classList.toggle('header__wrapper-close');
        event.target.classList.toggle('menu-icon_active');
    }

    PORTFOLIO_FILTER.addEventListener('click', (event) => {
        if (event.target.tagName !== 'LI') return;
        PORTFOLIO_FILTER.querySelectorAll('li')
            .forEach(el => el.classList.remove('portfolio__button-item_active'));
        event.target.classList.add('portfolio__button-item_active');
        printPortfolio();
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
            document.getElementById('quote-popup-block').classList.remove('hidden');
            document.querySelector('.form-quote').reset();
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


    BUTTON_OK.addEventListener('click', () => {
        document.getElementById('quote-popup-block').classList.add('hidden');
    });

//phone screens tap off
    PHONE_HORIZONTAL_SCREEN.addEventListener('click', (event) => {
        if (event.target.id === 'iphone-horizontal-shadow') return;
        document.getElementById('iphone-horizontal-screen').classList.toggle('screen_off');
    });

    PHONE_VERTICAL_SCREEN.addEventListener('click', (event) => {
        if (event.target.id === 'iphone-vertical-shadow') return;
        document.getElementById('iphone-vertical-screen').classList.toggle('screen_off');
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

            background.classList.toggle('second-picture');
            firstSliderItem = !firstSliderItem;

            currentSlide.addEventListener("transitionend",
                () => {
                    currentSlide.classList.add('hidden_opacity');
                    nextSlide.style.zIndex = '100';
                    currentSlide.style.zIndex = '1';
                    currentSlide.classList.remove(firstOffset);
                    sliderAnimationEnd = !sliderAnimationEnd;
                }, {once: true});
        }
    }

    //portfolio images
    function printPortfolio() {
        let pictures = document.querySelectorAll('.portfolio__image-item');
        let newArr = shuffle(Array.from(pictures));
        document.getElementById('portfolio-pictures').innerHTML = newArr.reduce((acc, event) =>
            typeof acc === 'string' ? acc + event.outerHTML : acc.outerHTML + event.outerHTML);
    }

    function shuffle(arr) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    function slideToAnchor(event) {
        const currentPos = window.scrollY;
        const articles = document.querySelectorAll('main>article');

        articles.forEach((element) => {
            if (currentPos + 95 >= element.offsetTop && currentPos + 95 < (element.offsetTop + element.offsetHeight)) {
                NAVIGATION.querySelectorAll('a').forEach((el) => {
                    el.classList.remove('navigation__item_active');

                    if (element.getAttribute('class') === el.getAttribute('href').substring(1)) {
                        el.classList.add('navigation__item_active');
                    }
                })
            }
        });
    }

    window.addEventListener('scroll', slideToAnchor);
};


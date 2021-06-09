'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
// console.log(modal);
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//  NAVIGATION MENU

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//scroll- down-to section

const btnScrollDown = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollDown.addEventListener('click', function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//TABBED COMPONENT

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // if not clicked on button return immediately
  // guard class
  if (!clicked) return;

  //REMOVE ACTIVE CLASSES
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //ACTIVATE TAB
  clicked.classList.add('operations__tab--active');

  //ACTIVE CONTENT AREA
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// STICKY NAVIGATION
// const nav = document.querySelector('.nav');
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//INTERSECTION OBSERVER API
// STICKY NAVIGATION

const header = document.querySelector('.header');
const nav = document.querySelector('nav');
let menuItems = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

let options = {};

const navObserver = new IntersectionObserver(menuItems, options);

navObserver.observe(header);

//REVEALING PAGES ON SCROLL

const allSections = document.querySelectorAll('.section');
const reveling = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const observer = new IntersectionObserver(reveling, {
  root: null,
  threshold: 0.25,
});

allSections.forEach(section => {
  observer.observe(section);
  section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES

const img = document.querySelectorAll('img[data-src]');
// console.log(img);

const lazyImages = function (entries, observer) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
      observer.unobserve(entry.target);
    });
  });
};

const imgObserver = new IntersectionObserver(lazyImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

img.forEach(function (img) {
  imgObserver.observe(img);
});

//slider logic
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  let maxSlide = slides.length;

  //Create Dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  //Activate Dots
  const activatDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (dot) {
      dot.classList.remove('dots__dot--active');
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };
  activatDots(0);

  //GOTO SLIDE
  const goToSlide = function (slide) {
    slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  goToSlide(0);

  //Next Slide

  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activatDots(currSlide);
  };

  //Prev slide

  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activatDots(currSlide);
  };

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  // Keyboard Events for sliders - left and Right

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // console.log(dotContainer);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activatDots(slide);
    }
  });
};

slider();

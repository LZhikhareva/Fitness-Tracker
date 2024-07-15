const colors = ['#FA6648', '#FFB0BC', '#FFBD12'];
const colorsAlt = ['#1BDBC4', '#962EFF', '#F95A2C', '#FFBD12']
const slides = document.querySelectorAll('.slider-item');
const slider = document.querySelector(".slider");
const dots = document.querySelectorAll('.dot');
let sliderIndex = 0;

const stories = document.querySelectorAll('.stories-img');
const planItems = document.querySelectorAll('.plan-item')

const burger = document.querySelector('.menu-burger');
const menu = document.querySelector('.menu-items-list');

const popupClose = document.querySelectorAll('.popup-close');

const monthlyItem = document.querySelector('.duration-month');
const yearItem = document.querySelector('.duration-year');
const registerBtns = document.querySelectorAll('.plan-item-button');

const selectList = [];
const select = document.querySelector('.select');
const selectOptions = Array.from(document.querySelectorAll('.tariff'));


// Random background

for (let slide of slides) {
  slide.style.background = getRandomColor();
}

for (let item of stories) {
  item.style.background = getRandomColorAlt();
}

for (let item of planItems) {
  item.style.background = getRandomColorAlt();
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomColorAlt() {
  return colorsAlt[Math.floor(Math.random() * colorsAlt.length)];
}

// Slider-scroll


$('.slider-list').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  centerMode: true,
  infinite: true
});

// start-form submission and email validation
const form = document.querySelector('.start-form');
const input = document.querySelector('.start-input');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

function isEmailValid(value) {
  return EMAIL_REGEXP.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!isEmailValid(input.value)) {
    input.style.border = '2px solid red';
  } else {
    document.querySelector('.parent_popup').style.display = 'block';
    for (let button of popupClose) {
      button.addEventListener('click', () => {
        document.querySelector('.parent_popup').style.display = 'none';
        input.style.border = '1px solid #1C1C1D';
        input.value = '';
      })
    }
  }
})


// change of tariff plans

monthlyItem.addEventListener('click', () => {
  document.querySelector('.year-plan-items').style.display = 'none';
  document.querySelector('.monthly-plan-items').style.display = 'flex';
})

yearItem.addEventListener('click', () => {
  document.querySelector('.year-plan-items').style.display = 'flex';
  document.querySelector('.monthly-plan-items').style.display = 'none';
})

// popup for registration (open and fill options)

selectOptions.forEach(option => {
  const newOption = document.createElement('option');
  newOption.value = option.textContent;
  newOption.text = option.textContent;
  select.appendChild(newOption);
});

registerBtns.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.tariff-parent_popup').style.display = 'block';
    document.querySelector('.tariff-popup').style.display = 'block';
    document.querySelector('.tariff-success-registration').style.display = 'none';
    const tariffText = button.closest('.plan-item').querySelector('.tariff').textContent;
    select.value = tariffText;
  });
});

// check data validity and registration form submission

const formRegister = document.querySelector('.register-form');
const inputRegister = document.querySelector('.register-email');
const user = {};

formRegister.addEventListener('submit', (e) => {
  e.preventDefault();
  if (document.getElementById('name').value === '') {
    document.getElementById('name').style.border = '1px solid red';
  } else {
    document.getElementById('name').style.border = '1px solid black';
  }
  if (document.getElementById('surname').value === '') {
    document.getElementById('surname').style.border = '1px solid red';
  } else {
    document.getElementById('surname').style.border = '1px solid black';
  }
  if (!isEmailValid(inputRegister.value)) {
    inputRegister.style.border = '1px solid red';
  } else {
    inputRegister.style.border = '1px solid black';
  }
  if (document.getElementById('name').value !== '' &&
    document.getElementById('surname').value !== '' &&
    isEmailValid(inputRegister.value)) {
    user.name = document.getElementById('name').value;
    user.surname = document.getElementById('surname').value;
    user.email = document.getElementById('email').value;
    user.tariff = document.getElementById('select').value;
    document.querySelector('.tariff-popup').style.display = 'none';
    document.querySelector('.tariff-success-registration').style.display = 'block';
    localStorage.setItem('user', JSON.stringify(user));
    formRegister.reset()
  }
});

// close buttons

for (let closeBtn of document.querySelectorAll('.close')) {
  closeBtn.addEventListener('click', () => {
    document.querySelector('.tariff-parent_popup').style.display = 'none';
    document.querySelector('.parent_popup').style.display = 'none';
    form.reset();
    formRegister.reset();
  })
}

// footer smooth scroll

function smoothScroll(from, to) {
  from.addEventListener('click', () => {
    if (to.offsetParent !== null) {
      let start = window.pageYOffset;
      let target = to.offsetTop;
      let distance = target - start + 10;
      let duration = 500;
      let startTime = null;
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scroll(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
      function easeInOutCubic(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
      requestAnimationFrame(animation);
    }
  });
}

const menuItemAbout = document.querySelector('.menu-item-about');
const about = document.getElementById('about');
smoothScroll(menuItemAbout, about);

const menuItemPricing = document.querySelector('.menu-item-pricing');
const pricing = document.getElementById('pricing');
smoothScroll(menuItemPricing, pricing);

const menuItemSignup = document.querySelector('.menu-item-signup');
const signup = document.getElementById('signup');
smoothScroll(menuItemSignup, signup);
'use strict'

const $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document),
  logIn = $('.js-btn-login'),
  signUp = $('.js-btn-signup'),
  navMobile = $('.category'),
  category = $('.navbar-mobile__category'),
  closeMobile = $('.category-navbar__icon'),
  place_trending = $$('.container-suggest--md > *'),
  place_trending_parent = $('.container-suggest--md'),
  course_item = [...$$('.courses-item')],
  quantity = document.querySelector('.number-quantity')
let index = 1;
const form = {
  event() {
    if (category) {
      category.onclick = () => navMobile.classList.add('open')
      closeMobile.onclick = () => navMobile.classList.remove('open')
    }
    if (place_trending_parent) {
      place_trending_parent.onwheel = function (e) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
      }
    }
    // handle course
    course_item.forEach((item, index) => index % 2 !== 0 ? item.classList.add('courses-item--md') : null);

    
    this.increaseIndex('.btn-quantity__count', quantity);
    // request get quantity
    const btnSubmit = $('.addCartBtn');
    const sendRequest = async () => {
      const response = await fetch(`${btnSubmit.href}?quantity=${quantity.value}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.redirected) window.location.href = response.url
    }
    if (btnSubmit)
      btnSubmit.onclick = function (e) {
        e.preventDefault();
        sendRequest();
      }

    const file = $('.profile-container .profile-file');
    const image = $('.profile-container .profile-img');
    const reader = new FileReader();
    if (file)
      file.onchange = (e) => {
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          image.src = this.result
        }
      }
  },
  increaseIndex(operator, quantity) {
    const operation = [...$$(operator)]
    operation.forEach(opera =>
      opera.onclick = function (e) {
        if (this.innerHTML === '+') {
          index >= 1 && index++;
          quantity.value = index;
        }
        else if (this.innerHTML === '-') {
          index > 1 && index--;
          quantity.value = index;
        }
      })
  },
  run() {
    this.event()
  }
}
form.run();
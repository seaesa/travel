'use strict';
import { postRequest, deleteRequest } from "./sendRequest.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// add-to-cart
const btnAddCart = $('.addCartBtn');
const btnDeleteCart = $('.btn-delete-cart');
const quantity = $('.number-quantity');
btnAddCart && btnAddCart.addEventListener('click', function (e) {
  e.preventDefault();
  postRequest({ quantity: quantity.value }, {
    url: this.href,
    redirect: true
  }, res => window.location.href = res.url
  )
})

// delete cart
btnDeleteCart && btnDeleteCart.addEventListener('click', function (e) {
  e.preventDefault();
  deleteRequest(null, {
    url: `${this.href}?_method=DELETE`,
    redirect: true
  }, response => window.location.href = response.url);
})



// handle payment
const checkout = $('.btn-checkout');
checkout && checkout.addEventListener('click', function (e) {
  e.preventDefault();
  const price = $('.card .price-total');
  const name = $('.card .title-tour');
  postRequest({ quantity: quantity.value },
    { url: `/user/checkout/${this.dataset.id}` }, async res => {
      const data = await res.json();
      window.location.href = data.url
    })
})
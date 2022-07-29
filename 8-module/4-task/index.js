import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    this.cartItem = this.cartItems;
    if (!!product) {
      if (this.cartItem.length === 0) {
        this.cartItem.push({product, count: 1});
      } else {
        let resultBoolean = !!(this.cartItem.find(item => item.product.id === product.id));
        if (resultBoolean === false) {
          this.cartItem.push({product, count: 1});
        } else {
          let resultObject = this.cartItem.find(item => item.product.id === product.id);
          resultObject.count++;
        }
      }
      this.onProductUpdate(this.cartItem);
    }
  }

  updateProductCount(productId, amount) {
    if (this.cartItems.length !== 0) {
      this.amount = amount;
      let resultObjectForUPD = this.cartItem.find(item => item.product.id === productId);
      let resultIndexForUPD = this.cartItem.findIndex(item => item.product.id === productId);
      resultObjectForUPD.count += this.amount;
      if (resultObjectForUPD.count === 0) {
        this.cartItem.splice(resultIndexForUPD, 1);
      }
      this.onProductUpdate(this.cartItem);
    }
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    let howManyProduct = 0;
    for (let item of this.cartItem) {
      howManyProduct += item.count;
    }
    return howManyProduct;
  }

  getTotalPrice() {
    let whatPrices = 0;
    for (let item of this.cartItem) {
      whatPrices += item.product.price * item.count;
    }
    return whatPrices;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.open();
    this.modal.setTitle('Your order');
    this.modal.setBody(createElement(`<div class="newDiv"></div>`));
    this.newDiv = document.querySelector('.newDiv');
    this.cartItem.map(item => {
      this.newDiv.append(this.renderProduct(item.product, item.count));
    });
    this.newDiv.append(this.renderOrderForm());

    this.newDiv.onclick = (event) => {
      let target = event.target;
      if (target.closest('button').classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(target.closest('.cart-product').dataset.productId, 1);
      }
      if (target.closest('button').classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(target.closest('.cart-product').dataset.productId, -1);
      }
    };

    for (let item of this.cartItem) {
      let productId = item.product.id;
      let productPrice = this.newDiv.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
    }

    let form = document.querySelector('.cart-form');
    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (!!document.querySelector('.is-modal-open')) {
      document.querySelector('.modal').remove();
      this.renderModal();
      for (let item of cartItem) {
        let productId = item.product.id;
        let productCount = this.newDiv.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = this.newDiv.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        productCount.innerHTML = item.count;
        productPrice.innerHTML = `€${(item.product.price * item.count).toFixed(2)}`;
      }
      let infoPrice = this.newDiv.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      if (!this.getTotalPrice()) {
        let isModalOpen = document.querySelector('.is-modal-open');
        isModalOpen.classList.remove('is-modal-open');
        document.querySelector('.modal').remove();
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let buttonTypeSubmit = document.querySelector(`[type='submit']`);
    buttonTypeSubmit.classList.add('is-loading');
    const form = document.querySelector('.cart-form');
    const formData = new FormData(form);
    const promise = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST',
    });
    promise
      .then(()=>{
        let modalTitle = document.querySelector('.modal__title');
        let modalBody = document.querySelector('.modal__body');
        modalTitle.innerHTML = 'Success!';
        this.cartItem.splice(0, this.cartItem.length);
        modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif" alt="Ссылка недоступна">
          </p>
        </div>`;
        let cartIcon = document.querySelector('.cart-icon');
        cartIcon.classList.remove('cart-icon_visible');
      })
      .catch(()=>{
        console.log('У тебя снова ничего не работает! Заебал, чини!');
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.slidesIdsArray = this.slidesIds();
    this.elem = this.container();
    this.buttonMoveRight = this.elem.querySelector('.carousel__arrow_right');
    this.buttonMoveLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.slidePosition = 0;
    this.elem.addEventListener('click', this.newCustomEvent);
    this.addToBasketButtons = this.elem.querySelectorAll('.carousel__button');
    this.buttonMoveLeft.style.display = 'none';
    this.#clickButtonLeft();
    this.#clickButtonRight();
    this.#setDataAttribute();

  }

  slidesIds () {
    return this.slides.map(slide => slide.id);
  }

  #setDataAttribute () {
    for (let j = 0; j < this.addToBasketButtons.length; j++) {
      this.addToBasketButtons[j].dataset.id = this.slidesIdsArray[j];
    }
  }

  newCustomEvent (event) {
    let target = event.target;
    if (target.closest('.carousel__button')) {
      const newEvent = new CustomEvent('product-add', {
        detail: target.closest('.carousel__button').dataset.id,
        bubbles: true
      });
      target.dispatchEvent(newEvent);
    }
  }

  #clickButtonLeft () {
    this.buttonMoveLeft.addEventListener('click', () => {
      this.carouselInner.style.transform = `translateX(${this.slidePosition += this.offsetWidth}px)`;
      this.#deleteButtonsIf();}
    );
  }


  #clickButtonRight () {
    this.buttonMoveRight.addEventListener('click', () => {
      this.carouselInner.style.transform = `translateX(${this.slidePosition -= this.offsetWidth}px)`;
      this.#deleteButtonsIf();}
    );
  }


  get offsetWidth () {
    return this.carouselInner.offsetWidth;
  }


  container () {
    return createElement(`
    <!--Корневой элемент карусели-->
  <div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
    ${this.slides.map(slide => {
    return `<div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
  }).join('')}
    </div>
  </div>`);
  }


   #deleteButtonsIf() {
    if (this.slidePosition === -(this.offsetWidth * (this.carouselInner.children.length - 1))) {
      this.buttonMoveRight.style.display = 'none';
    } else if (this.slidePosition === 0) {
      this.buttonMoveLeft.style.display = 'none';
    } else {
      this.buttonMoveLeft.style.display = '';
      this.buttonMoveRight.style.display = '';
    }
  }
}

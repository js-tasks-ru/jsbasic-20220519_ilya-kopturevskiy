import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.container();
    this.names = this.elem.querySelectorAll('.carousel__title');
    this.prices = this.elem.querySelectorAll('.carousel__price');
    this.images = this.elem.querySelectorAll('.carousel__img');
    this.buttonMoveRight = this.elem.querySelector('.carousel__arrow_right');
    this.buttonMoveLeft = this.elem.querySelector('.carousel__arrow_left');
    this.carouselInner = this.elem.querySelector('.carousel__inner');
    this.slidePosition = 0;
    this.elem.addEventListener('click', this.newCustomEvent);
    this.addToBasketButtons = this.elem.querySelectorAll('.carousel__button');
    this.buttonMoveLeft.style.display = 'none';
    this.#addSlidesToContainer();
    this.#clickButtonLeft();
    this.#clickButtonRight();
    this.#setDataAttribute();
  }

  #setDataAttribute () {
    for (let j = 0; j < this.addToBasketButtons.length; j++) {
      this.addToBasketButtons[j].setAttribute('data-id', this.slides[j].id);
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


   #addSlidesToContainer () {
    for (let i = 0; i < this.slides.length; i++) {
      this.names[i].textContent = this.slides[i].name;
      this.prices[i].textContent = `€${this.slides[i].price.toFixed(2)}`;
      this.images[i].src = `/assets/images/carousel/${this.slides[i].image}`;
    }
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
      <!--Верстка 1-ого слайда-->
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/penang_shrimp.png" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price"></span>
          <div class="carousel__title">Penang shrimp</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>

      <!--Верстка 2-ого слайда-->
      <div class="carousel__slide" data-id="chicken-cashew">
        <img src="/assets/images/carousel/chicken_cashew.png" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€16.00</span>
          <div class="carousel__title">Chicken cashew</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>

      <!--Верстка 3-ого слайда-->
      <div class="carousel__slide" data-id="red-curry-veggies">
        <img src="/assets/images/carousel/red_curry_vega.png" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€16.00</span>
          <div class="carousel__title">Red curry veggies</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>

      <!--Верстка 4-ого слайда-->
      <div class="carousel__slide" data-id="chicken-springrolls">
        <img src="/assets/images/carousel/chicken_loempias.png" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€16.00</span>
          <div class="carousel__title">Chicken springrolls</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
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


   newCustomEvent (event) {
     let target = event.target;
     if (target.closest('.carousel__button')) {
       const newEvent = new CustomEvent('product-add', {
         detail: event.target.closest('.carousel__button').dataset.id,
         bubbles: true
       });
       target.dispatchEvent(newEvent);
     }
   }
}

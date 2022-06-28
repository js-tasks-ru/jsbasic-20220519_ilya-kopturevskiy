import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.container();
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
    this.bodyElement = document.querySelector('body');
    this.modalCloseButton = this.elem.querySelector('.modal__close');
    this.modalCloseButton.addEventListener('click', () => this.close());
    this.closeWithEscape();
  }

  setTitle (title) {
    this.modalTitle.innerHTML = title;
  }

  setBody (body) {
    this.modalBody.innerHTML = '';
    this.modalBody.prepend(body);
  }

  open () {
    this.bodyElement.append(this.elem);
    this.bodyElement.classList.add('is-modal-open');

  }

  container () {
    return createElement(`
  <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`);
  }

  close () {
    this.elem.remove();
    this.bodyElement.classList.remove('is-modal-open');
  }

  closeWithEscape () {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.elem.remove();
        this.bodyElement.classList.remove('is-modal-open');
      }
    });

  }
}

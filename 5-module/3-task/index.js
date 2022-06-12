function initCarousel() {
  let buttonMoveRight = document.querySelector('.carousel__arrow_right');
  let buttonMoveLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');

  buttonMoveLeft.addEventListener('click', moveLeft);
  buttonMoveRight.addEventListener('click', moveRight);

  let slidePosition = carouselInner.offsetLeft;
  let slideWidth = carouselInner.offsetWidth;

  function deleteButtonsIf() {
    if (slidePosition === -(slideWidth * 3)) {
      buttonMoveRight.style.display = 'none';
    } else if (slidePosition === 0) {
      buttonMoveLeft.style.display = 'none';
    } else {
      buttonMoveLeft.style.display = '';
      buttonMoveRight.style.display = '';
    }
  }

  deleteButtonsIf();

  function moveLeft() {
    carouselInner.style.transform = `translateX(${slidePosition += slideWidth}px)`;
    deleteButtonsIf();
  }

  function moveRight() {
    carouselInner.style.transform = `translateX(${slidePosition -= slideWidth}px)`;
    deleteButtonsIf();
  }
}


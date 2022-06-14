function initCarousel() {
  let buttonMoveRight = document.querySelector('.carousel__arrow_right');
  let buttonMoveLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let slidePosition = 0;
  let slideWidth = carouselInner.offsetWidth;

  console.log(carouselInner.children.length);

  buttonMoveLeft.addEventListener('click', moveLeft);
  buttonMoveRight.addEventListener('click', moveRight);

  function moveLeft() {
    carouselInner.style.transform = `translateX(${slidePosition += slideWidth}px)`;
    deleteButtonsIf();
  }

  function moveRight() {
    carouselInner.style.transform = `translateX(${slidePosition -= slideWidth}px)`;
    deleteButtonsIf();
  }

  function deleteButtonsIf() {
    if (slidePosition === -(slideWidth * (carouselInner.children.length - 1))) {
      buttonMoveRight.style.display = 'none';
    } else if (slidePosition === 0) {
      buttonMoveLeft.style.display = 'none';
    } else {
      buttonMoveLeft.style.display = '';
      buttonMoveRight.style.display = '';
    }
  }

  deleteButtonsIf();


}


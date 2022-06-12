function toggleText() {
  let text = document.querySelector('#text');
  let button = document.querySelector('.toggle-text-button');

  function textOff() {
    // eslint-disable-next-line no-unused-expressions
    (text.hidden === true) ? text.hidden = false : text.hidden = true;
  }

  button.addEventListener('click', textOff);

}


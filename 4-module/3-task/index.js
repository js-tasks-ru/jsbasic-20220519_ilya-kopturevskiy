function highlight(table) {

  let trs = table.getElementsByTagName('tr');
  let indexAvailable;
  let indexAge;
  let indexGender;

  for (let j = 0; j < trs[0].children.length; j++) {

    if (trs[0].children[j].innerHTML === 'Status') {
      indexAvailable = j;
    }

    if (trs[0].children[j].innerHTML === 'Age') {
      indexAge = j;

    }
    if (trs[0].children[j].innerHTML === 'Gender') {
      indexGender = j;
    }
  }

  for (let tr of trs) {

    let tds = tr.getElementsByTagName('td');

    if (tds[indexAvailable].dataset.available === 'true') {
      tr.classList.add('available');
    } else if (tds[indexAvailable].dataset.available === 'false') {
      tr.classList.add('unavailable');
    } else {
      tr.hidden = true;
    }

    if (tds[indexGender].innerHTML === 'm') {
      tr.classList.add('male');
    } else {
      tr.classList.add('female');
    }

    if (+(tds[indexAge].innerHTML) < 18) {
      tr.style = ('text-decoration: line-through');
    }
  }
}


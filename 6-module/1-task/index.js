/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = createTable(rows);
  }
}

function createTable(rows) {
  let div = document.createElement('div');
  let myScript = document.querySelector('[type="module"]');
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let array = ['Имя', 'Возраст', 'Зарплата', 'Город'];

  myScript.before(div);
  div.prepend(table);
  table.prepend(thead);
  table.append(tbody);
  thead.prepend(tr);

  for (let k = 0; k < 5; k++) {
    let th = document.createElement('th');
    tr.append(th);
    th.textContent = array[k];
  }

  for (let elem of rows) {
    let tr = document.createElement('tr');
    tbody.prepend(tr);
    tr.classList.add('del');
    for (let subElem in elem) {
      let td = document.createElement('td');
      tr.prepend(td);
    }
    let td2 = document.createElement('td');
    tr.append(td2);
  }

  let newDiv = myScript.previousElementSibling;
  newDiv.classList.add('myDiv');
  let tds = newDiv.querySelectorAll('td');
  let names = rows.map(item => item.name);
  let ages = rows.map(item => item.age);
  let salaries = rows.map(item => item.salary);
  let cities = rows.map(item => item.city);

  let newArr = [];

  for (let i = 0; i < rows.length; i++) {
    newArr.push(names[i]);
    newArr.push(ages[i]);
    newArr.push(salaries[i]);
    newArr.push(cities[i]);
    newArr.push(`<button>X</button>`);
  }

  for (let j = 0; j < tds.length; j++) {
    tds[j].innerHTML = newArr[j];
  }

  let buttons = newDiv.getElementsByTagName("button");

  for (let buttonElement of buttons) {
    buttonElement.addEventListener('click', () => buttonElement.closest('.del').remove());
  }


}



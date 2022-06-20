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
    this.rows = rows;
    this.div = document.createElement('div');
    this.div.innerHTML = this.template();
    this.myScript = document.querySelector('[type="module"]');
    this.myScript.before(this.div);
    this.elem = this.div;
    this.newDiv = this.myScript.previousElementSibling;
    this.buttons = this.newDiv.getElementsByTagName('button');
    this.closeForClick();
  }

  template() {
    return `
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.rows.map(row => {
    return `<tr>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.salary}</td>
                <td>${row.city}</td>
                <td><button>X</button></td>
            </tr>`;})
      .join('')}
      </tbody>
    </table>`;
  }

  closeForClick () {
    for (let buttonElement of this.buttons) {
      buttonElement.addEventListener('click', () => buttonElement.closest('tr').remove());
    }
  }
}

let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
};



function sumSalary(obj) {

  let sum = 0;

  for (let key in obj) {

    if (isFinite(salaries[key])) {
      sum += salaries[key];
    }

  }

  return sum;

}

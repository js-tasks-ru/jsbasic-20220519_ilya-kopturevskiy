function showSalary(users, age) {
  let filterUsersByAge = users.filter(item => item.age <= age);
  let namesAndBalanceArr = filterUsersByAge
    .map(item => ({userBalance: `${item.name}, ${item.balance}`}))
    .map(item => item.userBalance);
  return namesAndBalanceArr.join('\n');
}

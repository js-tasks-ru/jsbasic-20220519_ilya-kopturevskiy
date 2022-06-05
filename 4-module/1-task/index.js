function makeFriendsList(friends) {

  let newArr = friends.map(item => item.firstName + ' ' + item.lastName);

  let ul = document.createElement("ul");

  for (let i = 0; i < friends.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = newArr[i];
    ul.append(li);
  }

  return ul;
}

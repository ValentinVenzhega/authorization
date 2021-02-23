'use strict';

const registerUser = document.querySelector('#register-user'), 
   loginUser = document.querySelector('#login-user'),
   listUser = document.querySelector('#list'),
   userName = document.querySelector('#user-name'),
   isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
   };

let appData = [];

const render = function() {
   listUser.textContent = '';
   appData.forEach((item, i) => {
      const li = document.createElement('li');
      li.classList.add('item');
      li.innerHTML = `
         <div class="list-elem">Имя:<span class="first-name">${item.firstName}</span></div>
         <div class="list-elem">Фамилия:<span class="last-name">${item.lastName}</span></div>
         <div class="list-elem">Зарегистирован:<span class="password">${item.regData}</span></div>
         <div class="list-button">
            <button class="list-elem"><span class="remove">X</span></button>
         </div>
      `;

      listUser.append(li);
      const remove = li.querySelector('.remove');
      remove.addEventListener('click', () => {
         appData.splice(i, 1);
         li.remove();
         render();
         localStorage.setItem('list', JSON.stringify(appData)); 
      });
   });
};

if (localStorage.getItem('list')) {
   appData = JSON.parse(localStorage.getItem('list'));
   render();
}

const regUser = function() {
   const User = {
      firstName: '',
      lastName: '',
      nickName: '',
      password: '',
      regData: '',
   };
   
   let userName;
   do {
      userName = prompt('Введите имя и фамилию', 'валентин венжега');
   } while (userName === null || userName.trim() === '' || userName.replace(/[^\d]+/g, ""));

   User.firstName = userName.split(' ').splice(0, 1).join('');
   User.lastName = userName.split(' ').splice(1, 1).join('');

   do {
      User.nickName = prompt('Ваш Логин', 'Vel123');
   } while (isNumber(User.nickName) || User.nickName === null || User.nickName.trim() === '');

   do {
      User.password = prompt('Введите Пароль', '12345');
   } while (!isNumber(User.password) || User.password === null || User.password === 0);

   const date = new Date(),
      options = {
         month: 'long',
         day: 'numeric',
         timezone: 'UTC'
      },
      month = date.toLocaleString("ru", options),
      year = date.getFullYear();

   User.regData = `${month} ${year} г., ${date.toLocaleTimeString()}`;
   appData.push(User);
   render();
   localStorage.setItem('list', JSON.stringify(appData));
};

const logUser = function() {
   let nickUser,
      passwordUser;

   do {
      nickUser = prompt('Ваш Логин');
   } while ( nickUser === '');

   let elemUser = appData.filter(item => item.nickName === nickUser);

   if (elemUser.length === 0) {
      alert('Пользователь не найден');
   }  else { 
      elemUser.forEach(item => {
         do {
            passwordUser = prompt('Введите Пароль');
         } while (isNumber(nickUser) || passwordUser === '');
         
         if ( item.password === passwordUser) {
            userName.textContent = `${item.nickName}`;
         }  else if (passwordUser === null) {
            alert('Авторизация прервана');
         } else if (item.password !== passwordUser) {
            alert('Неправильно введен Пароль');
            logUser();
         }
      });
   } 
};

registerUser.addEventListener('click', regUser);
loginUser.addEventListener('click',  logUser);

render();
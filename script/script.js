'use strict';

const registerUser = document.querySelector('#register-user'), 
   loginUser = document.querySelector('#login-user'),
   list = document.querySelector('#list'),
   userName = document.querySelector('#user-name');

let appData = [];

   let isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
   };

const render = function() {
   list.textContent = '';
   appData.forEach( function(item, i) {
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

      list.append(li);

      const remove = li.querySelector('.remove');
      remove.addEventListener('click', function() {
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
   let   User = {
      firstName: '',
      lastName: '',
      nickName: '',
      password: '',
      regData: '',
   };
   
   let user;
   do {user =  prompt('Введите имя и фамилию', 'валентин венжега');
   } while (user === null || user.trim() === '' || user.replace(/[^\d]+/g, ""));

   User.firstName = user.split(' ').splice(0, 1).join('');
   User.lastName = user.split(' ').splice(1, 1).join('');

   do {User.nickName =  prompt('Ваш Логин', 'Vel123');
   } while (isNumber(User.nickName) || User.nickName === null || User.nickName.trim() === '');

   do {User.password =  prompt('Введите Пароль', '12345');
   } while (!isNumber(User.password) || User.password === null || User.password === 0);

   const date = new Date(),
   options = {
      month: 'long',
      day: 'numeric',
      timezone: 'UTC'
   },
   month = date.toLocaleString("ru", options).split(', ').map(word => word[0].toUpperCase() + word.substring(1)).join(' '), 
	year = date.getFullYear();
   User.regData = `${month} ${year} г., ${date.toLocaleTimeString()}`;

   appData.push(User);
   render();
   localStorage.setItem('list', JSON.stringify(appData));
};

const logUser = function() {
   let nick,
      passwd;
      console.log( passwd);
   do {nick =  prompt('Ваш Логин');

   } while ( nick === '');
   let a = appData.filter(item =>  item.nickName === nick);

   if (a.length === 0) {
      alert('Пользователь не найден');
   }
   else {a.forEach(item => {
      do {
         passwd =  prompt('Введите Пароль');
      } while (isNumber(nick) || passwd === '');
      if ( item.password === passwd) {
         userName.textContent = `${item.nickName}`;
      }  else if (passwd === null) {
         alert('Авторизация прервана');
      } else if (item.password !== passwd) {
         alert('Неправильно введен Пароль');
         logUser();
      }
   });

   } 
};

registerUser.addEventListener('click', regUser);
loginUser.addEventListener('click',  logUser);

render();



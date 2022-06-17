// rfc або rfce - скорочення створення
import React, { useState } from 'react';

const Counter = () => {
   // Створюємо стан змінної, щоб реакт розумів, що відбулись зміни, та треба перемалювати компонент:
   const [likes, setLikes] = useState(0); // Створює масив, де перший елемент наше значення (0), а другий функція зміни стану
   // Тому робимо одназу деструктизацію [a,b] в змінну, щоб отримати по одному елементу масива useState(0)
   // console.log(likes); // Наше введене значеня стану
   // console.log(setLikes); // Функція зміну стану

   function increment() {
      setLikes(likes + 1);
   }
   function decrement() {
      setLikes(likes - 1);
   }

   return (
      <div>
         <h1>{likes}</h1>
         <button onClick={increment}>Increment</button>
         <button onClick={decrement}>Decrement</button>
      </div>
   );
};

export default Counter;

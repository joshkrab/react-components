import React, { useState, useRef } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import './styles/App.css';

function App() {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Text in input');
   // Створюємо стан для постів:
   const [posts, setPosts] = useState([
      { id: 1, title: 'javaScript', body: 'description' },
      { id: 2, title: 'javaScript 2', body: 'description' },
      { id: 3, title: 'javaScript 3', body: 'description' },
      { id: 4, title: 'javaScript 4', body: 'description' },
   ]);
   const [posts2, setPosts2] = useState([
      { id: 1, title: 'Python', body: 'description' },
      { id: 2, title: 'Python 2', body: 'description' },
      { id: 3, title: 'Python 3', body: 'description' },
      { id: 4, title: 'Python 4', body: 'description' },
   ]);

   // Створюємо стан і функцію для додавання постів:
   const [title, setTitle] = useState('');
   const bodyInputRef = useRef(); // Хук звертається до ДОМ елемента

   // Створюємо стан для другого інпута:
   const [body, setBody] = useState('');
   const addNewPost = (event) => {
      event.preventDefault();
      console.log(title);
      console.log(bodyInputRef.current.value);
      console.log(body);
   };

   return (
      <div className="app">
         {/* Виведення змінної: */}
         <h1>{value}</h1>
         <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
         />

         {/* При введенні назви компонента в < /> має само імпортувати компонент: */}
         <Counter />
         {/* Компоненти можна дублювати скільки треба, та вони будуть незалежні */}
         {/* <Counter /> */}
         <ClassCounter />

         <PostList posts={posts} title="Пости про JS" />
         <form>
            {/* Керований компонент та двобічне зв'язування*/}
            <MyInput
               onChange={(event) => setTitle(event.target.value)}
               type="text"
               placeholder="Назва поста"
               value={title}
            />
            {/* Некерований компонент: */}
            <MyInput ref={bodyInputRef} type="text" placeholder="Опис поста" />

            {/* Але все ж таки залишаємо його керованим */}
            <MyInput
               type="text"
               placeholder="Опис поста"
               value={body}
               onChange={(event) => setBody(event.target.value)}
            />

            <MyButton onClick={addNewPost}>Створити пост</MyButton>
         </form>
         <PostList posts={posts2} title="Пости про Python" />
      </div>
   );
}
export default App;

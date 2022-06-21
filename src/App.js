import React, { useState } from 'react';
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

   // Створюємо стан для першого інпуту:
   // const [title, setTitle] = useState('');

   // Для другого інпуту приклад іншого хука:
   // const bodyInputRef = useRef(); // Хук звертається до ДОМ елемента якось по адресі

   // Створюємо стан для третього інпута:
   // const [body, setBody] = useState('');

   // Створюємо стан одразу для усіх інпутів:
   const [post, setPost] = useState({ title: '', body: '' });

   // Функція додавання поста:
   const addNewPost = (event) => {
      event.preventDefault();

      // Додаємо пост в кінець існуючого масиву постів та додаємо унікальний id(дату в мілісекундах):
      setPosts2([...posts2, { ...post, id: Date.now() }]);
      setPost({ title: '', body: '' });
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
         <button
            onClick={(e) => {
               e.preventDefault();
               setPosts(posts);
            }}
         >
            Add Js Post
         </button>

         {/* Форма додавання --------------------------------------------------------------------- */}
         <form>
            {/* Керований компонент та двобічне зв'язування*/}
            <MyInput
               // Тепер ми приймаємо весь об'єкт, та перезаписуємо/додаємо конкретну властивість:
               // Тобто змінюємо потрібну властивість, а весь об'єкт залишаємо як був
               onChange={(event) =>
                  setPost({ ...post, title: event.target.value })
               }
               type="text"
               placeholder="Назва поста"
               value={post.title}
            />

            {/* Некерований компонент: */}
            {/* <MyInput ref={bodyInputRef} type="text" placeholder="Опис поста" /> */}

            {/* Але все ж таки залишаємо його керованим */}
            <MyInput
               type="text"
               placeholder="Опис поста"
               value={post.body}
               onChange={(event) =>
                  setPost({ ...post, body: event.target.value })
               }
            />

            <MyButton onClick={addNewPost}>Додати пост</MyButton>
         </form>
         <PostList posts={posts2} title="Пости про Python" />
      </div>
   );
}
export default App;

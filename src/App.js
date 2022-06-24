import React, { useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MySelect from './components/UI/select/MySelect';
import './styles/App.css';

function App() {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Text in input');

   // Створюємо стани для постів:
   const [posts, setPosts] = useState([
      { id: 1, title: 'javaScript', body: 'description' },
      { id: 2, title: 'javaScript 2', body: 'description' },
   ]);

   const [posts2, setPosts2] = useState([
      { id: 1, title: 'Python 1', body: 'description 56' },
      { id: 2, title: 'Python 2', body: 'description 55' },
      { id: 3, title: 'Python 3', body: 'description 54' },
      { id: 4, title: 'Python 4', body: 'description 53' },
   ]);

   // Створюємо стан для першого інпуту:
   // const [title, setTitle] = useState('');

   // Для другого інпуту приклад іншого хука:
   // const bodyInputRef = useRef(); // Хук звертається до ДОМ елемента якось по адресі

   // Створюємо стан для третього інпута:
   // const [body, setBody] = useState('');

   const createPost = (newPost) => {
      setPosts2([...posts2, newPost]);
   };

   const removePost = (post) => {
      // .filter() - повертає новий масив по заданій умові:
      setPosts2(posts2.filter((p) => p.id !== post.id));
   };

   // Створюємо стан для сортування:
   const [selectedSort, setSelectedSort] = useState('');
   // Функція сортування:
   const sortPosts = (sort) => {
      // sort повертає event.target.value, тобто рядок 'title' або 'body'

      setSelectedSort(sort); // Записали в стан 'title' або 'body'

      // Функція .sort() не повертає масив, а мутує поточний, а стан напряму змінювати не можна
      // Тому розвертаємо пости в новий масив та сортуємо вже його
      // Тобто ми змінюємо копію масива, а не стан напряму
      // Функція .sort() приймає аргументами два елемента масива

      // .localeCompare() - порівняння рядків, повертає число по якому сортує
      setPosts2([...posts2].sort((a, b) => a[sort].localeCompare(b[sort])));
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
         <hr style={{ margin: '15px 0' }} />

         {/* Форма додавання --------------------------------------------------------------------- */}
         <PostForm create={createPost} />
         <hr style={{ margin: '15px 0' }} />
         <MySelect
            defaultValue={'Сортування'}
            options={[
               { value: 'title', name: 'По назві' },
               { value: 'body', name: 'По опису' },
            ]}
            value={selectedSort} // Записуємо в стан 'title' або 'body'
            onChange={sortPosts}
         />

         {/* Додаємо умову, якщо є масив, тоді малюємо компонент, інакше повідомлення */}
         {posts2.length ? (
            <PostList
               // Передаємо функцію як посилання, беж дужок ()
               remove={removePost}
               posts={posts2}
               title="Пости про Python"
            />
         ) : (
            <h2 style={{ textAlign: 'center' }}>Пости не знайдені!</h2>
         )}
      </div>
   );
}
export default App;

import React, { useState } from 'react';
// import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';
import axios from 'axios';

function App() {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Text in input');

   // Створюємо стани для постів:
   // const [posts, setPosts] = useState([
   //    { id: 1, title: 'javaScript', body: 'description' },
   //    { id: 2, title: 'javaScript 2', body: 'description' },
   // ]);

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
      setModal(false);
   };

   async function fetchPosts() {
      // Записуємо в змінну результат запиту:
      // GET запит на отримання даних:
      const response = await axios.get(
         'https://jsonplaceholder.typicode.com/posts'
      );
      setPosts2(response.data);
   }

   const removePost = (post) => {
      // .filter() - повертає новий масив по заданій умові:
      setPosts2(posts2.filter((p) => p.id !== post.id));
   };

   // Створюємо стан для сортування: ------------------------------------------------------------------------------------------------
   // const [selectedSort, setSelectedSort] = useState(''); // Перенесли в filter

   // Замість двох станів searchQuery та selectedSort створюємо один загальний:
   const [filter, setFilter] = useState({ sort: '', query: '' });

   // Створюємо стан для відображення модального вікна:
   const [modal, setModal] = useState(false);

   // Функція сортування: тепер ми просто записуємо значення в стан - вже не потрібна, використовуючи стан filter
   //const sortPosts = (sort) => {
   // sort повертає event.target.value, тобто рядок 'title' або 'body'
   // setSelectedSort(sort); // Записали в стан 'title' або 'body'

   // Функція .sort() не повертає масив, а мутує поточний, а стан напряму змінювати не можна
   // Тому розвертаємо пости в новий масив ([...posts2].) та сортуємо вже його
   // Тобто ми змінюємо копію масива, а не стан напряму
   // Функція .sort() приймає аргументами два елемента масива

   // .localeCompare() - порівняння рядків, повертає число по якому сортує
   // setPosts2([...posts2].sort((a, b) => a[sort].localeCompare(b[sort]))); - перенесли в константу вище
   // };

   // ---------------- Пошук ----------------------------------------------------------------------------------------------------
   // Стан для пошуку:
   // const [searchQuery, setSearchQuery] = useState(''); // Перенесли в filter
   // function search(value) {
   //    setSearchQuery(value);
   //    console.log(searchQuery);
   // }

   // Створюємо нову змінну після перенесення фільтрації та сортування в наш хук usePosts
   const sortAndSearchPosts = usePosts(posts2, filter.sort, filter.query);

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
         {/* <ClassCounter /> */}

         {/* <PostList posts={posts} title="Пости про JS" />
         <button onClick={(e) => {
               e.preventDefault();
               setPosts(posts);
            }}> Add Js Post </button> */}

         <hr style={{ margin: '15px 0' }} />
         <button onClick={fetchPosts}>GET POSTS</button>
         <MyButton onClick={() => setModal(true)}>Додати пост</MyButton>

         <MyModal visible={modal} setVisible={setModal}>
            {/* Форма додавання постів --------------------------------------------------------------------------------------------- */}
            <PostForm create={createPost} />
         </MyModal>

         {/* <hr style={{ margin: '15px 0' }} /> */}

         {/* Компонент сортування та інпут фільтрації */}
         <PostFilter filter={filter} setFilter={setFilter} />

         {/* Компонент малювання постів */}
         <PostList
            // Передаємо функцію як посилання, беж дужок ()
            remove={removePost}
            // Малює миттєво вже отсортований масив, або селектом або пошуком
            posts={sortAndSearchPosts}
            title="Пости про Python"
         />
      </div>
   );
}
export default App;

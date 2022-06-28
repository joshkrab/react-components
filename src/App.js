import React, { useMemo, useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyInput from './components/UI/input/MyInput';
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

   // Створюємо стан для сортування: ------------------------------------------------------------------------------------------------
   const [selectedSort, setSelectedSort] = useState('');

   const sortedPosts = useMemo(() => {
      console.log('ВІДПРАЦЮВАЛА ФУНКЦІЯ СОРТУВАННЯ');
      // Якщо вже є цей стан - не пустий рядок за замовчуванням, то повертаємо відсортирований масив
      if (selectedSort) {
         return [...posts2].sort((a, b) =>
            a[selectedSort].localeCompare(b[selectedSort])
         );
      }
      // Або звичайний первичний масив стан:
      return posts2;
      // Перезаписуємо сортування в масив при зміні цих змінних:
   }, [selectedSort, posts2]);

   // Функція сортування: тепер ми просто записуємо значення в стан
   const sortPosts = (sort) => {
      // sort повертає event.target.value, тобто рядок 'title' або 'body'
      setSelectedSort(sort); // Записали в стан 'title' або 'body'

      // Функція .sort() не повертає масив, а мутує поточний, а стан напряму змінювати не можна
      // Тому розвертаємо пости в новий масив ([...posts2].) та сортуємо вже його
      // Тобто ми змінюємо копію масива, а не стан напряму
      // Функція .sort() приймає аргументами два елемента масива

      // .localeCompare() - порівняння рядків, повертає число по якому сортує
      // setPosts2([...posts2].sort((a, b) => a[sort].localeCompare(b[sort]))); - перенесли в константу вище
   };

   // ---------------- Пошук ----------------------------------------------------------------------------------------------------
   // Стан для пошуку:
   const [searchQuery, setSearchQuery] = useState('');
   // function search(value) {
   //    setSearchQuery(value);
   //    console.log(searchQuery);
   // }

   const sortAndSearchPosts = useMemo(() => {
      // По пошуковому рядку ми фільтруємо масив
      return sortedPosts.filter((post) =>
         post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
   }, [searchQuery, sortedPosts]);

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

         {/* Інпут для пошуку --------------------------------------------------------------------- */}
         <MyInput
            value={searchQuery}
            // При зміні записуємо в стан, а при зміні стану записуємо новий масив для PostList в sortAndSearchPosts
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Пошук..."
         />

         <MySelect
            defaultValue={'Сортування'}
            // Подаємо опції для малювання опцій тегами методом map
            options={[
               { value: 'title', name: 'По назві' },
               { value: 'body', name: 'По опису' },
            ]}
            value={selectedSort} // Записуємо в стан 'title' або 'body'
            onChange={sortPosts} // Передаємо як посилання в компонент, і звідти запускаємо тут :)
         />

         {/* Додаємо умову, якщо є масив, тоді малюємо компонент, інакше повідомлення */}
         {sortAndSearchPosts.length ? (
            <PostList
               // Передаємо функцію як посилання, беж дужок ()
               remove={removePost}
               posts={sortAndSearchPosts}
               title="Пости про Python"
            />
         ) : (
            <h2 style={{ textAlign: 'center' }}>Пости не знайдені!</h2>
         )}
      </div>
   );
}
export default App;

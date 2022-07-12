import React, { useEffect, useState } from 'react';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
   // Створюємо стани для постів:
   // const [posts, setPosts] = useState([
   //    { id: 1, title: 'javaScript', body: 'description' },
   //    { id: 2, title: 'javaScript 2', body: 'description' },
   // ]);

   const [posts2, setPosts2] = useState([]);
   //    { id: 1, title: 'Python 1', body: 'description 56' },
   //    { id: 2, title: 'Python 2', body: 'description 55' },
   //    { id: 3, title: 'Python 3', body: 'description 54' },
   //    { id: 4, title: 'Python 4', body: 'description 53' },
   // ]);

   // Створюємо стан для оформлення загрузки постів, крутілку тощо...
   // const [isPostLoading, setIsPostLoading] = useState(false); - переписали в хук

   // Створюємо стан для першого інпуту:
   // const [title, setTitle] = useState('');

   // Для другого інпуту приклад іншого хука:
   // const bodyInputRef = useRef(); // Хук звертається до ДОМ елемента якось по адресі

   // Створюємо стан для третього інпута:
   // const [body, setBody] = useState('');

   const createPost = (newPost) => {
      newPost.id = posts2[posts2.length - 1].id + 1;
      setPosts2([...posts2, newPost]);
      setModal(false);
   };

   // По натисканню на кнопку ми записуємо в стан постів по фетч запиту:  - перенесли в хук
   //  async function fetchPosts() {
   // setIsPostLoading(true);

   // Записуємо в змінну результат запиту:
   // GET запит на отримання даних:

   // setTimeout(async () => {
   //    const posts = await PostService.getAll();
   //    setPosts2(posts);
   //    setIsPostLoading(false);
   // }, 2000);
   // }

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

   // Створюємо стани для кількості постів та сторінок:
   const [totalPages, setTotalPages] = useState(0);
   const [limit, setLimit] = useState(5);
   // const limit = 10;
   const [page, setPage] = useState(1);

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

   // Отримуємо останній елемент для скрола - адресу записуємо в константу:
   //const lastElement = useRef();

   // Визиваємо наш хук, та передаємо в нього колбек функцію:
   // В цей масив змінних, запишеться масив з 3х елементів, який поверне функція.
   const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);

      // Переробили для дозавантаження постів при скролі:
      setPosts2(response.data);
      // setPosts2([...posts2, ...response.data]);
      const totaLCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totaLCount, limit));
      console.log('Записали фетч');
   });

   // Визиваємо хук для дозавантаження постів при скролі: ---------------------------------------------------------------------------------------------------
   // useObserver(lastElement, page < totalPages, isPostLoading, () => {
   //    setPage(page + 1);
   // });

   useEffect(() => {
      console.log('Почалося завантаження постів');
      fetchPosts();
   }, [page, limit]);

   // Функція зміни сторінки:
   const changePage = (page) => {
      setPage(page);
   };

   return (
      <div className="app">
         {/* Виведення змінної: */}
         {/* <h1>{value}</h1>
         <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
         /> */}
         {/* При введенні назви компонента в < /> має само імпортувати компонент: */}
         {/* <Counter /> */}
         {/* Компоненти можна дублювати скільки треба, та вони будуть незалежні */}
         {/* <Counter /> */}
         {/* <ClassCounter /> */}
         {/* <PostList posts={posts} title="Пости про JS" />
         <button onClick={(e) => {
               e.preventDefault();
               setPosts(posts);
            }}> Add Js Post </button> */}

         {/* <hr style={{ margin: '15px 0' }} /> */}
         <div className="getposts__body" style={{ margin: '15px 0' }}>
            <p>Якщо пости не завантажилися - натисни:</p>
            <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
         </div>
         <hr style={{ margin: '15px 0' }} />

         <MyButton onClick={() => setModal(true)}>Додати пост</MyButton>
         {/* <Pagination
            totalPages={totalPages}
            page={page}
            changePage={changePage}
         /> */}

         <MyModal visible={modal} setVisible={setModal}>
            {/* Форма додавання постів --------------------------------------------------------------------------------------------- */}
            <PostForm create={createPost} />
         </MyModal>
         {/* <hr style={{ margin: '15px 0' }} /> */}
         {/* Компонент сортування та інпут фільтрації */}
         <PostFilter filter={filter} setFilter={setFilter} />
         <p style={{ marginTop: '20px' }}>Кількість елементів на сторінці:</p>
         {/* Додаємо селект ліміта постів */}
         <MySelect
            value={limit}
            onChange={(value) => setLimit(value)}
            defaultValue="page limit"
            options={[
               { value: 5, name: '5' },
               { value: 10, name: '10' },
               { value: 20, name: '20' },
               { value: 100, name: 'Show all' },
            ]}
         />

         {/* Умова перевірки на помилку: */}
         {postError && <h1>Сталася помилка: {postError}</h1>}

         {/* Додаємо умову малювання крутілкі завантаження */}
         {isPostLoading && <Loader />}
         <Pagination
            totalPages={totalPages}
            page={page}
            changePage={changePage}
         />
         {/* Компонент малювання постів */}
         <PostList
            // Передаємо функцію як посилання, беж дужок ()
            remove={removePost}
            // Малює миттєво вже отсортований масив, або селектом або пошуком
            posts={sortAndSearchPosts}
            title="Пости про JavaScript"
         />
         {/* <div
            ref={lastElement}
            style={{ height: 20, background: 'rgb(255, 246, 246)' }}
         ></div> */}

         <Pagination
            totalPages={totalPages}
            page={page}
            changePage={changePage}
         />
      </div>
   );
}
export default Posts;

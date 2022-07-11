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
import { useRef } from 'react';
import { useObserver } from '../hooks/useObserver';

function PostsScroll() {
   const [posts2, setPosts2] = useState([]);

   const createPost = (newPost) => {
      newPost.id = posts2.length + 1;
      setPosts2([...posts2, newPost]);
      setModal(false);
   };

   const removePost = (post) => {
      // .filter() - повертає новий масив по заданій умові:
      setPosts2(posts2.filter((p) => p.id !== post.id));
   };

   // Замість двох станів searchQuery та selectedSort створюємо один загальний:
   const [filter, setFilter] = useState({ sort: '', query: '' });

   // Створюємо стан для відображення модального вікна:
   const [modal, setModal] = useState(false);

   // Створюємо стани для кількості постів та сторінок:
   const [totalPages, setTotalPages] = useState(0);
   // const [limit, setLimit] = useState(5);
   const limit = 8;
   const [page, setPage] = useState(1);

   // Створюємо нову змінну після перенесення фільтрації та сортування в наш хук usePosts
   const sortAndSearchPosts = usePosts(posts2, filter.sort, filter.query);

   // Отримуємо останній елемент для скрола - адресу записуємо в константу:
   const lastElement = useRef();

   // Визиваємо наш хук, та передаємо в нього колбек функцію:
   // В цей масив змінних, запишеться масив з 3х елементів, який поверне функція.
   const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
      const response = await PostService.getAll(limit, page);

      // Переробили для дозавантаження постів при скролі:
      // setPosts2(response.data);
      setPosts2([...posts2, ...response.data]);
      const totaLCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totaLCount, limit));
      console.log('Записали фетч');
   });

   // Визиваємо хук для дозавантаження постів при скролі: ---------------------------------------------------------------------------------------------------
   useObserver(lastElement, page < totalPages, isPostLoading, () => {
      setPage(page + 1);
   });

   useEffect(() => {
      console.log('Почалося завантаження постів');
      fetchPosts();
   }, [page]);

   return (
      <div className="app">
         <hr style={{ margin: '15px 0' }} />
         <button onClick={fetchPosts}>GET POSTS</button>
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

         {/* Додаємо селект ліміта постів */}
         {/* <MySelect
            value={limit}
            onChange={(value) => setLimit(value)}
            defaultValue="Кількість елементів на сторінці"
            options={[
               { value: 5, name: '5' },
               { value: 10, name: '10' },
               { value: 20, name: '20' },
               { value: -1, name: 'Show all' },
            ]}
         /> */}

         {/* Умова перевірки на помилку: */}
         {postError && <h1>Сталася помилка: {postError}</h1>}

         {/* Додаємо умову малювання крутілкі завантаження */}
         {isPostLoading && <Loader />}

         {/* Компонент малювання постів */}
         <PostList
            // Передаємо функцію як посилання, беж дужок ()
            remove={removePost}
            // Малює миттєво вже отсортований масив, або селектом або пошуком
            posts={sortAndSearchPosts}
            title="Пости про Python"
         />
         <div
            ref={lastElement}
            style={{ height: 20, background: 'rgb(255, 246, 246)' }}
         ></div>

         {/* <Pagination
            totalPages={totalPages}
            page={page}
            changePage={changePage}
         /> */}
      </div>
   );
}
export default PostsScroll;

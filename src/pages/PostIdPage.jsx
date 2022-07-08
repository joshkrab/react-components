// rfc
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
   const params = useParams();

   // Цей параметр ми називаємо в адресі компонента Route path="posts/:id"
   // А назначаємо йому значення при визові onClick={() => router(`/posts/${props.post.id}`)}

   // Створюємо стан куди сервер буде записувати наш пост:
   const [post, setPost] = useState({});
   // Стан для коментів:
   const [comments, setComments] = useState([]);

   // Записуємо ще змінні для запиту коментів до посту:
   const [fetchComments, isComentLoading, comError] = useFetching(async () => {
      const response = await PostService.getComment(params.id);
      setComments(response.data);
      console.log(comments);
      console.log(response.data);
   });

   // Записуємо константу, використовуючи наш хук, який поверне 3 параметра:
   const [fetchPostById, isLoading, error] = useFetching(async () => {
      const response = await PostService.getById(params.id);
      setPost(response.data);
      console.log(post);
   });

   // Отримуємо дані на перше малювання компонента:
   useEffect(() => {
      fetchPostById(); // Визиваємо функцію, яку повертає наш хук, по суті це: await PostService.getById(params.id);
      // тільки з обробкою помилок, та записом повідомлення помилки, та зміна стану тру/фолс для крутілки
      fetchComments();
   }, []);

   return (
      <div>
         <h1>Ви потрапили на сторінку поста з id: {params.id}</h1>

         {error && <h1>Сталася помилка: {error}</h1>}
         {isLoading ? (
            <Loader />
         ) : (
            <div>
               <h1>
                  Пост №{post.id}. {post.title}
               </h1>
               <p>{post.body}</p>
            </div>
         )}
         <h2>Comments:</h2>
         {comError && <h1>Сталася помилка: {comError}</h1>}
         {isComentLoading ? (
            <Loader />
         ) : (
            <div>
               {comments.map((com) => (
                  <div key={com.id} style={{ marginTop: 12 }}>
                     <h2>{com.email}</h2>
                     <p>{com.body}</p>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default PostIdPage;

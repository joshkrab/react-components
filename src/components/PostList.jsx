// rfc
import React from 'react';
import PostItem from './PostItem';

const PostList = ({ remove, posts, title }) => {
   //  Додаємо умову, якщо є масив, тоді малюємо компонент, інакше повідомлення:
   if (!posts.length) {
      return <h2 style={{ textAlign: 'center' }}>Пости не знайдені!</h2>;
   }
   return (
      <div>
         {/* Робота зі стилями: */}
         {/* <PostItem post={{ id: 1, title: 'javaScript', body: 'description' }} /> */}
         <h1 style={{ textAlign: 'center' }}>{title}</h1>

         {/* Тепер створюємо новий масив з масива наших пропсів: */}
         {posts.map((post, index) => (
            <PostItem
               remove={remove}
               number={index + 1}
               post={post}
               key={post.id}
            />
         ))}
      </div>
   );
};

export default PostList;

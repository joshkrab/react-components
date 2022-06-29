// rfc
import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

         {/* Завертаємо наш список постів в компонент TransitionGroup для анімації */}
         <TransitionGroup>
            {/* Тепер створюємо новий масив з масива наших пропсів: */}
            {posts.map((post, index) => (
               <CSSTransition key={post.id} timeout={500} classNames="post">
                  <PostItem remove={remove} number={index + 1} post={post} />
               </CSSTransition>
            ))}
         </TransitionGroup>
      </div>
   );
};

export default PostList;

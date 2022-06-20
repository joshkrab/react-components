// rfc
import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, title }) => {
   return (
      <div>
         {/* Робота зі стилями: */}
         {/* <PostItem post={{ id: 1, title: 'javaScript', body: 'description' }} /> */}
         <h1 style={{ textAlign: 'center' }}>{title}</h1>
         {/* Тепер створюємо новий масив з масива наших пропсів: */}
         {posts.map((post) => (
            <PostItem post={post} key={post.id} />
         ))}
      </div>
   );
};

export default PostList;

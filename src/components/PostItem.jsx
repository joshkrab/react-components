// rfc
import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
   // console.log(props);
   return (
      <div className="post">
         <div className="post__content">
            <strong style={{ fontSize: '20px', fontWeight: '800' }}>
               {props.number}.{props.post.title}
            </strong>
            <div>{props.post.body}</div>
         </div>
         <div className="post__btns">
            <MyButton onClick={() => props.remove(props.post)}>
               Видалити
            </MyButton>
         </div>
      </div>
   );
};

export default PostItem;

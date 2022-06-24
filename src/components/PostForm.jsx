// rfc
import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
   // Створюємо стан одразу для усіх інпутів:
   const [post, setPost] = useState({ title: '', body: '' });

   // Функція додавання поста:
   const addNewPost = (event) => {
      event.preventDefault();

      // Додаємо пост в кінець існуючого масиву постів та додаємо унікальний id(дату в мілісекундах):
      // setPosts2([...posts2, { ...post, id: Date.now() }]); - переписали це по іншому:
      const newPost = { ...post, id: Date.now() };

      // Визиваємо функцію з пропсів, що ми отримали в аргументі, та передаємо туди новий пост:
      create(newPost);
      // Та очищаємо наші інпути:
      setPost({ title: '', body: '' });
   };

   return (
      <form>
         {/* Керований компонент та двобічне зв'язування*/}
         <MyInput
            // Тепер ми приймаємо весь об'єкт, та перезаписуємо/додаємо конкретну властивість:
            // Тобто змінюємо потрібну властивість, а весь об'єкт залишаємо як був
            onChange={(event) =>
               setPost({ ...post, title: event.target.value })
            }
            type="text"
            placeholder="Назва поста"
            value={post.title}
         />

         {/* Некерований компонент: */}
         {/* <MyInput ref={bodyInputRef} type="text" placeholder="Опис поста" /> */}

         {/* Але все ж таки залишаємо його керованим */}
         <MyInput
            type="text"
            placeholder="Опис поста"
            value={post.body}
            onChange={(event) => setPost({ ...post, body: event.target.value })}
         />

         <MyButton onClick={addNewPost}>Додати пост</MyButton>
      </form>
   );
};

export default PostForm;

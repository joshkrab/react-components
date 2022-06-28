// rfc
import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostFilter = ({ filter, setFilter }) => {
   return (
      <div>
         {/* Інпут для пошуку --------------------------------------------------------------------- */}
         <MyInput
            value={filter.query}
            // При зміні записуємо в стан, тільки необхідне, залишаючи інше поле:
            onChange={(event) =>
               setFilter({ ...filter, query: event.target.value })
            }
            placeholder="Пошук..."
         />

         <MySelect
            defaultValue={'Сортування'}
            // Подаємо опції для малювання опцій тегами методом map
            options={[
               { value: 'title', name: 'По назві' },
               { value: 'body', name: 'По опису' },
            ]}
            value={filter.sort} // Записуємо в стан 'title' або 'body'
            onChange={(targetValue) =>
               setFilter({ ...filter, sort: targetValue })
            } // Передаємо як посилання в компонент, і звідти запускаємо тут :)
         />
      </div>
   );
};

export default PostFilter;

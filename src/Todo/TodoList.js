// Отримуючи чистий файл, ми його перетворюємо в реакт файл:
import React from 'react';
import TodoItem from './TodoItem';

const styles = {
   ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
   },
};

// Та потім потрібно експортувати: функцію в реакті пишемо з великох літери
// Додали аргумент, щоб прийняти масив з TodoItem.js
export default function TodoList(props) {
   return (
      <ul style={styles.ul}>
         {/* <li>1</li>
         <li>2</li>
         <TodoItem /> */}
         {/* Замість цього пишемо цикл на жс */}
         {props.todos.map((todo, index) => {
            return (
               <TodoItem
                  todo={todo}
                  key={todo.id}
                  index={index}
                  onChange={props.onToggle}
               />
            );
         })}
      </ul>
   );
}

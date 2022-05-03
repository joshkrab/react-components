import React from 'react';
// Встановили: npm install prop-types для якойсь валідації та імпортуємо цю бібліотеку:
// import PropTypes from 'prop-types';

const styles = {
   li: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '.5rem 1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '.5rem',
   },
   input: {
      marginRight: '1rem',
   },
};

export default function TodoItem({ todo, index, onChange }) {
   console.log('todo', todo);
   return (
      <li style={styles.li}>
         <span>
            <input
               style={styles.input}
               type="checkbox"
               // Подія:
               onChange={() => onChange(todo.id)}
            />
            <strong>{index + 1}</strong>
            {/* Просто хтмл сімвол пробілу: */}
            &nbsp;
            {todo.title}
         </span>
         <button className="rm">&times;</button>
      </li>
   );
}

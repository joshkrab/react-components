import React from 'react';
import TodoList from './Todo/TodoList';

function App() {
   // Додавання динамічності
   let todos = [
      { id: 1, completed: false, title: 'Купити хліб' },
      { id: 2, completed: false, title: 'Купити масло' },
      { id: 3, completed: false, title: 'Купити молоко' },
   ];

   function toggleTodo(id) {
      console.log('todo id', id);
      todos = todos.map((todo) => {
         if (todo.id === id) {
            todo.completed = !todo.completed;
         }
         return todo;
      });
   }

   return (
      <div className="wrapper">
         <h1>React Hello!</h1>

         {/* Відобразити масив в компоненті TodoList: позначити яку властивість приймаємо */}
         <TodoList todos={todos} onToggle={toggleTodo} />
      </div>
   );
}

export default App;

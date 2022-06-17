import React, { useState } from 'react';
import ClassCounter from './components/ClassCounter';
import Counter from './components/Counter';

function App() {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Text in input');

   return (
      <div className="app">
         {/* Виведення змінної: */}
         <h1>{value}</h1>
         <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
         />

         {/* При введенні назви компонента в < /> має само імпортувати компонент: */}
         <Counter />
         {/* Компоненти можна дублювати скільки треба, та вони будуть незалежні */}
         <Counter />

         <ClassCounter />
      </div>
   );
}
export default App;

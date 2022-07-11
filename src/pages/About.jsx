// rfc
import React, { useState } from 'react';
import Counter from '../components/Counter';

const About = () => {
   // Створюємо стан для інпуту:
   const [value, setValue] = useState('Text in input');

   return (
      <div>
         <h1>Сторінка About</h1>
         {/* Виведення змінної: */}
         <h1>{value}</h1>
         <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
         />
         {/* При введенні назви компонента в < /> має само імпортувати компонент: */}
         <Counter />
      </div>
   );
};

export default About;

import { useState } from 'react';

export const useFetching = (callback) => {
   // В аргумент додаємо запит, перед яким показати крутілку, а після забрати
   const [isLoading, setIsLoading] = useState(false);
   // Стан для обробника помилок:
   const [error, setError] = useState('');

   // Створюємо функцію запиту:
   const fetching = async () => {
      try {
         setIsLoading(true);
         await callback();
      } catch (error) {
         setError(error.message);
      } finally {
         setIsLoading(false);
      }
   };

   return [fetching, isLoading, error];
};

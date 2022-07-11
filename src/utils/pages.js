import { useMemo } from 'react';

export const getPageCount = (totalCount, limit) => {
   // Округляємо в більший бік:
   return Math.ceil(totalCount / limit);
};

export const usePages = (totalPages) => {
   // Будуємо масив від одного до 10 (totalPages)
   const pageArray = useMemo(() => {
      let array = [];
      for (let index = 0; index < totalPages; index++) {
         array.push(index + 1);
      }

      return array;
   }, [totalPages]);

   if (totalPages) {
      // console.log('Масив номерів сторінок: ' + pageArray);
   }
   return pageArray;
};

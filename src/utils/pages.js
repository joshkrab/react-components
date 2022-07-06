export const getPageCount = (totalCount, limit) => {
   // Округляємо в більший бік:
   return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {
   // Будуємо масив від одного до 10 (totalPages)
   let array = [];
   for (let index = 0; index < totalPages; index++) {
      array.push(index + 1);
   }
   console.log(array);
   return array;
};

import { useMemo } from 'react';

// В аргументи приймаємо пости та метод сортування
export const useSortedPosts = (posts, sort) => {
   const sortedPosts = useMemo(() => {
      console.log('ВІДПРАЦЮВАЛА ФУНКЦІЯ СОРТУВАННЯ');
      // Якщо вже є цей стан - не пустий рядок за замовчуванням, то повертаємо відсортирований масив
      if (sort) {
         return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
      }
      // Або звичайний первичний масив стан:
      return posts;
      // Перезаписуємо сортування в масив при зміні цих змінних:
   }, [sort, posts]);

   return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
   // Використовуємо хук вище:
   const sortedPosts = useSortedPosts(posts, sort);

   const sortAndSearchPosts = useMemo(() => {
      // По пошуковому рядку ми фільтруємо масив
      return sortedPosts.filter((post) =>
         post.title.toLowerCase().includes(query.toLowerCase())
      );
      // Перезаписує масив при зміні цих змінних:
   }, [query, sortedPosts]);

   return sortAndSearchPosts;
};

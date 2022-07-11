import { useRef, useEffect } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
   const observer = useRef();

   // Спрацює при завантаженні компонента, але дочекається коли завантажаться пости, реагує на isLoading
   useEffect(() => {
      // isLoading - повертає наш фетч хук, він повертає true тільки коли виконується завантаження постів
      // Тобто спостерігач спрацює тільки коли пости завантажвться
      if (isLoading) {
         return;
      }
      // Якщо спостерігач вже створений, то треба відключити в поточний момент:
      if (observer.current) {
         observer.current.disconnect();
      }
      let callB = function (entries, observer) {
         // entries - масив елементів стеження, в нашому випадку він один
         // Перевірка чи він у зоні видимості, або спрацьовує двічі (також при хованні):
         if (entries[0].isIntersecting && canLoad) {
            console.log('Дів у зоні бачення');
            callback(); // збільшує page на 1
         }
      };

      // записуємо спостеригач в адресу змінної useRef(), в дужках функція яка виконається:
      observer.current = new IntersectionObserver(callB);
      // та показуємо за яким елементом стеження:
      observer.current.observe(ref.current);
   }, [isLoading]); // Відреагую на завантаження постів, та спрацює useEffect
};

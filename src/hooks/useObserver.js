import { useRef, useEffect } from 'react';

export const useObserver = (ref, canLoad, isLoading, callback) => {
   const observer = useRef();
   useEffect(() => {
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
            callback();
         }
      };

      // записуємо спостеригач в адресу змінної useRef():
      observer.current = new IntersectionObserver(callB);
      // та показуємо за яким елементом стеження:
      observer.current.observe(ref.current);
   }, [isLoading]);
};

import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/navbar/Navbar';
import { AuthContext } from './context';
import './styles/App.css';

function App() {
   // Стан для зміннох авторизації:
   const [isAuth, setIsAuth] = useState(false);
   // Стад для перевірки, чи завантажен запит на сервер - в нашому випадку час на відповідь з локал-сторедж
   const [isLoading, setIsLoading] = useState(true);

   // Перевіряємо стан в локал-сторедж, при завантаженні компонента:
   useEffect(() => {
      console.log(localStorage);
      console.log(localStorage.getItem('auth'));
      if (localStorage.getItem('auth')) {
         setIsAuth(true);
      }
      setIsLoading(false);
   }, []);

   return (
      // Огорнули усе в контекст, та передали наші змінні туди у пропси
      <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
         <BrowserRouter>
            <Navbar />
            <AppRouter />
         </BrowserRouter>
      </AuthContext.Provider>
   );
}
export default App;

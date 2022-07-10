// rfc
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context';
// import Login from '../pages/Login';
import { privateRoutes, publicRoutes } from '../router/routes';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
   // Змінна чи авторизован юзер:
   const { isAuth, isLoading } = useContext(AuthContext);
   console.log(isAuth);

   if (isLoading) {
      return <Loader />;
   }
   return (
      <Routes>
         {/* <Route path="about" element={<About />}></Route>
         <Route exact path="posts" element={<Posts />}></Route>
         <Route exact path="posts/:id" element={<PostIdPage />}></Route> */}

         {isAuth
            ? privateRoutes.map((route) => (
                 <Route
                    exact={route.exact}
                    element={<route.component />}
                    path={route.path}
                    key={route.path}
                 ></Route>
              ))
            : publicRoutes.map((route) => (
                 <Route
                    exact={route.exact}
                    element={<route.component />}
                    path={route.path}
                    key={route.path}
                 ></Route>
              ))}
         {/* <Route path="*" element={<Login />}></Route> */}
      </Routes>
   );
};

export default AppRouter;

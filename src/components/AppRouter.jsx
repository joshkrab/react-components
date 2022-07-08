// rfc
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import About from '../pages/About';
import Login from '../pages/Login';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { privateRoutes, publicRoutes } from '../router/routes';

const AppRouter = () => {
   // Змінна чи авторизован юзер:
   const isAuth = true;
   return (
      <Routes>
         {/* <Route path="about" element={<About />}></Route>
         <Route exact path="posts" element={<Posts />}></Route>
         <Route exact path="posts/:id" element={<PostIdPage />}></Route> */}
         <Route path="*" element={<Login />}></Route>
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
      </Routes>
   );
};

export default AppRouter;

// rfc
import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';

const Login = () => {
   return (
      <div>
         <h1>Сторінка для логіна:</h1>
         <form>
            <MyInput type="text" placeholder="Input your login" />
            <MyInput type="password" placeholder="Input your password" />
            <MyButton>Enter</MyButton>
         </form>
      </div>
   );
};

export default Login;

import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style.css";
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import WelcomePage from './Welcome/Welcome';
import MainLogin from './MainLogin/MainLogin';
import IndexPage from './Index/Index';
import MainRegister from './MainRegister/MainRegister';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage title="Помощник поиска неисправностей" />
  },
  {
    path: "/welcome",
    element: <WelcomePage title="Добро пожаловать!" />
  },
  {
    path: "/login",
    element: <MainLogin title="Вход" />
  },
  {
    path: "/register",
    element: <MainRegister title="Регистрация" />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

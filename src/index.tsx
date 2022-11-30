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
import MainRecovery from './MainRecovery/MainRecovery';
import CommentPage from './Comment/CommentPage';
import DecisionPage from './Decision/DecisionPage';
import LikedPage from './Liked/LikedPage';
import MyPage from './My/MyPage';
import SubscribedPage from './Subscribed/SubscribedPage';
import SettingsPage from './Settings/SettingsPage';

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
  },
  {
    path: "/recovery",
    element: <MainRecovery title="Восстановление аккаунта" />
  },
  {
    path: "/comment",
    element: <CommentPage title="Добавление замечания" />
  },
  {
    path: "/decision",
    element: <DecisionPage title="Добавление решения" />
  },
  {
    path: "/liked",
    element: <LikedPage title="Полезные решения" />
  },
  {
    path: "/my",
    element: <MyPage title="Мои данные" />
  },
  {
    path: "/subscribed",
    element: <SubscribedPage title="Отслеживаемое" />
  },
  {
    path: "/settings",
    element: <SettingsPage title="Настройки" />
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

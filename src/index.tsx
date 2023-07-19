import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { dev_mode } from "./config";
import {
  Activate,
  Admin,
  Comment,
  CreateBackground,
  CreateSeries,
  CreateSystem,
  Decision,
  DeleteBackground,
  DetailComment,
  DetailDecision,
  EditSystem,
  Export,
  Index,
  Liked,
  Login,
  My,
  Profile,
  Recovery,
  Register,
  Search,
  Settings,
  Subscribed,
  System,
  Users,
  Welcome,
} from "./@pages";
import { authStore, AuthStoreContext } from "./@store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index title="Помощник поиска неисправностей" />,
  },
  {
    path: "/welcome",
    element: <Welcome title="Добро пожаловать!" />,
  },
  {
    path: "/login",
    element: <Login title="Вход" />,
  },
  {
    path: "/register",
    element: <Register title="Регистрация" />,
  },
  {
    path: "/recovery",
    element: <Recovery title="Восстановление аккаунта" />,
  },
  {
    path: "/comment",
    element: <Comment title="Добавление замечания" />,
  },
  {
    path: "/comment/:id",
    element: <DetailComment title="Замечание" />,
  },
  {
    path: "/decision",
    element: <Decision title="Добавление решения" />,
  },
  {
    path: "/decision/:id",
    element: <DetailDecision title="Решение" />,
  },
  {
    path: "/system/:id",
    element: <System title={"Информация по системе"} />,
  },
  {
    path: "/liked",
    element: <Liked title="Полезные решения" />,
  },
  {
    path: "/my",
    element: <My title="Мои данные" />,
  },
  {
    path: "/favorite",
    element: <Subscribed title="Отслеживаемое" />,
  },
  {
    path: "/subscribed",
    element: <Navigate to={"/favorite"} />,
  },
  {
    path: "/settings",
    element: <Settings title="Настройки" />,
  },
  {
    path: "/profile/:id",
    element: <Profile title={"Профиль пользователя"} />,
  },
  {
    path: "/admin",
    element: <Admin title="Управление" />,
  },
  {
    path: "/admin/series/create",
    element: <CreateSeries title="Добавление серии" />,
  },
  {
    path: "/admin/system/create",
    element: <CreateSystem title="Добавление системы" />,
  },
  {
    path: "/admin/system/edit",
    element: <EditSystem title="Изменение системы" />,
  },
  {
    path: "/admin/users",
    element: <Users title="Статистика по пользователям" />,
  },
  {
    path: "/admin/export",
    element: <Export title="Экспорт таблиц" />,
  },
  {
    path: "/admin/background/create",
    element: <CreateBackground title="Добавление фона" />,
  },
  {
    path: "/admin/background/delete",
    element: <DeleteBackground title="Удаление фона" />,
  },
  {
    path: "/activate",
    element: <Activate title="Подтвердите свой аккаунт" />,
  },
  {
    path: "/search",
    element: <Search title="Поиск" />,
  },
]);

try {
  if (dev_mode) {
    console.log("Running in dev mode");
  }
} catch (e: any) {
  console.log(e.message);
}

root.render(
  <AuthStoreContext.Provider value={authStore}>
    <RouterProvider router={router} />
  </AuthStoreContext.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

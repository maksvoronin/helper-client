import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Store from "./@store/store";
import reportWebVitals from "./reportWebVitals";
import WelcomePage from "./Welcome/Welcome";
import MainLogin from "./MainLogin/MainLogin";
import MainRegister from "./MainRegister/MainRegister";
import MainRecovery from "./MainRecovery/MainRecovery";
import LikedPage from "./Liked/LikedPage";
import MyPage from "./My/MyPage";
import SubscribedPage from "./Subscribed/SubscribedPage";
import SettingsPage from "./Settings/SettingsPage";
import AdminPage from "./Admin/AdminPage";
import SeriesAdminPage from "./Admin/Series.AdminPage";
import DetailCommentPage from "./DetailComment/DetailCommentPage";
import DetailDecisionPage from "./DetailDecision/DetailDecisionPage";
import ProfilePage from "./Profile/ProfilePage";
import SystemAdminPage from "./Admin/System.AdminPage";
import SystemEditAdminPage from "./Admin/SystemEdit.AdminPage";
import UsersAdminPage from "./Admin/Users.AdminPage";
import ExportAdminPage from "./Admin/Export.AdminPage";
import BackgroundAdminPage from "./Admin/Background.AdminPage";
import DeleteBackgroundAdminPage from "./Admin/DeleteBackground.AdminPage";
import ActivatePage from "./Activate/ActivatePage";
import { dev_mode } from "./config";
import { Comment, Decision, Index, Search } from "./@pages";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index title="Помощник поиска неисправностей" />,
  },
  {
    path: "/welcome",
    element: <WelcomePage title="Добро пожаловать!" />,
  },
  {
    path: "/login",
    element: <MainLogin title="Вход" />,
  },
  {
    path: "/register",
    element: <MainRegister title="Регистрация" />,
  },
  {
    path: "/recovery",
    element: <MainRecovery title="Восстановление аккаунта" />,
  },
  {
    path: "/comment",
    element: <Comment title="Добавление замечания" />,
  },
  {
    path: "/comment/:id",
    element: <DetailCommentPage />,
  },
  {
    path: "/decision",
    element: <Decision title="Добавление решения" />,
  },
  {
    path: "/decision/:id",
    element: <DetailDecisionPage />,
  },
  {
    path: "/liked",
    element: <LikedPage title="Полезные решения" />,
  },
  {
    path: "/my",
    element: <MyPage title="Мои данные" />,
  },
  {
    path: "/subscribed",
    element: <SubscribedPage title="Отслеживаемое" />,
  },
  {
    path: "/settings",
    element: <SettingsPage title="Настройки" />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage title="Управление" />,
  },
  {
    path: "/admin/series",
    element: <SeriesAdminPage title="Добавление серии" />,
  },
  {
    path: "/admin/system",
    element: <SystemAdminPage title="Добавление системы" />,
  },
  {
    path: "/admin/edit_system",
    element: <SystemEditAdminPage title="Изменение системы" />,
  },
  {
    path: "/admin/users",
    element: <UsersAdminPage title="Статистика по пользователям" />,
  },
  {
    path: "/admin/export",
    element: <ExportAdminPage title="Экспорт таблиц" />,
  },
  {
    path: "/admin/background",
    element: <BackgroundAdminPage title="Добавление фона" />,
  },
  {
    path: "/admin/delete_background",
    element: <DeleteBackgroundAdminPage title="Удаление фона" />,
  },
  {
    path: "/activate",
    element: <ActivatePage title="Подтвердите свой аккаунт" />,
  },
  {
    path: "/search",
    element: <Search title="Поиск" />,
  },
]);

const store = new Store();

export const Context = React.createContext({
  store,
});

try {
  if (dev_mode) {
    console.log("Running in dev mode");
  }
} catch (e: any) {
  console.log(e.message);
}

root.render(
  <Context.Provider value={{ store }}>
    <RouterProvider router={router} />
  </Context.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

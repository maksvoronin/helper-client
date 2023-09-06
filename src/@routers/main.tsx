import { Navigate } from "react-router-dom";
import { Changelog, Comment, Decision, DetailComment, DetailDecision, Index, Liked, My, NotFound, Profile, Rating, Search, Settings, Subscribed, System, Welcome } from "../@pages";
import { baseURIs } from "../config";
import { ProtectedRoute } from "../@components";

const baseURI = baseURIs.main;

const mainRoutes = [
  { path: `${baseURI}`, element: <Index title="Помощник поиска неисправностей" /> },
  {
    path: `${baseURI}/welcome`,
    element: (
      <ProtectedRoute authSecure>
        <Welcome title="Добро пожаловать!" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/comment`,
    element: (
      <ProtectedRoute authSecure>
        <Comment title="Добавление замечания" />
      </ProtectedRoute>
    ),
  },
  { path: `${baseURI}/comment/:id`, element: <DetailComment title="Замечание" /> },
  {
    path: `${baseURI}/decision`,
    element: (
      <ProtectedRoute authSecure>
        <Decision title="Добавление решения" />
      </ProtectedRoute>
    ),
  },
  { path: `${baseURI}/decision/:id`, element: <DetailDecision title="Решение" /> },
  { path: `${baseURI}/system/:id`, element: <System title={"Информация по системе"} /> },
  {
    path: `${baseURI}/liked`,
    element: (
      <ProtectedRoute authSecure>
        <Liked title="Полезные решения" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/my`,
    element: (
      <ProtectedRoute authSecure>
        <My title="Мои данные" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/favorite`,
    element: (
      <ProtectedRoute authSecure>
        <Subscribed title="Отслеживаемое" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/subscribed`,
    element: (
      <ProtectedRoute authSecure>
        <Navigate to={`${baseURI}/favorite`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/settings`,
    element: (
      <ProtectedRoute authSecure>
        <Settings title="Настройки" />
      </ProtectedRoute>
    ),
  },
  {
    path: `${baseURI}/profile/:id`,
    element: (
      <ProtectedRoute authSecure>
        <Profile title={"Профиль пользователя"} />
      </ProtectedRoute>
    ),
  },
  { path: `${baseURI}/search`, element: <Search title="Поиск" /> },
  {
    path: `${baseURI}/rating`,
    element: (
      <ProtectedRoute authSecure>
        <Rating title="Рейтинг" />
      </ProtectedRoute>
    ),
  },
  { path: `${baseURI}/changelog`, element: <Changelog title="История версий" /> },
  { path: `${baseURI}/*`, element: <NotFound /> },
];

export default mainRoutes;

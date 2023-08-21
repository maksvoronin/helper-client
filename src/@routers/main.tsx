import { Navigate } from "react-router-dom";
import { Changelog, Comment, Decision, DetailComment, DetailDecision, Index, Liked, My, NotFound, Profile, Rating, Search, Settings, Subscribed, System, Welcome } from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.main;

const mainRoutes = [
  { path: `${baseURI}`, element: <Index title="Помощник поиска неисправностей" /> },
  { path: `${baseURI}/welcome`, element: <Welcome title="Добро пожаловать!" /> },
  { path: `${baseURI}/comment`, element: <Comment title="Добавление замечания" /> },
  { path: `${baseURI}/comment/:id`, element: <DetailComment title="Замечание" /> },
  { path: `${baseURI}/decision`, element: <Decision title="Добавление решения" /> },
  { path: `${baseURI}/decision/:id`, element: <DetailDecision title="Решение" /> },
  { path: `${baseURI}/system/:id`, element: <System title={"Информация по системе"} /> },
  { path: `${baseURI}/liked`, element: <Liked title="Полезные решения" /> },
  { path: `${baseURI}/my`, element: <My title="Мои данные" /> },
  { path: `${baseURI}/favorite`, element: <Subscribed title="Отслеживаемое" /> },
  { path: `${baseURI}/subscribed`, element: <Navigate to={`${baseURI}/favorite`} /> },
  { path: `${baseURI}/settings`, element: <Settings title="Настройки" /> },
  { path: `${baseURI}/profile/:id`, element: <Profile title={"Профиль пользователя"} /> },
  { path: `${baseURI}/search`, element: <Search title="Поиск" /> },
  { path: `${baseURI}/rating`, element: <Rating title="Рейтинг" /> },
  { path: `${baseURI}/changelog`, element: <Changelog title="История версий" /> },
  { path: `${baseURI}/*`, element: <NotFound /> },
];

export default mainRoutes;

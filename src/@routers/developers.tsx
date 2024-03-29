import { ProtectedRoute } from "../@components";
import { AllApplications, App, Apps, CommentAbout, CommentAll, CommentGet, CommentSystem, CommentUser, CreateApplication, DecisionAbout, DecisionAll, DecisionGet, DecisionUser, Developers, DocsAuthorization, DocsControlApp, DocsCreateApp, DocsDeleteApp, DocsForWhat, DocsResponse, DocsStart, InterfaceApplication, InterfaceBackground, InterfaceComment, InterfaceCommentary, InterfaceDecision, InterfaceEvent, InterfaceRoad, InterfaceSeries, InterfaceSystem, InterfaceUser, NotFound, SystemAbout, SystemAll, SystemGet } from "../@pages/developers";
import { baseURIs } from "../config";

const baseURI = baseURIs.developers;

const developerRoutes = [
  { path: `${baseURI}`, element: <Developers title="Разработчикам" /> },
  { path: `${baseURI}/docs/createapp`, element: <DocsCreateApp title="Документация / Создание приложения" /> },
  { path: `${baseURI}/docs/forwhat`, element: <DocsForWhat title="Документация / Для чего это нужно?" /> },
  { path: `${baseURI}/docs/controlapp`, element: <DocsControlApp title="Документация / Для чего это нужно?" /> },
  { path: `${baseURI}/docs/deleteapp`, element: <DocsDeleteApp title="Документация / Удаление приложения" /> },
  { path: `${baseURI}/docs/start`, element: <DocsStart title="Документация / Удаление приложения" /> },
  { path: `${baseURI}/docs/authorization`, element: <DocsAuthorization title="Документация / Авторизация" /> },
  { path: `${baseURI}/docs/responses`, element: <DocsResponse title="Документация / Ответы сервера" /> },
  { path: `${baseURI}/docs/methods/system`, element: <SystemAbout title="Документация / Методы / system" /> },
  { path: `${baseURI}/docs/methods/system/all`, element: <SystemAll title="Документация / Методы / system / all" /> },
  { path: `${baseURI}/docs/methods/system/get`, element: <SystemGet title="Документация / Методы / system / get" /> },
  { path: `${baseURI}/docs/methods/comment`, element: <CommentAbout title="Документация / Методы / comment" /> },
  { path: `${baseURI}/docs/methods/comment/all`, element: <CommentAll title="Документация / Методы / comment / all" /> },
  { path: `${baseURI}/docs/methods/comment/get`, element: <CommentGet title="Документация / Методы / comment / all" /> },
  { path: `${baseURI}/docs/methods/comment/user`, element: <CommentUser title="Документация / Методы / comment / all" /> },
  { path: `${baseURI}/docs/methods/comment/system`, element: <CommentSystem title="Документация / Методы / comment / all" /> },
  { path: `${baseURI}/docs/methods/decision`, element: <DecisionAbout title="Документация / Методы / decision" /> },
  { path: `${baseURI}/docs/methods/decision/all`, element: <DecisionAll title="Документация / Методы / decision / all" /> },
  { path: `${baseURI}/docs/methods/decision/get`, element: <DecisionGet title="Документация / Методы / decision / get" /> },
  { path: `${baseURI}/docs/methods/decision/user`, element: <DecisionUser title="Документация / Методы / decision / user" /> },
  { path: `${baseURI}/docs/interfaces/system`, element: <InterfaceSystem title="Документация / Интерфейсы / system" /> },
  { path: `${baseURI}/docs/interfaces/comment`, element: <InterfaceComment title="Документация / Интерфейсы / comment" /> },
  { path: `${baseURI}/docs/interfaces/decision`, element: <InterfaceDecision title="Документация / Интерфейсы / decision" /> },
  { path: `${baseURI}/docs/interfaces/user`, element: <InterfaceUser title="Документация / Интерфейсы / user" /> },
  { path: `${baseURI}/docs/interfaces/event`, element: <InterfaceEvent title="Документация / Интерфейсы / event" /> },
  { path: `${baseURI}/docs/interfaces/commentary`, element: <InterfaceCommentary title="Документация / Интерфейсы / commentary" /> },
  { path: `${baseURI}/docs/interfaces/background`, element: <InterfaceBackground title="Документация / Интерфейсы / background" /> },
  { path: `${baseURI}/docs/interfaces/road`, element: <InterfaceRoad title="Документация / Интерфейсы / road" /> },
  { path: `${baseURI}/docs/interfaces/application`, element: <InterfaceApplication title="Документация / Интерфейсы / application" /> },
  { path: `${baseURI}/docs/interfaces/series`, element: <InterfaceSeries title="Документация / Интерфейсы / series" /> },
  { path: `${baseURI}/apps`, element: <ProtectedRoute authSecure><Apps title="Мои приложения" /></ProtectedRoute> },
  { path: `${baseURI}/apps/create`, element: <ProtectedRoute authSecure><CreateApplication title="Создание приложения" /></ProtectedRoute> },
  { path: `${baseURI}/apps/all`, element: <ProtectedRoute authSecure><AllApplications title="Все приложения" /></ProtectedRoute> },
  { path: `${baseURI}/apps/:id`, element: <App title="Приложение" /> },
  { path: `${baseURI}/*`, element: <NotFound /> },
];

export default developerRoutes;

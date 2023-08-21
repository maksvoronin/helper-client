import { AllApplications, App, Apps, CreateApplication, Developers, DocsAuthorization, DocsControlApp, DocsCreateApp, DocsDeleteApp, DocsForWhat, DocsResponse, DocsStart, NotFound, SystemAbout, SystemAll, SystemGet } from "../@pages/developers";
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
  { path: `${baseURI}/apps`, element: <Apps title="Мои приложения" /> },
  { path: `${baseURI}/apps/create`, element: <CreateApplication title="Создание приложения" /> },
  { path: `${baseURI}/apps/all`, element: <AllApplications title="Все приложения" /> },
  { path: `${baseURI}/apps/:id`, element: <App title="Приложение" /> },
  { path: `${baseURI}/*`, element: <NotFound /> },
];

export default developerRoutes;

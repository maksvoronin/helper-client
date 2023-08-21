import { AllApplications, App, Apps, CreateApplication, Developers, DocsCreateApp } from "../@pages/developers";
import { baseURIs } from "../config";

const baseURI = baseURIs.developers;

const developerRoutes = [
  { path: `${baseURI}`, element: <Developers title="Разработчикам" /> },
  { path: `${baseURI}/docs/createapp`, element: <DocsCreateApp title="Документация / Создание приложения" /> },
  { path: `${baseURI}/apps/create`, element: <CreateApplication title="Создание приложения" /> },
  { path: `${baseURI}/apps`, element: <Apps title="Мои приложения" /> },
  { path: `${baseURI}/apps/:id`, element: <App title="Приложение" /> },
  { path: `${baseURI}/apps/all`, element: <AllApplications title="Все приложения" /> },
];

export default developerRoutes;

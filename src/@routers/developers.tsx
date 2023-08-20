import { Developers, DocsCreateApp } from "../@pages/developers";

const baseURI = "developers";

const developerRoutes = [
  { path: `/${baseURI}`, element: <Developers title="Разработчикам" /> },
  { path: `/${baseURI}/docs/createapp`, element: <DocsCreateApp title="Создание приложения" /> },
];

export default developerRoutes;

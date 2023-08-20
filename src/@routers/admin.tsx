import { Admin, CreateSeries, CreateSystem, EditSystem, Users, Export, CreateBackground, DeleteBackground, CreateBlok, CreateJournalMove, CreateLokomotiveNumber, CreatePostNumber, CreatePostscript, CreatePtol, CreateRoad, CreateSection, EditPtol, EditRoad, Stat } from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.admin;

const adminRoutes = [
  {
    path: `/${baseURI}`,
    element: <Admin title={`Управление`} />,
  },
  {
    path: `/${baseURI}/series/create`,
    element: <CreateSeries title={`Добавление серии`} />,
  },
  {
    path: `/${baseURI}/system/create`,
    element: <CreateSystem title={`Добавление системы`} />,
  },
  {
    path: `/${baseURI}/system/edit`,
    element: <EditSystem title={`Изменение системы`} />,
  },
  {
    path: `/${baseURI}/users`,
    element: <Users title={`Статистика по пользователям`} />,
  },
  {
    path: `/${baseURI}/export`,
    element: <Export title={`Экспорт таблиц`} />,
  },
  {
    path: `/${baseURI}/background/create`,
    element: <CreateBackground title={`Добавление фона`} />,
  },
  {
    path: `/${baseURI}/background/delete`,
    element: <DeleteBackground title={`Удаление фона`} />,
  },
  {
    path: `/${baseURI}/ptol/create`,
    element: <CreatePtol title="Добавление ПТОЛа" />,
  },
  {
    path: `/${baseURI}/ptol/edit`,
    element: <EditPtol title="Изменение ПТОЛа" />,
  },
  {
    path: `/${baseURI}/postscript/create`,
    element: <CreatePostscript title="Добавление приписки" />,
  },
  {
    path: `/${baseURI}/lokomotivenumber/create`,
    element: <CreateLokomotiveNumber title="Добавление номера локомотива" />,
  },
  {
    path: `/${baseURI}/section/create`,
    element: <CreateSection title="Добавление секции" />,
  },
  {
    path: `/${baseURI}/move/create`,
    element: <CreateJournalMove title="Добавление действия" />,
  },
  {
    path: `/${baseURI}/blok/create`,
    element: <CreateBlok title="Добавление БЛОКа" />,
  },
  {
    path: `/${baseURI}/postnumber/create`,
    element: <CreatePostNumber title="Добавление № поставленного" />,
  },
  {
    path: `/${baseURI}/road/create`,
    element: <CreateRoad title="Создание дороги" />,
  },
  {
    path: `/${baseURI}/road/edit`,
    element: <EditRoad title="Изменение дороги" />,
  },
  {
    path: `/${baseURI}/stat`,
    element: <Stat title={"Статистика запросов"} />,
  },
];

export default adminRoutes;

import { ProtectedRoute } from "../@components";
import {
  Admin,
  CreateSeries,
  CreateSystem,
  EditSystem,
  Users,
  Export,
  CreateBackground,
  DeleteBackground,
  CreateBlok,
  CreateJournalMove,
  CreateLokomotiveNumber,
  CreatePostNumber,
  CreatePostscript,
  CreatePtol,
  CreateRoad,
  CreateSection,
  EditPtol,
  EditRoad,
  Stat,
} from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.admin;

const adminRoutes = [
  {
    path: `/${baseURI}`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <Admin title={`Управление`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/series/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateSeries title={`Добавление серии`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/system/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateSystem title={`Добавление системы`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/system/edit`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <EditSystem title={`Изменение системы`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/users`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <Users title={`Статистика по пользователям`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/export`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <Export title={`Экспорт таблиц`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/background/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateBackground title={`Добавление фона`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/background/delete`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <DeleteBackground title={`Удаление фона`} />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/ptol/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreatePtol title="Добавление ПТОЛа" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/ptol/edit`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <EditPtol title="Изменение ПТОЛа" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/postscript/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreatePostscript title="Добавление приписки" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/lokomotivenumber/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateLokomotiveNumber title="Добавление номера локомотива" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/section/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateSection title="Добавление секции" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/move/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateJournalMove title="Добавление действия" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/blok/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateBlok title="Добавление БЛОКа" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/postnumber/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreatePostNumber title="Добавление № поставленного" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/road/create`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <CreateRoad title="Создание дороги" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/road/edit`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <EditRoad title="Изменение дороги" />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${baseURI}/stat`,
    element: (
      <ProtectedRoute permissions={5} authSecure>
        <Stat title={"Статистика запросов"} />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;

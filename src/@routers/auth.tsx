import { Activate, Login, Recovery, Register } from "../@pages";
import { baseURIs } from "../config";

const baseURI = baseURIs.auth;

const authRoutes = [
  {
    path: `/${baseURI}/login`,
    element: <Login title="Вход" />,
  },
  {
    path: `/${baseURI}/register`,
    element: <Register title="Регистрация" />,
  },
  {
    path: `/${baseURI}/recovery`,
    element: <Recovery title="Восстановление аккаунта" />,
  },
  {
    path: `/${baseURI}/activate`,
    element: <Activate title="Подтвердите свой аккаунт" />,
  },
];

export default authRoutes;

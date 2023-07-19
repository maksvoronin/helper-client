import { FC, PropsWithChildren, useEffect } from "react";
import { PageProps, Response, User } from "../@types";
import { useAuthStoreContext } from "../@store";
import $api from "../@http";
import { AlertPanel } from "../@widgets";
import { observer } from "mobx-react";

const DefaultLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  const { user, isAuth, setAuth, setUser } = useAuthStoreContext();
  useEffect(() => {
    console.log(isAuth);
    if (!localStorage.token) return console.log("Token not found");
    if (!isAuth) {
      console.log(isAuth);
      $api.get<Response<{ accessToken: string; refreshToken: string; user: User }>>(`/auth/refresh`, { withCredentials: true }).then(({ data }) => {
        if (data.type === "error") return console.log(data);
        setUser(data.data!.user);
        setAuth(true);
        localStorage.token = data.data!.accessToken;
      });
    }
  }, [user.name, setUser, isAuth, setAuth]);

  return (
    <>
      <title>{title}</title>
      {children}
      <AlertPanel />
    </>
  );
});

export default DefaultLayout;

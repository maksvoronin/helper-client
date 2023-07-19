import { FC, PropsWithChildren, useEffect } from "react";
import AlertPanel from "../@components/AlertPanel/AlertPanel";
import { PageProps, Response, User } from "../@types";
import { useAuthStoreContext } from "../@store";
import $api from "../@http";

const DefaultLayout: FC<PropsWithChildren<PageProps>> = ({ title, children }) => {
  const { user, isAuth, setAuth, setUser } = useAuthStoreContext();
  useEffect(() => {
    console.log(isAuth)
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
}

export default DefaultLayout;
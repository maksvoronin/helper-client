import { observer } from "mobx-react";
import { FC, PropsWithChildren } from "react";
import { useAuthStoreContext } from "../@store";
import { NotFound } from "../@pages";

type TProps = {
  permissions?: number;
  authSecure?: boolean;
};

const ProtectedRoute: FC<PropsWithChildren<TProps>> = observer(({ permissions, authSecure, children }) => {
  const { user, isAuth } = useAuthStoreContext();

  if (authSecure && !isAuth) return <NotFound />;
  if (permissions && permissions > user.permissions) return <NotFound />;

  return <>{children}</>;
});

export default ProtectedRoute;

import { FC, PropsWithChildren } from "react";
import AlertPanel from "../@components/AlertPanel/AlertPanel";
import { PageProps } from "../@types";

const DefaultLayout: FC<PropsWithChildren<PageProps>> = ({ title, children }) => {
  return (
    <>
      <title>{title}</title>
      {children}
      <AlertPanel />
    </>
  );
}

export default DefaultLayout;
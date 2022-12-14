import AlertPanel from "../@components/AlertPanel/AlertPanel";
import { DefaultPage } from "../@types/pageDefault.interface";

const DefaultLayout = ({ title, children }: DefaultPage) => {
  return (
    <>
      <title>{title}</title>
      {children}
      <AlertPanel />
    </>
  );
}

export default DefaultLayout;
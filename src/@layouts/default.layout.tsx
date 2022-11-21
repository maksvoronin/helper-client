import { DefaultPage } from "../@types/pageDefault.interface";

const DefaultLayout = ({ title, children }: DefaultPage) => {
  return (
    <>
      <title>{title}</title>
      {children}
    </>
  );
}

export default DefaultLayout;
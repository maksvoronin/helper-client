import Sidebar from "../@components/Sidebar/Sidebar";
import { DefaultPage } from "../@types/pageDefault.interface";

const MainLayout = ({ title, children }: DefaultPage) => {
  return (
    <>
      <title>{title}</title>
      <div className={"maincontainer"}>
        <Sidebar />
        <div className="maincontent">
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
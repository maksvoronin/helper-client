import Sidebar from "../@components/Sidebar/Sidebar";
import { DefaultPage } from "../@types/pageDefault.interface";
import config from "../config";

const MainLayout = ({ title, children }: DefaultPage) => {
  return (
    <>
      <title>{title}</title>
      <div className={"maincontainer"} style={{backgroundImage: `url(${config.API}/public/default_bg.png)`}}>
        <Sidebar />
        <div className="maincontent">
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
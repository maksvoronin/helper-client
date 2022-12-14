import { mdiCogOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import config from "../../../config";
import s from './sidebaruserinfo.module.scss';

const SidebarUserInfo = () => {

  const {store} = useContext(Context);
  const user = store.user;

  return (
    <div className={`${s.userInfo}`}>
      {user && (
        <>
          <div className={s.userContent}>
            <div style={{ backgroundImage: `url(${config.API}/public/${user.avatar})` }} className={s.avatar} />
            <div className={s.texts}>
              <b>
                <Link to={`/profile/${user.id}`}>
                  {user.name} {user.surname}
                </Link>
              </b>
              <span>
                {store.stat.decisions} реш. / {store.stat.comments} замеч.
              </span>
            </div>
          </div>
          <Link to={'/settings'} className={s.settingsBtn}>
            <Icon path={mdiCogOutline} />
          </Link>
        </>
      )}
    </div>
  );
};

export default SidebarUserInfo;

import Sidebar from '../@components/Sidebar/Sidebar';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import AlertPanel from '../@components/AlertPanel/AlertPanel';

const MainLayout = ({ title, children }: DefaultPage) => {
  const { store } = useContext(Context);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    setBackgroundImage(store.background);
  }, [store.background]);

  return (
    <>
      <title>{title}</title>
      <div
        className={'maincontainer'}
        style={{
          background: `${
            store.isAuth && backgroundImage
              ? `url(${config.API}/public/${backgroundImage})`
              : `url(${config.API}/public/default_bg.png)`
          }`,
        }}
      >
        <Sidebar />
        <div className="maincontent">{children}</div>
      </div>
      <AlertPanel />
    </>
  );
};

export default MainLayout;

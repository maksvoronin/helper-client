import Icon from '@mdi/react';
import { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../..';
import s from './sidebarbutton.module.scss';

export interface SidebarButtonType {
  icon: string,
  link: string,
  permission: number,
  secondary?: boolean,
  children: ReactNode
}

const SidebarButton = ({icon, link, permission, secondary, children}: SidebarButtonType) => {

  const {store} = useContext(Context);

  if(store.user.permissions < permission) {
    return <></>;
  }

  return <Link to={link} className={`${s.sidebarButton} ${secondary && s.secondary}`}><Icon path={icon} /><span>{children}</span></Link>;

};

export default SidebarButton;

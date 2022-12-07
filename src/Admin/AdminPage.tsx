import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { Context } from "..";
import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './adminpage.module.scss';

const AdminPage = ({ title }: DefaultPage) => {

  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, navigate, store.user.permissions]);

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Управление проектом</h1>
        </div>

        <div className={s.contentBlock}>
          <h1>Данные</h1>
          <ul>
            <li><Link to="/admin/series">Добавить серию локомотива</Link></li>
            <li><Link to="/admin/system">Добавить систему</Link></li>
            <li><Link to="/admin/edit_system">Изменить систему</Link></li>
            <li><Link to="/admin/background">Добавить фон</Link></li>
            <li><Link to="/admin/delete_background">Удалить фон</Link></li>
          </ul>
        </div>

        <div className={s.contentBlock}>
          <h1>Статистика</h1>
          <ul>
            <li><Link to="/admin/users">Пользователи</Link></li>
            <li><Link to="/admin/export">Экспорт</Link></li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminPage;
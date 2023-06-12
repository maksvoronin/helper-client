import { useNavigate } from 'react-router-dom';
import Logo from '../@assets/logo';
import DefaultLayout from '../@layouts/default.layout';
import { DefaultPage } from '../@types/pageDefault.interface';
import s from './welcome.module.scss';
import { observer } from 'mobx-react';

const WelcomePage = observer(({ title }: DefaultPage) => {
  const navigate = useNavigate();

  return (
    <DefaultLayout title={title}>
      <div className={s.welcomeWrapper}>
        <div className={s.welcomePage}>
          <Logo />
          <h1>Helper</h1>
          <button onClick={() => navigate('/login')}>Войти в систему</button>
          <p>Удобный помощник поиска неисправностей, обмена опытом и решения проблем для работников РЖД</p>
        </div>
      </div>
    </DefaultLayout>
  );
});

export default WelcomePage;

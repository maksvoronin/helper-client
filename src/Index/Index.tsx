import Logo from "../@assets/logo";
import DefaultLayout from "../@layouts/default.layout";
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './index.module.scss'

const IndexPage = ({ title }: DefaultPage) => {

  return (
    <DefaultLayout title={title}>
      <div className={s.indexWrapper}>
        <div className={s.indexPage}>
          <Logo />
          <h1>Helper</h1>
          <button>Войти в систему</button>
          <p>Удобный помощник поиска неисправностей, обмена опытом и решения проблем для работников РЖД</p>
        </div>
      </div>
    </DefaultLayout>
  );

}

export default IndexPage;
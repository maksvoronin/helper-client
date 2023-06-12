import MainLayout from "../@layouts/main.layout"
import { DefaultPage } from "../@types/pageDefault.interface";
import s from './searchpage.module.scss';
import SearchPanel from "../@components/SearchPanel/SearchPanel";
import { useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";

const SearchPage = observer(({title}: DefaultPage) => {

  const [params] = useSearchParams();
  return(
    <MainLayout title={title}>
      <div className={s.searchWrapper}>
        <h1>Поиск</h1>
        <SearchPanel resultClass={s.someResult} initialValue={params.get('q')} fullClass={s.searchPanel} />
      </div>
    </MainLayout>
  );
});

export default SearchPage;
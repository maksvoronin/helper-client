import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import s from './searchpanel.module.scss';

const SearchPanel = ({resultClass, initialValue, fullClass}: any) => {
  const [searchText, setSearchText] = useState<string>(initialValue || "");
  const [searchedResult, setSearchedResult] = useState<{ users: any[]; comments: any[]; decisions: any[] }>();

  useEffect(() => {
    if(searchText) {
      axios.get(`${config.API}/search/get?text=${searchText}`).then(({ data }) => {
        setSearchedResult(data.data);
      });
    }
  }, [searchText]);

  return (
    <div className={`${s.search} ${fullClass}`}>
      <input placeholder="Поиск" value={searchText} onChange={({ target }) => setSearchText(target.value)} />
      <div className={`${s.someResult} ${resultClass}`}>
        {!searchText ? (
          'Введите свой запрос'
        ) : (
          <>
            По запросу «{searchText}»{' '}
            {!(!searchedResult || searchedResult.comments || searchedResult.users || searchedResult.decisions)
              ? 'ничего не найдено'
              : searchedResult && (
                  <>
                    найдено {searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length} результат
                    {(searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length > 1 &&
                      searchedResult.users.length + searchedResult.comments.length + searchedResult.decisions.length < 5) ||
                    (searchedResult.users.length + searchedResult.comments.length + (searchedResult.decisions.length % 10) > 1 &&
                      searchedResult.users.length + searchedResult.comments.length + (searchedResult.decisions.length % 10) < 5)
                      ? 'а'
                      : 'ов'}
                    {searchedResult.users.length > 0 && (
                      <>
                        <div className={s.tag}>Пользователи</div>
                        {searchedResult.users.map((e: any) => (
                          <Link key={e._id} to={`/profile/${e._id}`}>
                            {e.name} {e.surname}
                          </Link>
                        ))}
                      </>
                    )}
                    {searchedResult.comments.length > 0 && (
                      <>
                        <div className={s.tag}>Замечания</div>
                        {searchedResult.comments.map(
                          (e: any) =>
                            e.visible && (
                              <Link key={e._id} to={`/comment/${e._id}`}>
                                {e.content}
                              </Link>
                            ),
                        )}
                      </>
                    )}
                    {searchedResult.decisions.length > 0 && (
                      <>
                        <div className={s.tag}>Решения</div>
                        {searchedResult.decisions.map(
                          (e: any) =>
                            e.visible && (
                              <Link key={e._id} to={`/decision/${e._id}`}>
                                {e.content}
                              </Link>
                            ),
                        )}
                      </>
                    )}
                    <Link to={`/search?q=${searchText}`}>Открыть страницу поиска</Link>
                  </>
                )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;

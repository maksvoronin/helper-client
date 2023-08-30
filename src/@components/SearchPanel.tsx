import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Input } from "../@shared";
import { Comment, Decision, Response, SearchResult, User } from "../@types";
import $api from "../@http";
import { styled } from "styled-components";
import { Link as DefaultLink } from "react-router-dom";
import { useLoaderStore, useSearchStoreContext } from "../@store";
import { baseURIs } from "../config";

const SearchResultBlock = styled.div`
  padding: 15px;
  background-color: var(--pageBackground);
  border-radius: 12px;
  border: var(--primaryBorder);
  margin-top: 5px;
  position: absolute;
  width: calc(100% - 30px);
  transition: left 0.3s;
  left: -200%;
  color: var(--primaryText);
`;

const Tag = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
`;

const Link = styled(DefaultLink)`
  display: block;
  color: var(--accentColor);
  font-size: 14px;
  width: 100%;
  display: flex;
  min-height: 28px;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Search = styled.div`
  position: relative;
  input:focus + ${SearchResultBlock}, ${SearchResultBlock}:hover {
    left: 0px;
  }
`;

const SearchPanel: FC<{ initialValue?: string }> = observer(({ initialValue }) => {
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const { searchText, setSearchText } = useSearchStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (initialValue) setSearchText(initialValue);
  }, [initialValue, setSearchText]);

  useEffect(() => {
    if (searchText.trim()) {
      setLoaded(true);
      $api.get<Response<SearchResult>>(`/search/get?text=${searchText}`).then(({ data }) => {
        setSearchResult(data.data);
        setLoaded(false);
      });
    }
  }, [searchText, setLoaded]);

  return (
    <Search>
      <Input placeholder="Поиск" value={searchText} onChange={({ target }: any) => setSearchText(target.value)} />
      <SearchResultBlock>
        {!searchText ? (
          "Введите свой запрос"
        ) : (
          <>
            По запросу «{searchText}»{" "}
            {!(!searchResult || searchResult.comments || searchResult.users || searchResult.decisions)
              ? "ничего не найдено"
              : searchResult && (
                  <>
                    найдено {searchResult.users.length + searchResult.comments.length + searchResult.decisions.length} результат
                    {(searchResult.users.length + searchResult.comments.length + searchResult.decisions.length > 1 && searchResult.users.length + searchResult.comments.length + searchResult.decisions.length < 5) ||
                    (searchResult.users.length + searchResult.comments.length + (searchResult.decisions.length % 10) > 1 &&
                      searchResult.users.length + searchResult.comments.length + (searchResult.decisions.length % 10) < 5)
                      ? "а"
                      : "ов"}
                    {searchResult.users.length > 0 && (
                      <>
                        <Tag>Пользователи</Tag>
                        {searchResult.users.map((e: User) => (
                          <Link key={e._id} to={`${baseURIs.main}/profile/${e._id}`}>
                            {e.name} {e.surname}
                          </Link>
                        ))}
                      </>
                    )}
                    {searchResult.comments.length > 0 && (
                      <>
                        <Tag>Замечания</Tag>
                        {searchResult.comments.map(
                          (e: Comment) =>
                            e.visible && (
                              <Link key={e._id} to={`${baseURIs.main}/comment/${e._id}`}>
                                {e.content}
                              </Link>
                            ),
                        )}
                      </>
                    )}
                    {searchResult.decisions.length > 0 && (
                      <>
                        <Tag>Решения</Tag>
                        {searchResult.decisions.map(
                          (e: Decision) =>
                            e.visible && (
                              <Link key={e._id} to={`${baseURIs.main}/decision/${e._id}`}>
                                {e.content}
                              </Link>
                            ),
                        )}
                      </>
                    )}
                    <Link to={`${baseURIs.main}/search?q=${searchText}`}>Открыть страницу поиска</Link>
                  </>
                )}
          </>
        )}
      </SearchResultBlock>
    </Search>
  );
});

export default SearchPanel;

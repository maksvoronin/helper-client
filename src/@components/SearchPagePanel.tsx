import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Container, ContainerSubTitle, ContainerTitle, Input } from "../@shared";
import { styled } from "styled-components";
import { useSearchStoreContext } from "../@store";
import $api from "../@http";
import { Comment, Decision, Response, SearchResult, User } from "../@types";
import { Link as DefaultLink } from "react-router-dom";
import { baseURIs } from "../config";

const SearchInput = styled(Input)`
  margin-top: 15px;
`;

const SizeText = styled.span`
  font-style: italic;
  font-weight: 500;
  opacity: 0.6;
  margin-left: 4px;
  font-size: 18px;
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

const SearchPagePanel: FC = observer(() => {
  const { searchText } = useSearchStoreContext();
  const [searchedText, setSearchedText] = useState<string>(searchText || "");
  const [searchResult, setSearchResult] = useState<SearchResult>();

  useEffect(() => {
    if (searchedText.trim()) {
      $api.get<Response<SearchResult>>(`/search/get?text=${searchedText}`).then(({ data }) => {
        setSearchResult(data.data);
      });
    }
  }, [searchedText]);

  return (
    <>
      <Container>
        <ContainerTitle>Поиск на сайте</ContainerTitle>
        <SearchInput placeholder="Введите Ваш запрос" value={searchedText} onChange={({ target }: any) => setSearchedText(target.value)} />
      </Container>
      {searchedText.trim() && (
        <>
          {searchResult && searchResult.users.length > 0 && (
            <Container>
              <ContainerSubTitle>
                Пользователи <SizeText>• {searchResult.users.length}</SizeText>
              </ContainerSubTitle>
              {searchResult.users.map((e: User) => (
                <Link key={e._id} to={`${baseURIs.main}/profile/${e._id}`}>
                  {e.name} {e.surname}
                </Link>
              ))}
            </Container>
          )}

          {searchResult && searchResult.comments.length > 0 && (
            <Container>
              <ContainerSubTitle>
                Замечания <SizeText>• {searchResult.comments.length}</SizeText>
              </ContainerSubTitle>
              {searchResult.comments.map((e: Comment) => (
                <Link key={e._id} to={`${baseURIs.main}/comment/${e._id}`}>
                  {e.content}
                </Link>
              ))}
            </Container>
          )}

          {searchResult && searchResult.decisions.length > 0 && (
            <Container>
              <ContainerSubTitle>
                Решения <SizeText>• {searchResult.decisions.length}</SizeText>
              </ContainerSubTitle>
              {searchResult.decisions.map((e: Decision) => (
                <Link key={e._id} to={`${baseURIs.main}/decision/${e._id}`}>
                  {e.content}
                </Link>
              ))}
            </Container>
          )}
        </>
      )}
    </>
  );
});

export default SearchPagePanel;

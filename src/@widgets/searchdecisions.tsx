import { observer } from "mobx-react";
import { FC } from "react";
import { Container, ContainerTitle } from "../@shared";

const SearchDecisions: FC = observer(() => {
  return <>
    <Container>
      <ContainerTitle>Помощник поиска неисправностей</ContainerTitle>
      <p>Система</p>
      <p>Замечание</p>
    </Container>
  </>
});

export default SearchDecisions;
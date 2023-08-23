import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { FC } from "react";
import { Container, ContainerSubTitle, ContainerTitle, Li, Ul } from "../@shared";
import { changelog } from "../config";
import { styled } from "styled-components";

const DateSubTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: #999;
  display: block;
  margin-left: 5px;
`;

const Changelog: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>История версий</ContainerTitle>
      </Container>
      {changelog.map((e) => (
        <Container key={Math.random() * e.version.length}>
          <ContainerSubTitle>
            {e.version} <DateSubTitle>• {e.date}</DateSubTitle>
          </ContainerSubTitle>
          <Ul>
            {e.steps.map((f) => (
              <Li key={Math.random() * f.length}>{f}</Li>
            ))}
          </Ul>
        </Container>
      ))}
    </MainLayout>
  );
});

export default Changelog;

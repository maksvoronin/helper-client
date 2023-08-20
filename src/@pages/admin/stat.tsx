import { FC, useEffect, useState } from "react";
import { PageProps, ProjectStat, Response } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { Container, ContainerSubTitle, ContainerTitle, FormText } from "../../@shared";
import { styled } from "styled-components";
import $api from "../../@http";

const StatGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 1320px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1140px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 660px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 410px) {
    grid-template-columns: 1fr;
  }
`;

const StatPage: FC<PageProps> = observer(({ title }) => {
  const [stat, setStat] = useState<ProjectStat[]>([]);

  useEffect(() => {
    $api.get<Response<ProjectStat[]>>("/stat/project").then(({ data }) => {
      setStat(data.data!);
    });
  }, []);

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Посещения на сайте</ContainerTitle>
      </Container>

      <StatGrid>
        {stat &&
          stat.map((e) => (
            <Container key={e._id}>
              <ContainerSubTitle>{e.date}</ContainerSubTitle>
              {
                e.platforms.map(c => <FormText key={Math.random() * 100}>{c.platform}: {c.count}</FormText>)
              }
            </Container>
          ))}
      </StatGrid>
    </MainLayout>
  );
});

export default StatPage;

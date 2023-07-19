import { observer } from "mobx-react";
import { PageProps, Response, User } from "../@types";
import { FC, useEffect, useState } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerText, ContainerTitle } from "../@shared";
import { styled } from "styled-components";
import $api from "../@http";

const Table = styled.table`
  background: var(--containerBackground);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(50px);

  tr {
    @media(max-width: 500px) {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #c7c7c7;
      gap: 2px;
      margin-bottom: 5px;
    }
  }
`;

const Rating: FC<PageProps> = observer(({title}) => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    $api.get<Response<User[]>>("/user/all").then(({data}) => {
      setUsers(data.data!.sort((a, b) => b.rating - a.rating));
      console.log(data.data);
    })
  }, []);

  return <MainLayout title={title}>
    <Container>
      <ContainerTitle>Рейтинг пользователей</ContainerTitle>
      <ContainerText>Топ пользователей по количеству замечаний / решений. За каждую активность (замечания или решения) Вам начисляется 10 рейтинговых баллов.</ContainerText>
    </Container>
    <Table>
      <tr>
        <td>№</td>
        <td>ФИО</td>
        <td>Дорога</td>
        <td>Предприятие</td>
        <td>Замечания</td>
        <td>Решений</td>
        <td>Баллы</td>
      </tr>
      {
        users && users.map((e, i) => {
          return <tr key={e._id}>
            <td>{++i}</td>
            <td>{e.name} {e.surname}</td>
            <td>{e.road}</td>
            <td>{e.work}</td>
            <td>{e.createdComments.length}</td>
            <td>{e.createdDecisions.length}</td>
            <td>{e.rating}</td>
          </tr>
        })
      }
    </Table>
  </MainLayout>
});

export default Rating;
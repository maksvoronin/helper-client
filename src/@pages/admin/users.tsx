import { FC, useEffect, useState } from "react";
import { PageProps, Response, User } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { AdminContainer, ContainerText, ContainerTitle } from "../../@shared";
import $api from "../../@http";
import { styled } from "styled-components";
import { RoadSelect } from "../../@components";

const Table = styled.table`
  background: var(--containerBackground);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(50px);

  tr {
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #c7c7c7;
      gap: 2px;
      margin-bottom: 5px;
    }
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Count = styled.p`
  margin: 0;
  text-align: center;
  width: 100%;
`;

const Users: FC<PageProps> = observer(({ title }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterUsers, setFilterUsers] = useState<User[]>([]);

  const [activatedUsers, setActivatedUsers] = useState<number>(0);

  const [filterRoad, setFilterRoad] = useState<string>("");

  useEffect(() => {
    $api.get<Response<User[]>>("/user/all").then(({ data }) => {
      setUsers(data.data!.sort((a, b) => (a.road.name < b.road.name ? -1 : 1)));
      setFilterUsers(data.data!.sort((a, b) => (a.road.name < b.road.name ? -1 : 1)));
    });
  }, []);

  useEffect(() => {
    setActivatedUsers(users.filter((e) => e.isActivated).length);
  }, [users]);

  useEffect(() => {
    if (filterRoad && String(filterRoad) !== "0") {
      setFilterUsers(users.filter((e) => e.road._id === filterRoad));
    } else {
      setFilterUsers(users);
    }
  }, [filterRoad]);

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Пользователи</ContainerTitle>
        <ContainerText>
          Активировано аккаунтов: {activatedUsers} / {users.length}
        </ContainerText>
        <FilterRow>
          <RoadSelect onChange={(e) => setFilterRoad(e)} />
          <Count>Количество: {filterUsers.length}</Count>
        </FilterRow>
      </AdminContainer>
      <Table>
        <tbody>
          <tr>
            <td>ФИО</td>
            <td>Дорога</td>
            <td>Предприятие</td>
            <td>Телефон</td>
            <td>Замечания</td>
            <td>Решения</td>
            <td>A</td>
          </tr>
          {filterUsers.map((e) => (
            <tr key={e._id}>
              <td>
                {e.name} {e.surname}
              </td>
              <td>{e.road.name}</td>
              <td>{e.work}</td>
              <td>{e.phone}</td>
              <td>{e.createdComments.length}</td>
              <td>{e.createdDecisions.length}</td>
              <td>{e.isActivated ? "1" : "0"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainLayout>
  );
});

export default Users;

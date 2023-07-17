import { FC, useEffect, useState } from "react";
import { PageProps, Response, User } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { AdminContainer, ContainerText, ContainerTitle } from "../../@shared";
import $api from "../../@http";
import { styled } from "styled-components";

const Table = styled.table`
  background: var(--containerBackground);
  border-radius: 12px;
  padding: 20px;
`;

const Users: FC<PageProps> = observer(({ title }) => {
  const [users, setUsers] = useState<User[]>([]);

  const [activatedUsers, setActivatedUsers] = useState<number>(0);

  useEffect(() => {
    $api.get<Response<User[]>>("/user/all").then(({ data }) => {
      setUsers(data.data!);
    });
  }, []);

  useEffect(() => {
    setActivatedUsers(users.filter((e) => e.isActivated).length);
  }, [users]);

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Пользователи</ContainerTitle>
        <ContainerText>
          Активировано аккаунтов: {activatedUsers} / {users.length}
        </ContainerText>
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
          {users.map((e) => (
            <tr key={e._id}>
              <td>
                {e.name} {e.surname}
              </td>
              <td>{e.road}</td>
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

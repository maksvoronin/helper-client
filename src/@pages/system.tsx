import { observer } from "mobx-react";
import { Comment, PageProps, Response, System, User } from "../@types";
import { FC, useEffect, useState } from "react";
import { MainLayout } from "../@layouts";
import { Container, ContainerSubTitle, ContainerText, ContainerTitle, ControlButton, FormText, Li, Link, Ul } from "../@shared";
import { useParams } from "react-router-dom";
import $api from "../@http";
import { baseURIs } from "../config";
import { useAuthStoreContext, useLoaderStore } from "../@store";
import { alert } from "../@services";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import Icon from "@mdi/react";

const SystemPage: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const { user, isAuth, setUser } = useAuthStoreContext();
  const { setLoaded } = useLoaderStore();

  const [system, setSystem] = useState<System>();
  const [systemLiked, setSystemLiked] = useState<boolean>(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const newUser = user;

  useEffect(() => {
    $api.get<Response<System>>(`/system/get?id=${id}`).then(({ data }) => {
      setSystem(data.data);
      user._id && user.subscribedSystems.find((e) => e._id === system?._id) ? setSystemLiked(true) : setSystemLiked(false);
    });
  }, [id, system?._id, user?._id, user?.subscribedSystems]);

  useEffect(() => {
    if (system) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${system?._id}`).then(({ data }) => {
        setComments(data.data!);
      });
    }
  }, [system]);

  if (!system)
    return (
      <MainLayout title="Система не найдена">
        <FormText>Система не найдена</FormText>
      </MainLayout>
    );

  const subSystem = () => {
    setLoaded(true);
    $api.post<Response<User>>("/system/subscribe", { id: system._id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
      setSystemLiked(true);
      newUser.subscribedSystems.push(system);
      setUser(newUser);
      setLoaded(false);
    });
  };

  const unSubSystem = () => {
    setLoaded(true);
    $api.post<Response<User>>("/system/unsubscribe", { id: system._id }).then(({ data }) => {
      if (!data.data) return alert("error", "Ошибка", data.message, 1.5);
      setSystemLiked(false);
      newUser.subscribedSystems.splice(
        newUser.subscribedSystems.findIndex((e) => e === system),
        1,
      );
      setUser(newUser);
      setLoaded(false);
    });
  };

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>{system.name}</ContainerTitle>
        <ContainerText>
          {system.by.name} {system.by.surname}
        </ContainerText>
        <ContainerText>Дата создания: {new Date(system.created).toLocaleString("ru")}</ContainerText>
        {isAuth ? (
          systemLiked ? (
            <ControlButton onClick={unSubSystem} style={{marginTop: 15}}>
              <Icon path={mdiHeart} size={"18px"} />
              Не отслеживать систему
            </ControlButton>
          ) : (
            <ControlButton onClick={subSystem} style={{marginTop: 15}}>
              <Icon path={mdiHeartOutline} size={"18px"} />
              Отслеживать систему
            </ControlButton>
          )
        ) : (
          <></>
        )}
      </Container>
      {comments.map((e) => (
        <Container key={e._id}>
          <ContainerSubTitle>{e.content}</ContainerSubTitle>
          <Ul>
            {e.decisions.map((c) => (
              <Li key={c._id}>
                <Link to={`${baseURIs.main}/decision/${c._id}`}>{c.content}</Link>
              </Li>
            ))}
          </Ul>
        </Container>
      ))}
    </MainLayout>
  );
});

export default SystemPage;

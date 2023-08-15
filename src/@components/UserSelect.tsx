import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, User } from "../@types";
import { useAuthStoreContext, useLoaderStore, useUserStore } from "../@store";

const UserSelect: FC<{ onChange: (e: string) => void; defaultAuthed?: boolean }> = observer(({ onChange, defaultAuthed }) => {
  const { users, setUsers, setUsersLoaded, usersLoaded } = useUserStore();
  const { user } = useAuthStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!usersLoaded) {
      setLoaded(true);
      $api.get<Response<User[]>>(`/user/all`).then(({ data }) => {
        setUsersLoaded(true);
        setUsers(data.data!);
        setLoaded(false);
      });
    }
  }, [user, users.length, setUsers, users, setUsersLoaded, usersLoaded, setLoaded]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      {defaultAuthed ? (
        <option value={user._id}>
          {user.name} {user.surname}
        </option>
      ) : (
        <option value={0} disabled>
          Выберите пользователя
        </option>
      )}
      {users &&
        users.map((e) =>
          defaultAuthed ? (
            e._id !== user._id && (
              <option value={e._id} key={e._id}>
                {e.name} {e.surname}
              </option>
            )
          ) : (
            <option value={e._id} key={e._id}>
              {e.name} {e.surname}
            </option>
          ),
        )}
    </StyledSelect>
  );
});

export default UserSelect;

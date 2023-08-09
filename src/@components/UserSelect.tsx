import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, User } from "../@types";
import { useAuthStoreContext, useUserStore } from "../@store";

const UserSelect: FC<{ onChange: (e: string) => void; defaultAuthed?: boolean }> = observer(({ onChange, defaultAuthed }) => {
  const { users, setUsers } = useUserStore();
  const { user } = useAuthStoreContext();

  useEffect(() => {
    if (users && users.length < 1) {
      $api.get<Response<User[]>>(`/user/all`).then(({ data }) => {
        setUsers(data.data!);
      });
    }
  }, [user, users.length, setUsers, users]);

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

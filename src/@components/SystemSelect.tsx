import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import { Response, System } from "../@types";
import $api from "../@http";
import { useSystemStoreContext } from "../@store";

const SystemSelect: FC<{ onChange: Function; fullInfo?: Function }> = observer(({ onChange, fullInfo }) => {
  const { systems, setSystems } = useSystemStoreContext();

  useEffect(() => {
    if (systems.length < 1) {
      $api.get<Response<System[]>>(`/system/all`).then(({ data }) => {
        setSystems(data.data!);
      });
    }
  }, [systems.length, setSystems]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
        fullInfo && fullInfo(systems.find((e) => e._id === target.value));
      }}
    >
      <option value={0} disabled>
        Выберите систему
      </option>
      {systems?.map((e) => (
        <option value={e._id} key={e._id}>
          {e.name}
        </option>
      ))}
    </StyledSelect>
  );
});

export default SystemSelect;

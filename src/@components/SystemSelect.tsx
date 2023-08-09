import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import { Response, System } from "../@types";
import $api from "../@http";
import { useSystemStoreContext } from "../@store";

const SystemSelect: FC<{ onChange: (e: string) => void; fullInfo?: Function; journals?: boolean }> = observer(({ onChange, fullInfo, journals }) => {
  const { systems, setSystems } = useSystemStoreContext();

  useEffect(() => {
    if (systems && systems.length < 1) {
      $api.get<Response<System[]>>(`/system/all`).then(({ data }) => {
        setSystems(data.data!);
      });
    }
  }, [systems.length, setSystems, systems]);

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
      {systems?.map((e) =>
        journals ? (
          e.usingJournals && (
            <option value={e._id} key={e._id}>
              {e.name}
            </option>
          )
        ) : (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ),
      )}
    </StyledSelect>
  );
});

export default SystemSelect;

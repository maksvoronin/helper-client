import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import { Response, System } from "../@types";
import $api from "../@http";
import { useLoaderStore, useSystemStoreContext } from "../@store";

const SystemSelect: FC<{ onChange: (e: string) => void; fullInfo?: Function; journals?: boolean }> = observer(({ onChange, fullInfo, journals }) => {
  const { systems, setSystems, setSystemsLoaded, systemsLoaded } = useSystemStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!systemsLoaded) {
      setLoaded(true);
      $api.get<Response<System[]>>(`/system/all`).then(({ data }) => {
        setSystemsLoaded(true);
        setSystems(data.data!);
        setLoaded(false);
      });
    }
  }, [systems.length, setSystems, systems, setSystemsLoaded, systemsLoaded, setLoaded]);

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

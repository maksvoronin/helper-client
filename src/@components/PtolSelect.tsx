import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, Ptol } from "../@types";
import { useLoaderStore, usePtolStoreContext } from "../@store";

const PtolSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { ptols, setPtols, ptolsLoaded, setPtolsLoaded } = usePtolStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!ptolsLoaded) {
      setLoaded(true);
      $api.get<Response<Ptol[]>>(`/ptol/all`).then(({ data }) => {
        setPtolsLoaded(true);
        setPtols(data.data!);
        setLoaded(false);
      });
    }
  }, [ptols, setPtols, ptolsLoaded, setPtolsLoaded, setLoaded]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите ПТОЛ
      </option>
      {ptols &&
        ptols.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default PtolSelect;

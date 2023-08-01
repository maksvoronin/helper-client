import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, Ptol } from "../@types";
import { usePtolStoreContext } from "../@store";

const PtolSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { ptols, setPtols } = usePtolStoreContext();

  useEffect(() => {
    if (ptols.length < 1) {
      $api.get<Response<Ptol[]>>(`/ptol/all`).then(({ data }) => {
        setPtols(data.data!);
      });
    }
  }, [ptols]);

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

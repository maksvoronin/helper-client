import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, LokomotiveNumber } from "../@types";
import { useLokomotiveNumberStoreContext } from "../@store";

const LokomotivenumberSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { lokomotivenumbers, setLokomotiveNumbers } = useLokomotiveNumberStoreContext();

  useEffect(() => {
    if (lokomotivenumbers.length < 1) {
      $api.get<Response<LokomotiveNumber[]>>(`/lokomotivenumber/all`).then(({ data }) => {
        setLokomotiveNumbers(data.data!);
      });
    }
  }, [lokomotivenumbers]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите номер локомотива
      </option>
      {lokomotivenumbers &&
        lokomotivenumbers.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default LokomotivenumberSelect;

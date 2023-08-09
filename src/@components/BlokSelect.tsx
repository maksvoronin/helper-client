import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, Blok } from "../@types";
import { useBlokStore } from "../@store";

const BlokSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { blok, setBlok } = useBlokStore();

  useEffect(() => {
    if (blok && blok.length < 1) {
      $api.get<Response<Blok[]>>(`/blok/all`).then(({ data }) => {
        setBlok(data.data!);
      });
    }
  }, [blok, setBlok]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите БЛОК
      </option>
      {blok &&
        blok.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default BlokSelect;

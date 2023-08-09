import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, JournalMove } from "../@types";
import { useJournalMoveStore } from "../@store";

const JournalMoveSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { journalmove, setJournalMove } = useJournalMoveStore();

  useEffect(() => {
    if (journalmove && journalmove.length < 1) {
      $api.get<Response<JournalMove[]>>(`/journalmove/all`).then(({ data }) => {
        setJournalMove(data.data!);
      });
    }
  }, [journalmove, setJournalMove]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите что сделали
      </option>
      {journalmove &&
        journalmove.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default JournalMoveSelect;

import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, JournalMove } from "../@types";
import { useJournalMoveStore, useLoaderStore } from "../@store";

const JournalMoveSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { journalmove, setJournalMove, journalmoveLoaded, setJournalMoveLoaded } = useJournalMoveStore();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!journalmoveLoaded) {
      setLoaded(true);
      $api.get<Response<JournalMove[]>>(`/journalmove/all`).then(({ data }) => {
        setJournalMove(data.data!);
        setLoaded(false);
        setJournalMoveLoaded(true);
      });
    }
  }, [journalmove, setJournalMove, setLoaded, journalmoveLoaded, setJournalMoveLoaded]);

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

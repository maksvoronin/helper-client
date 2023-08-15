import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, PostNumber } from "../@types";
import { useLoaderStore, usePostNumberStore } from "../@store";

const PostnumberSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { postnumber, setPostNumber, postnumberLoaded, setPostNumberLoaded } = usePostNumberStore();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!postnumberLoaded) {
      setLoaded(true);
      $api.get<Response<PostNumber[]>>(`/postnumber/all`).then(({ data }) => {
        setPostNumber(data.data!);
        setLoaded(false);
        setPostNumberLoaded(true);
      });
    }
  }, [postnumber, setPostNumber, postnumberLoaded, setPostNumberLoaded, setLoaded]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите какой номер поставили
      </option>
      {postnumber &&
        postnumber.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default PostnumberSelect;

import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, Road } from "../@types";
import { useLoaderStore, useRoadStoreContext } from "../@store";

const RoadSelect: FC<{ onChange: (e: string) => void; value?: string }> = observer(({ onChange, value }) => {
  const { roads, setRoads, roadsLoaded, setRoadsLoaded } = useRoadStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!roadsLoaded) {
      setLoaded(true);
      $api.get<Response<Road[]>>(`/road/all`).then(({ data }) => {
        setRoadsLoaded(true);
        setRoads(data.data!.sort((a, b) => (a.name < b.name ? -1 : 1)));
        setLoaded(false);
      });
    }
  }, [roads, setRoads, roadsLoaded, setRoadsLoaded, setLoaded]);

  if (value) {
    return (
      <StyledSelect
        value={value}
        onChange={({ target }: any) => {
          onChange(target.value);
        }}
      >
        <option value={0} disabled>
          Выберите дорогу
        </option>
        {roads &&
          roads.map((e) => (
            <option value={e._id} key={e._id}>
              {e.name}
            </option>
          ))}
      </StyledSelect>
    );
  }

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите дорогу
      </option>
      {roads &&
        roads.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default RoadSelect;

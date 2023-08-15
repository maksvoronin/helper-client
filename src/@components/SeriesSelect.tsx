import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import { Response, Series } from "../@types";
import $api from "../@http";
import { useLoaderStore, useSeriesStoreContext } from "../@store";

const SeriesSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { series, setSeries, seriesLoaded, setSeriesLoaded } = useSeriesStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!seriesLoaded) {
      setLoaded(true);
      $api.get<Response<Series[]>>(`/series/all`).then(({ data }) => {
        setSeriesLoaded(true);
        setSeries(data.data!);
        setLoaded(false);
      });
    }
  }, [series.length, setSeries, series, seriesLoaded, setSeriesLoaded, setLoaded]);
  return (
    <StyledSelect defaultValue={0} onChange={({ target }: any) => onChange(target.value)}>
      <option value={0} disabled>
        Выберите серию
      </option>
      {series?.map((e) => (
        <option value={e._id} key={e._id}>
          {e.name}
        </option>
      ))}
    </StyledSelect>
  );
});

export default SeriesSelect;

import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import { Response, Series } from "../@types";
import $api from "../@http";
import { useSeriesStoreContext } from "../@store";

const SeriesSelect: FC<{ onChange: Function }> = observer(({ onChange }) => {
  const { series, setSeries } = useSeriesStoreContext();

  useEffect(() => {
    if(series.length < 1) {
      $api.get<Response<Series[]>>(`/series/all`).then(({ data }) => {
        setSeries(data.data!);
      });
    }
  }, [series.length, setSeries]);
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

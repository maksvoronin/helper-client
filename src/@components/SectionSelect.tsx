import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, Section } from "../@types";
import { useLoaderStore, useSectionStoreContext } from "../@store";

const SectionSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { sections, setSections, sectionLoaded, setSectionLoaded } = useSectionStoreContext();
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    if (!sectionLoaded) {
      setLoaded(true);
      $api.get<Response<Section[]>>(`/section/all`).then(({ data }) => {
        setSections(data.data!);
        setSectionLoaded(true);
        setLoaded(false);
      });
    }
  }, [sections, setSections, sectionLoaded, setLoaded, setSectionLoaded]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите секцию
      </option>
      {sections &&
        sections.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default SectionSelect;

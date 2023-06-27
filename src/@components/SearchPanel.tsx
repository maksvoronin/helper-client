import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Input } from "../@shared";

const SearchPanel: FC<{ initialValue?: string }> = observer(({ initialValue }) => {
  const [searchText, setSearchText] = useState<string>(initialValue || "");

  return (
    <>
      <Input placeholder="Поиск" value={searchText} onChange={({ target }) => setSearchText(target.value)} />
    </>
  );
});

export default SearchPanel;

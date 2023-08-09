import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { StyledSelect } from "../@shared";
import $api from "../@http";
import { Response, PostScript } from "../@types";
import { usePostScriptStoreContext } from "../@store";

const PostScriptSelect: FC<{ onChange: (e: string) => void }> = observer(({ onChange }) => {
  const { postscripts, setPostScripts } = usePostScriptStoreContext();

  useEffect(() => {
    if (postscripts && postscripts.length < 1) {
      $api.get<Response<PostScript[]>>(`/postscript/all`).then(({ data }) => {
        setPostScripts(data.data!);
      });
    }
  }, [postscripts, setPostScripts]);

  return (
    <StyledSelect
      defaultValue={0}
      onChange={({ target }: any) => {
        onChange(target.value);
      }}
    >
      <option value={0} disabled>
        Выберите приписку
      </option>
      {postscripts &&
        postscripts.map((e) => (
          <option value={e._id} key={e._id}>
            {e.name}
          </option>
        ))}
    </StyledSelect>
  );
});

export default PostScriptSelect;

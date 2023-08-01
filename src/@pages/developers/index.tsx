import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { FC } from "react";
import { DevelopersLayout } from "../../@layouts";

const Developers: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}>
    Welcome
  </DevelopersLayout>
});

export default Developers;
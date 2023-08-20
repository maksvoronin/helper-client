import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";

const CreateAPIApplication: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}></DevelopersLayout>
});

export default CreateAPIApplication;
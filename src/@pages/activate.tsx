import { FC } from "react";
import { PageProps } from "../@types";
import { observer } from "mobx-react";
import { DefaultLayout } from "../@layouts";

const Activate: FC<PageProps> = observer(({ title }) => {
  return <DefaultLayout title={title}></DefaultLayout>;
});

export default Activate;

import { FC, useEffect, useState } from "react";
import { Application, PageProps, Response } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import $api from "../../../@http";
import { AppsContainer } from "../../../@shared";
import { AppsCard } from "../../../@components";

const AllApplications: FC<PageProps> = observer(({ title }) => {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    $api.get<Response<Application[]>>("/application/all").then(({ data }) => {
      setApps(data.data!);
    });
  }, []);

  return (
    <DevelopersLayout title={title}>
      <AppsContainer>{apps && apps.map((e) => <AppsCard app={e} key={e._id}></AppsCard>)}</AppsContainer>
    </DevelopersLayout>
  );
});

export default AllApplications;

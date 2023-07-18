import { FC, useEffect, useState } from "react";
import { PageProps, Decision, Response } from "../@types";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../@layouts";
import $api from "../@http";
import { DecisionBlock } from "../@components";

const DetailDecision: FC<PageProps> = observer(({title}) => {

  const {id} = useParams();
  const [decision, setDecision] = useState<Decision>({} as Decision);

  useEffect(() => {
    if(id) {
      $api.get<Response<Decision>>(`/decision/get?id=${id}`).then(({data}) => {
        setDecision(data.data!);
      })
    }
  }, [id]);

  if(!decision) return <></>;

  return <MainLayout title={title}>
    {decision && decision._id && <DecisionBlock decision={decision}  /> }
  </MainLayout>

});

export default DetailDecision;
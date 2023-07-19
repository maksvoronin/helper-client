import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { IAlert } from "../@types";
import { onAlert, onClosed } from "../@services";
import { Alert } from "../@components";

const Alerts = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 320px;
  cursor: default;
  z-index: 99;

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;

const AlertPanel = observer(() => {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    const onAlertSubscription$ = onAlert().subscribe((v) => {
      setAlerts([...alerts, v]);
    });

    const onClosedSubscription$ = onClosed().subscribe((id) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    });

    return () => {
      onAlertSubscription$.unsubscribe();
      onClosedSubscription$.unsubscribe();
    };
  }, [alerts]);

  return <Alerts>{alerts && alerts.map((e: IAlert, i: number) => <Alert key={i} id={i} {...e} />)}</Alerts>;
});

export default AlertPanel;

import { useEffect, useState } from "react";
import { onAlert, onClosed } from "../../@services/alerting.service";
import { IAlert } from "../../@types/alert.interface";
import Alert from "../Alert/Alert";
import s from './alertpanel.module.scss';

const AlertPanel = () => {

  const [alerts, setAlerts] = useState<IAlert[]>([]);

  useEffect(() => {
    const onAlertSubscription$ = onAlert().subscribe(v => {
      setAlerts([
        ...alerts,
        v
      ]);
    });

    const onClosedSubscription$ = onClosed().subscribe(id => {
      setAlerts(
        alerts.filter(alert => alert.id !== id)
      );
    });

    return () => {
      onAlertSubscription$.unsubscribe();
      onClosedSubscription$.unsubscribe();
    };
  }, [alerts]);


  return (
    <div className={s.alertPanel}>
      {
        alerts && alerts.map((e: IAlert, i: number) => <Alert
          key={i}
          id={i}
          {...e}
        />)
      }
    </div>
  )
}

export default AlertPanel;
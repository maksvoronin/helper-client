import { Observable, Subject } from 'rxjs';
import { IAlert } from '../@types';

const alertsSubject = new Subject<IAlert>();
const closedAlertsSubject = new Subject<number>();

const alert = (type: "default" | "error", title: string, message: string, time: number = 1.5): void => {
  alertsSubject.next({
    id: Math.round(window.performance.now()*10),
    title, type, message, time
  });
};

const onAlert = (): Observable<IAlert> => {
  return alertsSubject
    .asObservable();
};

const close = (id: number): void => {
  closedAlertsSubject.next(id);
};

const onClosed = (): Observable<number> => {
  return closedAlertsSubject
    .asObservable()
};

export {alert, onAlert, close, onClosed};
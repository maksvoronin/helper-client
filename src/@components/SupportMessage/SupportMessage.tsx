import { FC, PropsWithChildren } from 'react';
import s from './supportmessage.module.scss';

export interface SupportData {
  sid: number;
  content: string;
  responsed: boolean;
  response?: { content: string; date: number };
}

const SupportMessage: FC<PropsWithChildren<SupportData>> = ({
  sid,
  content,
  responsed,
  response,
}) => {
  return <div className={s.supportMessage}>
    <h1>Обращение #{sid} <i>({responsed ? "Отвечено" : "Не отвечено"})</i></h1>
    <p>{content}</p>
    {
      responsed && response && <p className={s.response}><i>{new Date(response.date).toLocaleString()}</i> {response.content}</p>
    }
  </div>;
};

export default SupportMessage;

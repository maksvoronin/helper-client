import React, { useEffect } from "react";
import { close } from "../../@services/alerting.service";
import { IAlert } from "../../@types/alert.interface";
import s from './alert.module.scss';

const Alert : React.FC<IAlert> = ({id, type, title, message, time, onClick}) => {


  useEffect(() => {
    if (time && id){
      const timer = setTimeout(() => {
        close(id);
      }, time * 1_000);

      return () => {
        clearTimeout(timer);
      };
    }
    
  }, [id, time]);

  if(id) {
    return(
      <div className={`${s.alert} ${s[type]}`} onClick={onClick} id={`alert${id}`}>
        <div className={s.close} onClick={() => close(id)}>&times;</div>
        <p className={s.title}>{title}</p>
        <p className={s.message}>{message}</p>
      </div>
    );
  } else {
    return(
      <div className={`${s.alert} ${s[type]}`} onClick={onClick}>
        <p className={s.title}>{title}</p>
        <p className={s.message}>{message}</p>
      </div>
    );
  }
}

export default Alert;
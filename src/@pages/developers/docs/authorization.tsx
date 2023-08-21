import { FC } from "react";
import { PageProps } from "../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../@layouts";
import { Code, DevTitle, FormText } from "../../../@shared";

const Authorization: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Авторизация</DevTitle>
      <FormText>Авторизация необходима, если Вы планируете не только просматривать общие данные (системы, замечания и тп), а полноценно работать с сервисом (создание решений/замечаний)</FormText>
      <FormText>Чтобы получить доступ к управлению аккаунтом пользователя, необходимо, чтобы он самостоятельно вошёл в свой аккаунт в вашем приложении, для этого ему нужно перейти по ссылке</FormText>
      <Code>https://helper.voronin.xyz/auth/login/application?app_id=&lt;APPLICATION_ID&gt;</Code>
      <FormText>
        Где <code>APPLICATION_ID</code> - идентификатор Вашего приложения, который Вы можете посмотреть на странице приложения. Учтите, что в личном кабинете приложения должен быть указан URI на который сервер будет
        перенаправлять пользователя, чтобы Вы могли получить токен в параметре <code>user_token</code>. Без этого страница авторизации будет недоступна.
      </FormText>
      <FormText>
        То есть, чтобы авторизоваться пользователю, нужно сформировать ссылку и указать в личном кабинете адрес куда после авторизации сервер будет перенаправлять человека, в данном примере это будет{" "}
        <code>https://helper.voronin.xyz/authed</code>
      </FormText>
      <Code>https://helper.voronin.xyz/auth/login/application?app_id=06dcSOME_APP_ID</Code>
      <FormText>И после успешной авторизации сервер перенаправит пользователя на URI</FormText>
      <Code>https://helper.voronin.xyz/authed?user_token=some_user_token</Code>
    </DevelopersLayout>
  );
});
export default Authorization;

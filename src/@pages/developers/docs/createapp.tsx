import { observer } from "mobx-react";
import { FC } from "react";
import { DevelopersLayout } from "../../../@layouts";
import { PageProps } from "../../../@types";
import { FormText, Link, DevTitle } from "../../../@shared";
import { baseURIs } from "../../../config";

const CreateApp: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>Создание приложения</DevTitle>
      <FormText>Приложение нужно, чтобы Вы могли работать с нашим API под своими данными и доступами, отслеживать статистику и получать новости об изменениях интерфейса</FormText>
      <FormText>
        Создание приложения происходит по <Link to={`/${baseURIs.developers}/apps/create`}>ссылке</Link>. В этой форме Вам необходимо указать название приложения, описание, где и как им можно воспользоваться. После успешного
        создания Вам будет доступен собственный токен приложения, который нужно будет указывать при выполнении запросов.
      </FormText>
    </DevelopersLayout>
  );
});

export default CreateApp;

import { observer } from "mobx-react";
import { FC } from "react";
import { DevelopersLayout } from "../../@layouts";
import { FormText } from "../../@shared";

const NotFound: FC = observer(() => {
  return <DevelopersLayout title="Страница не найдена">
    <FormText>Страница не найдена</FormText>
  </DevelopersLayout>
});

export default NotFound;
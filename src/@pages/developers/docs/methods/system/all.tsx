import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { PageProps } from "../../../../../@types";
import { FC } from "react";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const SystemAll: FC<PageProps> = observer(({title}) => {
  return <DevelopersLayout title={title}>
    <DevTitle>О методе system / all</DevTitle>
    <FormText>Метод возвращает полный список систем</FormText>
    <FormText>Пример запроса:</FormText>
    <Code>{config.publicapi}/&lt;TokenApp&gt;/system/all</Code>
    <FormText>Пример ответа:</FormText>
    <Code>
      {
        `{
          "status": "ok",
          "message": "Системы получены",
          "data": [
              {
                  "_id": "647b36623c463aa636dbfc80",
                  "name": "тест123",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "915af7dc-a33b-4636-ba99-eab13681b609",
                  "visible": true,
                  "created": 1685795454122,
                  "events": [
                      {
                          "event": "name",
                          "prev": "тест",
                          "new": "тест123",
                          "by": "647b32993c463aa636dbfc5a",
                          "date": 1689626022510
                      }
                  ],
                  "__v": 1,
                  "usingJournals": false
              },
              {
                  "usingJournals": true,
                  "_id": "64b5a1221f4daa4efe314f51",
                  "name": "testsys",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "42607c18-b362-41cf-94c5-499414bb9b52",
                  "visible": true,
                  "created": 1689566175629,
                  "events": [],
                  "__v": 0
              }
          ]
      }`
      }
    </Code>
  </DevelopersLayout>
});

export default SystemAll;
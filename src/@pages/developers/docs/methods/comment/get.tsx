import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const GetComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе comment / get</DevTitle>
      <FormText>Метод возвращает одно замечание по уникальному <code>id</code></FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/get?id=647b36883c463aa636dbfc9c</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
        {
          "status": "ok",
          "message": "Замечание получено",
          "data": {
              "_id": "647b36883c463aa636dbfc9c",
              "content": "/*798798498",
              "by": "647b32993c463aa636dbfc5a",
              "link": "65aa202a-58d3-4587-8686-06ea4f1b5bf8",
              "visible": true,
              "created": 1685795454536,
              "system": {
                  "_id": "647b36623c463aa636dbfc80",
                  "name": "тест123",
                  "by": { ...User },
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
              "series": {
                  "_id": "647b36673c463aa636dbfc89",
                  "name": "123",
                  "by": { ...User }
                  "link": "95e18bf8-322a-4ffb-8053-885e963025ff",
                  "visible": true,
                  "created": 1685795454205,
                  "events": [],
                  "__v": 0
              },
              "decisions": [ ... Decisions ],
              "events": [
                  {
                      "type": "comment",
                      "prev": "УУУУ",
                      "new": "УУУУ 123",
                      "by": "647b32993c463aa636dbfc5a",
                      "date": 1689711751343
                  },
                  {
                      "type": "comment",
                      "prev": "УУУУ 123",
                      "new": "УУУУ",
                      "by": "647b32993c463aa636dbfc5a",
                      "date": 1689711787572
                  },
                  {
                      "type": "comment",
                      "prev": "УУУУ",
                      "new": "УУУУ 1",
                      "by": "647b32993c463aa636dbfc5a",
                      "date": 1689711907032
                  },
                  {
                      "type": "comment",
                      "prev": "УУУУ 1",
                      "new": "/*798798498",
                      "by": "647b32993c463aa636dbfc5a",
                      "date": 1690901741520
                  }
              ],
              "__v": 11,
              "comments": [
                  "647b3c53ef92148e5c049e9b"
              ]
          }
      }
        `}
      </Code>
    </DevelopersLayout>
  );
});

export default GetComment;

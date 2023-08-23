import { FC } from "react";
import { PageProps } from "../../../../../@types";
import { observer } from "mobx-react";
import { DevelopersLayout } from "../../../../../@layouts";
import { Code, DevTitle, FormText } from "../../../../../@shared";
import config from "../../../../../config";

const AboutComment: FC<PageProps> = observer(({ title }) => {
  return (
    <DevelopersLayout title={title}>
      <DevTitle>О методе comment / all</DevTitle>
      <FormText>Метод возвращает массив замечаний</FormText>
      <FormText>Пример запроса:</FormText>
      <Code>{config.publicapi}/&lt;TokenApp&gt;/comment/all</Code>
      <FormText>Пример ответа:</FormText>
      <Code>
        {`
          {
            "status": "ok",
            "message": "Замечания получены",
            "data": [{
              "_id": "647b36883c463aa636dbfc9c",
              "content": "/*798798498",
              "by": "647b32993c463aa636dbfc5a",
              "link": "65aa202a-58d3-4587-8686-06ea4f1b5bf8",
              "visible": true,
              "created": 1685795454536,
              "system": {
                "_id": "647b36623c463aa636dbfc80",
                "name": "тест123",
                "by": "User",
                "__v": 1,
                "usingJournals": false
              },
              "series": {
                "_id": "647b36673c463aa636dbfc89",
                "name": "123",
                "by": "User",
                "decisions": [{
                  "_id": "647b36883c463aa636dbfca3",
                  "content": "123123",
                  "by": "64b4d40e1f4daa4efe314cf1",
                  "link": "4dc4fe73-3767-41a2-b2f2-7c94dd2372f8",
                  "visible": true,
                  "created": 1685795454547,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "",
                  "events": [{
                    "type": "content",
                    "prev": "123123",
                    "new": "123123",
                    "by": "647b32993c463aa636dbfc5a",
                    "date": 1689769194183
                  }, {
                    "type": "content",
                    "prev": "123123",
                    "new": "123123",
                    "by": "647b32993c463aa636dbfc5a",
                    "date": 1689769200514
                  }],
                  "__v": 49,
                  "comments": [ ... Commentaries ]
                }, {
                  "_id": "64ae97c664e881707b9e6094",
                  "content": "test dec",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "98dfcfa5-87b6-4ff5-9cd0-34d9bb40f76f",
                  "visible": true,
                  "created": 1689158328673,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "1689163716844_314.3979829889929.xlsx",
                  "events": [],
                  "comments": [],
                  "__v": 0
                }, {
                  "_id": "64ae983364e881707b9e60bf",
                  "content": "some dec1",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "98dfcfa5-87b6-4ff5-9cd0-34d9bb40f76f",
                  "visible": true,
                  "created": 1689158328673,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "1689163817024_361.91863693774565.docx",
                  "events": [],
                  "comments": [],
                  "__v": 0
                }, {
                  "_id": "64ae986064e881707b9e60cd",
                  "content": "123",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "98dfcfa5-87b6-4ff5-9cd0-34d9bb40f76f",
                  "visible": true,
                  "created": 1689158328673,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "1689163870591_197.65533647304468.xlsx",
                  "events": [],
                  "comments": [],
                  "__v": 0
                }, {
                  "_id": "64b280d0a19d1b08dba40433",
                  "content": "tetete",
                  "by": "647b32993c463aa636dbfc5a",
                  "link": "46cc761f-b913-4e2f-aaee-0fd90a7442c8",
                  "visible": true,
                  "created": 1689415979906,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "1689419982737_312.4026483344065.mp4",
                  "events": [],
                  "comments": [],
                  "__v": 0
                }, {
                  "_id": "64b6f03a547cffdfb6336fe3",
                  "content": "test",
                  "by": "64b4d40e1f4daa4efe314cf1",
                  "link": "486465f5-6ef7-4dc6-b7a8-044acdeebce3",
                  "visible": true,
                  "created": 1689707023977,
                  "comment": "647b36883c463aa636dbfc9c",
                  "file": "",
                  "events": [],
                  "comments": [],
                  "__v": 0
                }],
                "events": [{
                  "type": "comment",
                  "prev": "УУУУ",
                  "new": "УУУУ 123",
                  "by": "647b32993c463aa636dbfc5a",
                  "date": 1689711751343
                }, {
                  "type": "comment",
                  "prev": "УУУУ 123",
                  "new": "УУУУ",
                  "by": "647b32993c463aa636dbfc5a",
                  "date": 1689711787572
                }, {
                  "type": "comment",
                  "prev": "УУУУ",
                  "new": "УУУУ 1",
                  "by": "647b32993c463aa636dbfc5a",
                  "date": 1689711907032
                }, {
                  "type": "comment",
                  "prev": "УУУУ 1",
                  "new": "/*798798498",
                  "by": "647b32993c463aa636dbfc5a",
                  "date": 1690901741520
                }],
                "__v": 11,
                "comments": ["647b3c53ef92148e5c049e9b"]
              }
            }]
          }`}
      </Code>
    </DevelopersLayout>
  );
});

export default AboutComment;

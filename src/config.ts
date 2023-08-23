export const dev_mode: boolean = false;
export const dev_version: string = "2.4.4";

const config = {
  dev_title: `Release v${dev_version} (Development Platform)`,
  API: dev_mode ? `http://192.168.0.105:1000/api` : `https://helper.voronin.xyz/api`,
  publicapi: "https://helper.voronin.xyz/api/dev",
  fileHost: dev_mode ? `http://192.168.0.105:1000/api/public` : `https://helper.voronin.xyz/api/public`,
  fileUpload: dev_mode ? `http://192.168.0.105:1000/api/file/upload` : `https://helper.voronin.xyz/api/file/upload`,
  imageExt: [".bmp", ".gif", ".ico", ".png", ".jpg", ".jpeg", ".webp", ".heif", ".jp2", ".svg"],
  videoExt: [".mov", ".mp4", ".mp3", ".avi", ".mpeg", ".mpg", ".webm", ".wmv"],
};

export const changelog = [
  { version: "2.4.4", steps: ["Платформа для разработчиков: главная страница", "Платформа для разработчиков: документация интерфейсов" ] },
  { version: "2.4.3", steps: ["Платформа для разработчиков: документация методов comment", "Платформа для разработчиков: документация методов decision", "Платформа для разработчиков: адаптив для входа сторонних приложений"] },
  { version: "2.4.2", steps: ["Платформа для разработчиков: документация методов system", "Платформа для разработчиков: документация ответов на запросы"] },
  { version: "2.4.1", steps: ["Платформа для разработчиков: страница авторизации сторонних приложений", "Платформа для разработчиков: указание URI для авторизации"] },
  {
    version: "2.4",
    steps: [
      "Платформа для разработчиков: создание приложений",
      "Платформа для разработчиков: изменение приложения",
      "Платформа для разработчиков: список приложений",
      "Платформа для разработчиков: документация приложений",
      "Платформа для разработчиков: документация работы с API",
    ],
  },
  { version: "2.3", steps: ["Добавлен модуль статистики"] },
  { version: "2.2", steps: ["Добавлен changelog", "Исправления бесконечных загрузок"] },
  { version: "2.1", steps: ["Добавление рейтинга", "Добавлены журналы", "Подключение рекламной сети"] },
  { version: "2.0", steps: ["Добавление комментариев", "Полный редизайн и рефакторинг проекта"] },
];

export const baseURIs = {
  main: "",
  auth: "/auth",
  developers: "/developers",
  admin: "/admin",
};

export default config;

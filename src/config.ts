export const dev_mode: boolean = true;
export const dev_version: string = "2.4";

const config = {
  dev_title: `Release v${dev_version} (Development Platform)`,
  API: dev_mode ? `http://192.168.0.105:1000/api` : `https://helper.voronin.xyz/api`,
  fileHost: dev_mode ? `http://192.168.0.105:1000/api/public` : `https://helper.voronin.xyz/api/public`,
  fileUpload: dev_mode ? `http://192.168.0.105:1000/api/file/upload` : `https://helper.voronin.xyz/api/file/upload`,
  imageExt: [".bmp", ".gif", ".ico", ".png", ".jpg", ".jpeg", ".webp", ".heif", ".jp2", ".svg"],
  videoExt: [".mov", ".mp4", ".mp3", ".avi", ".mpeg", ".mpg", ".webm", ".wmv"],
};

export const changelog = [
  { version: "2.4", steps: ["Платформа для разработчиков: создание приложений", "Платформа для разработчиков: изменение приложения", "Платформа для разработчиков: список приложений"] },
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

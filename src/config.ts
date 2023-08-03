export const dev_mode = false;

const config = {
  dev_title: "Journals v2.1.5 (Fix selects on load)",
  API: dev_mode ? `http://192.168.0.110:1000/api` : `https://helper.voronin.xyz/api`,
  fileHost: dev_mode ? `http://192.168.0.110:1000/api/public` : `https://helper.voronin.xyz/api/public`,
  fileUpload: dev_mode ? `http://192.168.0.110:1000/api/file/upload` : `https://helper.voronin.xyz/api/file/upload`,
  imageExt: [".bmp", ".gif", ".ico", ".png", ".jpg", ".jpeg", ".webp", ".heif", ".jp2", ".svg"],
  videoExt: [".mov", ".mp4", ".mp3", ".avi", ".mpeg", ".mpg", ".webm", ".wmv"],
};

export default config;

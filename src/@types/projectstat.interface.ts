export default interface ProjectStat {
  _id: string;
  date: string;
  platforms: { platform: string; count: number }[];
}

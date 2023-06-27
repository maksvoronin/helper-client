export default interface Response<T = {}> {
  type: "error" | "success",
  message: string,
  data?: T
};
import axios from "axios";

export const getTasks = () => {
  return axios.get("/api/task");
};
export const addTask = ({ data }) => {
  return axios.post("/api/task", data);
};

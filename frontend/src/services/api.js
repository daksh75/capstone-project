import axios from "axios";

const API = axios.create({
  baseURL: "https://capstone-project-backend-tvmj.onrender.com/api",
});

export default API;
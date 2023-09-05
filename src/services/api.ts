import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const token = cookies["serenity.app.token"];

const api = axios.create({
  baseURL: "http://15.228.47.39:3000",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;

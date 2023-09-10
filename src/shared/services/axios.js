import axios from "axios";
import { api } from "../const/url.js";
const ACCESS_TOKEN = localStorage.getItem("token") || "";
export const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

import axios from "axios";
import { api } from "../const/url.js";
const ACCESS_TOKEN = localStorage.getItem("token") || "";
export const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

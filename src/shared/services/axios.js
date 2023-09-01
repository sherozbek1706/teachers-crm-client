import axios from "axios";
import { api } from "../const/url.js";
export const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

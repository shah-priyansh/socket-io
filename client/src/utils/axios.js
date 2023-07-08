import axios from "axios";

const api = axios.create({
  baseURL: "https://group-chat-laz6.onrender.com/",
});

api.interceptors.request.use();

export default api;

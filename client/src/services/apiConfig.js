import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "heroku link here" //heroku link here once we deploy
    : "http://localhost:3000";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;

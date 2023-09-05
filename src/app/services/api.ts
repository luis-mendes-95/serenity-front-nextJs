import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXNAbWFpbC5jb20iLCJpYXQiOjE2OTM1MTI2MzEsImV4cCI6MTcyNTA0ODYzMSwic3ViIjoiMGM3YjQ1NGYtNDQxMi00MzkyLThlMDAtY2I4MjY4MjUyNGI5In0.tDiWS4DRekjGwVjXg5FQ7YE2FmzTDoMa1_ERs4Vvc5I"; 

const api = axios.create({
  baseURL: "http://15.228.47.39:3000",
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;

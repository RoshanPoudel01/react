import axios from "axios";


const instance = axios.create({
  baseURL: 'http://localhost:9000/api/',
  origin: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  }
  });

  export default instance;

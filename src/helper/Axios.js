import axios from "axios";


const instance = axios.create({
  baseURL: 'http://localhost:9000/api/',
  origin: true,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
  


// Add a response interceptor
setTimeout(
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized error globally
      // For example, you can redirect the user to the login page
        localStorage.removeItem("usertoken");
         localStorage.removeItem("userrole");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
),1000)



  export default instance;

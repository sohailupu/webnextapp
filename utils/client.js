import axios from "axios";
import { authStore } from "../stores/auth.store";
import { Toast } from "./toastify/toast";

// const api = "https://api.dev.upu.io/v1/";
const api = "https://api.upu.io/v1/";
// const api = "http://192.168.1.107:8080/v1/";
// const api = "http://localhost:8080/v1/";

const instance = axios.create({
  baseURL: api,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authStore.logOut();
      // localStorage.removeItem("token");
      // localStorage.removeItem("AuthStore");
    } else if (error.response.status === 404) {
      Toast("error", "404 Not Found");
    } else if (error.response.status === 403) {
      Toast("error", "403 Forbidden");
    } else if (error.response.status === 400) {
      Toast("error", "400 Bad Request");
    } else if (error.response.status === 500) {
      Toast("error", "500 Internal Server Error");
    } else if (error.response.status === 502) {
      Toast("error", "502 Bad Gateway");
    } else {
      Toast("error", `${error.response.status} - Network Error`);
    }
    // return Promise.reject(error);
  }
);

export { instance };

// import axios from "axios";
// import { authStore } from "../stores/auth.store";
// import { Toast } from "./toastify/toast";

// const api = "https://api.upu.io/v1/";

// const instance = axios.create({
//   baseURL: api,
//   headers: typeof window === 'undefined' ? { /* SSR-specific headers */ } : {}
// });

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         if (typeof window !== 'undefined') {
//           authStore.logOut();
//           localStorage.removeItem("token");
//           localStorage.removeItem("AuthStore");
//         }
//       } else if (error.response.status === 404) {
//         if (typeof window !== 'undefined') {
//           Toast("error", "404 Not Found");
//         }
//       } else if (error.response.status === 403) {
//         if (typeof window !== 'undefined') {
//           Toast("error", "403 Forbidden");
//         }
//       } else if (error.response.status === 400) {
//         if (typeof window !== 'undefined') {
//           Toast("error", "400 Bad Request");
//         }
//       } else if (error.response.status === 500) {
//         if (typeof window !== 'undefined') {
//           Toast("error", "500 Internal Server Error");
//         }
//       } else if (error.response.status === 502) {
//         if (typeof window !== 'undefined') {
//           Toast("error", "502 Bad Gateway");
//         }
//       } else {
//         if (typeof window !== 'undefined') {
//           Toast("error", `${error.response.status} - Network Error`);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export { instance };

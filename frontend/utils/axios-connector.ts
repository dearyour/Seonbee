import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACK;
const axiosConnector = axios.create({
  baseURL,
});

axiosConnector.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("Token");

    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      config.withCredentials = false;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosConnector.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { data, status } = error.response;
    //if (status == 500) router.push({ name: 'Error' })
    return Promise.reject(error);
  }
);

// axios 객체 생성
export default axiosConnector;

// 사용법 예시
// import axiosConnector from "utils/axios-connector";
// GET
// axiosConnector
//   .get(`userinfo/${this.content.userId}`)
//   .then((res) => {})
//   .catch((err) => {});
// POST (Create)
// axiosConnector
//   .post("/playlist", formData)
//   .then((res) => {})
//   .catch((err) => {});

// axiosConnector({
//   method: "get",
//   url: "member", //http://localhost:8000/api/member
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err.response);
//   });

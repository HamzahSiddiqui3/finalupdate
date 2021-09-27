import axios from "axios";

const API_URL = "http://localhost:2000/user/";

const register = (u_name, u_email, u_mobile, u_address, u_password) => {
  return axios.post(API_URL + "signup", {
    u_name,
    u_email,
    u_mobile,
    u_address,
    u_password,
  });
};

const login = (email, password) => {
  console.log(email,password);
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      localStorage.setItem("role", JSON.stringify(response.data.role));
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

import axios from "axios";
import authHeader from "./auth-header";

const imageUrl = "http://localhost:2000";
const API_URL = "http://localhost:2000/products/";

const getProducts = () => {
  return axios.get(API_URL + "displayProducts", { headers: authHeader() });
};

const addProducts = (data) => {
  return axios.post(API_URL + "addProduct", data, { headers: authHeader() });
};

const getProduct = (id) => {
  return axios.get(API_URL + `getProducts/${id}`,  { headers: authHeader() });
};

const editProduct = (data,id) => {
  return axios.put(API_URL + `editProducts/${id}`,data,  { headers: authHeader() });
};


const removeProducts = (id) => {
  return axios.delete(API_URL + `deleteProducts/${id}`, { headers: authHeader() });
};

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

export default {
  getProducts,
  addProducts,
  imageUrl,
  removeProducts,
  getProduct,
  editProduct,
  API_URL
};

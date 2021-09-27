import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:2000/cart/";
const USER_URL = "http://localhost:2000/user/";
const ORDER_URL = "http://localhost:2000/order/";


const addToCart = (id) => {
  console.log(id)
  return axios.get(API_URL + `addtocart/${id}`, { headers: authHeader() });
};

const cart = () => {
  return axios.get(API_URL + `displayCart`, { headers: authHeader() });
};

const userDetail=(id)=>{
  return axios.get(USER_URL + `information/${id}`);

}


const orders=(data)=>{
  return axios.post(ORDER_URL + `addOrders`,data);

}

export default {
  addToCart,
  cart,
  userDetail,
  orders
};

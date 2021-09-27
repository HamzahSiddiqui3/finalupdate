const express = require("express")
const Router = express.Router();
const { addOrders, showOrders,removeOrders } = require("./../controller/order");
const checkAuth = require("./../middlewares/check-auth");


Router.post("/addOrders", addOrders)

Router.get("/displayCart", showOrders)


Router.delete("/removetocart/:pid", checkAuth, removeOrders)


module.exports = Router;

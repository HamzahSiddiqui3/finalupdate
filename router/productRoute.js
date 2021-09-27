const express = require("express")
const Router = express.Router();
const { addProduct, showProducts,getProducts ,editProducts, deleteProducts } = require("./../controller/product");
const checkAuth = require("./../middlewares/check-auth");
const checkFile = require("./../middlewares/file");


Router.post("/addProduct",checkFile, addProduct)
Router.get("/displayProducts", showProducts)
Router.get("/getProducts/:id", checkAuth, getProducts)
Router.put("/editProducts/:id", checkAuth,checkFile, editProducts)
Router.delete("/deleteProducts/:id", deleteProducts)


module.exports = Router;
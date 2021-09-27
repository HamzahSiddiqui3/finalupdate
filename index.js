const express = require("express");
const cors=require("cors");
const app = express();
const adminMongoose = require("./database/db")
const path = require("path");
app.use(express.json())
app.use(cors())

const adminRoute = require("./router/adminRoute")
const userRoute = require("./router/userRoute")
const productRoute = require("./router/productRoute")
const categoryRoute = require("./router/categoryRoute");
const cartRoute=require("./router/cartRoute")
const orderRoute=require("./router/orderRoute");
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use("/images", express.static(path.join("images")))

app.use("*", (req, res, next) => {
    console.log("error 404")
})


app.listen(2000, () => {
    console.log("connected to server")
})
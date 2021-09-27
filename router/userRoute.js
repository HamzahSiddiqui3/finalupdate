const express = require("express")
const Router = express.Router();
const { saveUser, userLogin,getUser } = require("./../controller/user");

Router.post("/login", userLogin)
Router.post("/signup", saveUser)
Router.get("/information/:id", getUser)

module.exports = Router;
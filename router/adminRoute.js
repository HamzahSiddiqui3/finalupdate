const express = require("express")
const Router = express.Router();
const { saveUser, userLogin } = require("./../controller/admin");

Router.post("/login", userLogin)
Router.post("/signup", saveUser)

module.exports = Router;
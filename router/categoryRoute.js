const express = require("express")
const Router = express.Router();
const { addCategory, showCategory } = require("./../controller/category");
const checkAuth = require("./../middlewares/check-auth");


Router.post("/addCategory", checkAuth, addCategory)
Router.get("/displayCategory", checkAuth, showCategory)


module.exports = Router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluSWQiOiI2MTRmMjc4ZTExNTBiZWNiNjQ5NzlhYWYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzI1Nzg5OTgsImV4cCI6MTYzMjU4MjU5OH0.HzhY3 - 82 rzq5fEFwQp4lC6qf4yRi78TkmE7Sm_joW_8
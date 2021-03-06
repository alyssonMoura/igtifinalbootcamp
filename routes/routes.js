const express = require("express");
const transactionService = require("../services/transactionService");
const transactionRouter = express.Router();
transactionRouter.post("/filter", transactionService.findFilterAll);
transactionRouter.get("/:period", transactionService.findAll);
transactionRouter.get("/edt/:id", transactionService.findOne);
transactionRouter.patch("/:id", transactionService.update);
transactionRouter.post("/", transactionService.create);
transactionRouter.delete("/:id", transactionService.remove);
module.exports = transactionRouter;

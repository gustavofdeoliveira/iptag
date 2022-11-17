const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Importações necessárias
const userController = require("../controllers/user");
const userAuth = require("../middlewares/auth");

//ROTAS com seus respectivos controllers e middlewares

router.post(
  "/createUser",
  [body("nome", "nome é necessário").exists({ checkFalsy: true })],
  [body("setor", "setor é necessário").exists({ checkFalsy: true })],
  [body("cargo", "cargo é necessário").exists({ checkFalsy: true })],
  [body("senha", "senha é necessária").exists({ checkFalsy: true })],
  userController.verifyToken,
  inteliController.rewardStudent
);

//Exporta o ROUTER
module.exports = router;
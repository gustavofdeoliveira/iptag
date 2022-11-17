const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Importações necessárias
const userController = require("../controllers/user");
const userAuth = require("../middlewares/auth");

//ROTAS com seus respectivos controllers e middlewares

router.post(
  "/create",
  [body("nome", "nome é necessário").exists({ checkFalsy: true })],
  [body("setor", "setor é necessário").exists({ checkFalsy: true })],
  [body("cargo", "cargo é necessário").exists({ checkFalsy: true })],
  [body("email", "email é necessário").exists({ checkFalsy: true })],
  [body("senha", "senha é necessária").exists({ checkFalsy: true })],
  userController.createUser
);

router.post(
  "/login",
  [body("email", "email é necessário").exists({ checkFalsy: true })],
  [body("senha", "senha é necessária").exists({ checkFalsy: true })],
  userController.login
);

router.get("/get", userAuth, userController.getUser);

router.get("/getUsers", userAuth, userController.getUsers);

router.put("/update", userAuth, userController.updateUser);

router.delete("/delete", userAuth, userController.deleteUser);

//Exporta o ROUTER
module.exports = router;

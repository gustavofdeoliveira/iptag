const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Importações necessárias
const userController = require("../controllers/user");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

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

router.get("/get", verifyToken, userController.getUser);

router.get("/getUsers", verifyAdmin, userController.getUsers);

router.put("/update", verifyToken, userController.updateUser);

router.put("/updateAdmin", verifyAdmin, userController.updateUserAdmin);

router.delete("/delete", verifyToken, userController.deleteUser);

router.delete(
  "/deleteAdmin",
  [body("id", "id de usuário é necessário").exists({ checkFalsy: true })],
  verifyAdmin,
  userController.deleteUserAdmin
);

//Exporta o ROUTER
module.exports = router;

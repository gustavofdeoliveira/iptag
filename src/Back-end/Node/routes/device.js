const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Importações necessárias
const deviceController = require("../controllers/device");
const userAuth = require("../middlewares/auth");

//ROTAS com seus respectivos controllers e middlewares

router.post(
  "/create",
  [body("nome", "nome é necessário").exists({ checkFalsy: true })],
  [body("data", "data de criação é necessária").exists({ checkFalsy: true })],
  [
    body("dataDeInstalacao", "data de criação é necessária").exists({
      checkFalsy: true,
    }),
  ],
  userAuth,
  deviceController.createDevice
);

router.get("/get", userAuth, deviceController.getDevice);

router.get("/getDevices", userAuth, deviceController.getDevices);

router.put("/update", userAuth, deviceController.updateDevice);

router.delete("/delete", userAuth, deviceController.deleteDevice);

//Exporta o ROUTER
module.exports = router;

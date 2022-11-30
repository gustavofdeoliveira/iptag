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
  [
    body("mac_address", "mac address do dispositivo é necessário").exists({
      checkFalsy: true,
    }),
  ],
  [
    body(
      "dt_instalacao",
      "data de instalação do dispositivo é necessária"
    ).exists({
      checkFalsy: true,
    }),
  ],
  [
    body(
      "origem_predio",
      "prédio de origem do dispositivo é necessário"
    ).exists({ checkFalsy: true }),
  ],
  [
    body("origem_sala", "sala de origem do dispositivo é necessária").exists({
      checkFalsy: true,
    }),
  ],
  [
    body("setor_origem", "setor de origem do dispositivo é necessário").exists({
      checkFalsy: true,
    }),
  ],
  [
    body("responsavel", "responsavel do dispositivo é necessário").exists({
      checkFalsy: true,
    }),
  ],
  [
    body("tipo", "tipo do dispositivo é necessário").exists({
      checkFalsy: true,
    }),
  ],
  userAuth,
  deviceController.createDevice
);

router.get("/get", userAuth, deviceController.getDevice);

router.get("/getDevices", userAuth, deviceController.getDevices);

router.put(
  "/update",
  [body("id", "id é necessário").exists({ checkFalsy: true })],
  userAuth,
  deviceController.updateDevice
);

router.delete("/delete", userAuth, deviceController.deleteDevice);

//Exporta o ROUTER
module.exports = router;

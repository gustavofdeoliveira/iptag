const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//Importações necessárias
const deviceController = require("../controllers/device");
const {
  verifyToken,
  verifyAdmin,
  verifyDevice,
} = require("../middlewares/auth");

//ROTAS com seus respectivos controllers e middlewares

router.post("/cadastro", verifyDevice, deviceController.cadastroDevice);

router.post(
  "/create",
  [
    body("id_cadastro", "id do dispositivo na fila é necessário").exists({
      checkFalsy: true,
    }),
  ],
  [body("nome", "nome é necessário").exists({ checkFalsy: true })],
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
  verifyAdmin,
  deviceController.createDevice
);

router.post(
  "/move",
  [
    body(
      "mac_address_moved",
      "mac address do dispositivo que se moveu é necessário"
    ).exists({ checkFalsy: true }),
  ],
  [
    body(
      "mac_address_router",
      "mac address do dispositivo que se moveu é necessário"
    ).exists({ checkFalsy: true }),
  ],
  verifyDevice,
  deviceController.moveDevice
);

router.get("/getCadastro", verifyAdmin, deviceController.getAllDevicesCadastro);

router.get("/get", verifyToken, deviceController.getDevice);

router.get("/getDevices", verifyToken, deviceController.getDevices);

router.put(
  "/update",
  [body("id", "id é necessário").exists({ checkFalsy: true })],
  verifyAdmin,
  deviceController.updateDevice
);

router.delete("/delete", verifyAdmin, deviceController.deleteDevice);

router.delete(
  "/deleteCadastro",
  [body("id", "id é necessário").exists({ checkFalsy: true })],
  verifyAdmin,
  deviceController.deleteCadastro
);

router.post("/send", verifyToken, deviceController.sendDevice);

//Exporta o ROUTER
module.exports = router;

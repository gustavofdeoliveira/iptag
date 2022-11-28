const service = require("../services/device");
require("express-async-errors");

const createDevice = (req, res) => {
  const {
    nome,
    origemPredio,
    origemSala,
    setor,
    responsavel,
    apelido,
    status,
  } = req.body;
  const device = new service.Device(
    nome,
    origemPredio,
    origemSala,
    setor,
    responsavel,
    apelido,
    status
  );

  device.createDevice().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });

  return device;
};

const getDevice = (req, res) => {
  const { nome, apelido, id } = req.headers;

  console.log(req.headers);

  console.log(nome);

  const device = new service.Device();

  device.getDevice(nome, apelido, id).then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

const getDevices = (req, res) => {
  const device = new service.Device();

  device.getDevices().then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

const updateDevice = (req, res) => {
  const {
    id,
    nome,
    dtInstalacao,
    origemPredio,
    origemSala,
    setor,
    responsavel,
    apelido,
    status,
    destinoSala,
    destinoPredio,
  } = req.body;

  const device = new service.Device();

  device
    .editDevice(
      id,
      nome,
      dtInstalacao,
      origemPredio,
      origemSala,
      setor,
      responsavel,
      apelido,
      status,
      destinoSala,
      destinoPredio
    )
    .then((resul) => {
      if (resul.type === "error") {
        res.status(500).json({
          error: resul.message,
        });
      } else {
        res.status(200).json({
          message: resul.message,
        });
      }
    });
};

const deleteDevice = (req, res) => {
  const { id } = req.body;

  const device = new service.Device();

  device.deleteDevice(id).then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
      });
    }
  });
};

module.exports = {
  createDevice,
  getDevice,
  getDevices,
  updateDevice,
  deleteDevice,
};

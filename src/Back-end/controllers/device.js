const service = require("../services/device");
const { body, validationResult } = require("express-validator");

require("express-async-errors");

const cadastroDevice = (req, res) => {
  const { nome, mac_address } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const device = new service.Device();

  try {
    device.cadastroDevice(nome, mac_address).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const createDevice = (req, res) => {
  const {
    id_cadastro,
    nome,
    apelido,
    dt_instalacao,
    origem_predio,
    origem_sala,
    setor_origem,
    responsavel,
    tipo,
  } = req.body;
  const device = new service.Device(
    nome,
    apelido,
    dt_instalacao,
    origem_predio,
    origem_sala,
    setor_origem,
    responsavel,
    tipo
  );

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  try {
    device.createDevice(id_cadastro).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getAllDevicesCadastro = (req, res) => {
  const device = new service.Device();

  try {
    device.getAllDevicesCadastro().then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getDevice = (req, res) => {
  const { nome, apelido, id } = req.headers;

  const device = new service.Device();

  try {
    device.getDevice(nome, apelido, id).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const getDevices = (req, res) => {
  const device = new service.Device();

  try {
    device.getDevices().then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const updateDevice = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const {
    id,
    nome,
    apelido,
    mac_address,
    dt_instalacao,
    origem_predio,
    origem_sala,
    setor_origem,
    responsavel,
    tipo,
    status,
    atual_predio,
    atual_sala,
    dt_rastreio,
    hr_rastreio,
    dt_atualizacao,
  } = req.body;

  const device = new service.Device();

  try {
    device
      .editDevice(
        id,
        nome,
        apelido,
        mac_address,
        dt_instalacao,
        origem_predio,
        origem_sala,
        setor_origem,
        responsavel,
        tipo,
        status,
        atual_predio,
        atual_sala,
        dt_rastreio,
        hr_rastreio,
        dt_atualizacao
      )
      .then((resul) => {
        res.status(200).json({
          message: resul.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const moveDevice = (req, res) => {
  const { mac_address_router, mac_address_moved } = req.body;

  console.log(req.body);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const device = new service.Device();

  try {
    device.moveDevice(mac_address_router, mac_address_moved).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteDevice = (req, res) => {
  const { id } = req.body;

  const device = new service.Device();

  try {
    device.deleteDevice(id).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteCadastro = (req, res) => {
  const { id } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const device = new service.Device();

  try {
    device.deleteCadastro(id).then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const sendDevice = (req, res) => {
  const { mac_address } = req.body;

  const device = new service.Device();

  try {
    device.sendDevice(mac_address).then((resul) => {
      res.status(200).json({
        message: resul,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const bateryDevice = (req, res) => {
  const { mac_address, batery } = req.body;

  const device = new service.Device();

  try {
    device.bateryDevice(mac_address, batery).then((resul) => {
      res.status(200).json({
        message: resul,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  cadastroDevice,
  createDevice,
  getAllDevicesCadastro,
  getDevice,
  getDevices,
  updateDevice,
  deleteDevice,
  deleteCadastro,
  moveDevice,
  sendDevice,
  bateryDevice,
};

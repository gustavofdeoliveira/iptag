const service = require("../services/device");
const { body, validationResult } = require("express-validator");

require("express-async-errors");

const cadastroDevice = (req, res) => {
  const { nome, mac_address } = req.body;

  const device = new service.Device();

  device.cadastroDevice(nome, mac_address).then((resul) => {
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

  device.createDevice(id_cadastro).then((resul) => {
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

const getAllDevicesCadastro = (req, res) => {
  const device = new service.Device();

  device.getAllDevicesCadastro().then((resul) => {
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

const getDevice = (req, res) => {
  const { nome, apelido, id } = req.headers;

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

  device.moveDevice(mac_address_router, mac_address_moved).then((resul) => {
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

const deleteCadastro = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const { id } = req.body;

  const device = new service.Device();

  device.deleteCadastro(id).then((resul) => {
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

const sendDevice = (req, res) => {
  const { mac_address } = req.body;

  const device = new service.Device();

  device.sendDevice(mac_address).then((resul) => {
    if (resul === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      console.log(resul);
      res.status(200).json({
        message: resul,
      });
    }
  });

};

const bateryDevice = (req, res) => {
  const { mac_address, batery } = req.body;

  const device = new service.Device();

  device.bateryDevice(mac_address, batery).then((resul) => {
    if (resul === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      console.log(resul);
      res.status(200).json({
        message: resul,
      });
    }
  });
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
  bateryDevice
};

const service = require("../services/user");
const { body, validationResult } = require("express-validator");
require("express-async-errors");

const createUser = (req, res) => {
  const { nome, setor, cargo, email, senha } = req.body;
  const user = new service.User(nome, setor, cargo, email, senha);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  user.createUser().then((resul) => {
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

  return user;
};

const login = (req, res) => {
  const { email, senha } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const user = new service.User();

  user.login(email, senha).then((resul) => {
    if (resul.type === "error") {
      res.status(500).json({
        error: resul.message,
      });
    } else {
      res.status(200).json({
        message: resul.message,
        token: resul.token,
      });
    }
  });
};

const getUser = (req, res) => {
  const { userId } = req;

  const user = new service.User();

  user.getUser(userId).then((resul) => {
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

const getUsers = (req, res) => {
  const user = new service.User();

  user.getUsers().then((resul) => {
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

const updateUser = (req, res) => {
  const { nome, setor, cargo, email } = req.body;
  const { userId } = req;

  const user = new service.User();

  user.editUser(userId, nome, setor, cargo, email).then((resul) => {
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

const updateUserAdmin = (req, res) => {
  const { is_admin, userId } = req.body;

  const user = new service.User();

  user.editUserAdmin(is_admin, waiting, userId).then((resul) => {
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

const deleteUser = (req, res) => {
  const { userId } = req;

  const user = new service.User();

  user.deleteUser(userId).then((resul) => {
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

const deleteUserAdmin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const { id } = req.body;

  const user = new service.User();

  user.deleteUserAdmin(id).then((resul) => {
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
  createUser,
  login,
  getUser,
  getUsers,
  updateUser,
  updateUserAdmin,
  deleteUser,
  deleteUserAdmin,
};

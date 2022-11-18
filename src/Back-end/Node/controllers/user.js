const service = require("../services/user");
require("express-async-errors");

const createUser = (req, res) => {
  const { nome, setor, cargo, email, senha } = req.body;
  const user = new service.User(nome, setor, cargo, email, senha);

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
  console.log(req);

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

module.exports = {
  createUser,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

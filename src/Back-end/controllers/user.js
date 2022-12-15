const service = require("../services/user");
const { validationResult } = require("express-validator");
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
    res
      .status(200)
      .json({
        message: resul.message,
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  });
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

  user
    .login(email, senha)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
        token: resul.token,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

const getUser = (req, res) => {
  const { userId } = req;

  const user = new service.User();

  user
    .getUser(userId)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

const getUsers = (req, res) => {
  const user = new service.User();

  user
    .getUsers()
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

const updateUser = (req, res) => {
  const { nome, setor, cargo, email } = req.body;
  const { userId } = req;

  const user = new service.User();

  user
    .editUser(userId, nome, setor, cargo, email)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

const updateUserAdmin = (req, res) => {
  const { is_admin, userId } = req.body;

  const user = new service.User();

  user
    .editUserAdmin(is_admin, userId)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

const deleteUser = (req, res) => {
  const { userId } = req;

  const user = new service.User();

  user
    .deleteUser(userId)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

const deleteUserAdmin = (req, res) => {
  const { id } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.errors[0].msg,
    });
  }

  const user = new service.User();

  user
    .deleteUserAdmin(id)
    .then((resul) => {
      res.status(200).json({
        message: resul.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
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

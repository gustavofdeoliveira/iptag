const jwt = require("jsonwebtoken");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { name } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = name;
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { name } = jwt.verify(token, process.env.JWT_SECRET);
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    const user = await db.get(`SELECT * \ FROM users \ WHERE id=${name}`);

    if (user.is_admin === 0) {
      throw new Error("Não possui permissão para essa atividade");
    }
    req.userId = name;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
};

const verifyDevice = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    if (jwt.verify(token, process.env.JWT_DEVICE)) {
      return next();
    }

    throw new Error("Dispositivo sem permissão");
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { verifyToken, verifyAdmin, verifyDevice };

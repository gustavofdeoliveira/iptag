const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbInstance = require("../database");
require("dotenv").config();
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite')
const { open } = require('sqlite')
class User {
  constructor(nome, setor, cargo, email, senha) {
    this.name = nome;
    this.sector = setor;
    this.role = cargo;
    this.email = email;
    this.password = senha;

  }


  async createUser() {
    // Pegando a instancia do db
    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    // Pegando todos os usuários que possuem o email que o usuário informou
    const rowsEmailUser = await db.all(
      `SELECT * \ FROM users \ WHERE email = "${this.email}"`
    );

    if (rowsEmailUser[0] == this.email) {
      const error = {
        type: "error",
        message: "Usuário já existente com esse email",
      };
      return error;
    }

    // Encriptando a senha do usuário caso ele tenha passado a senha
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 8);
      this.password = hashedPassword;
    }

    // Inserindo as informações no db
    const inserction = await db.run(
      "INSERT INTO users (nome, setor, cargo, email, senha) VALUES (?,?,?,?,?)",
      [this.name, this.sector, this.role, this.email, this.password]
    );

    // Checando se todas as informações foram inseridas no db
    if (inserction.changes === 0) {
      const error = {
        type: "error",
        message: "Database error",
      };
      return error;
    }

    const sucess = {
      type: "sucess",
      message: "User created with sucess",
    };

    return sucess;
  }

  async login(emailAuth, passwordAuth) {
    // Pegando a instancia do db
    let passwordMatch;
    let token;

    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    const password = await db.get(
      `SELECT * FROM users WHERE email='${emailAuth}'`
    );

    const userId = await db.get(
      `SELECT id FROM users WHERE email='${emailAuth}'`
    );

    if (password) {
      passwordMatch = await bcrypt.compare(passwordAuth, password);
    }

    if (!passwordMatch) {
      const error = {
        type: "error",
        message: "Invalid password",
      };
    }

    token = await jwt.sign(
      {
        name: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const sucess = {
      type: "success",
      token,
      message: "Token created with success",
    };

    return sucess;
  }

  async getUser(userId) {
    // Pegando a instancia do db
    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    const userInfo = await db.get(
      `SELECT * \ FROM users \ WHERE id = "${userId}"`
    );

    if (!userInfo) {
      const error = {
        type: "error",
        message: "Nothing found for this user",
      };
      return error;
    }

    const sucess = {
      type: "sucess",
      message: userInfo,
    };

    return sucess;
  }

  async getUsers() {
    // Pegando a instancia do db
    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    const userInfo = await db.get(
      `SELECT * \ FROM users \ ORDER BY id DESC`
    );

    if (!userInfo) {
      const error = {
        type: "error",
        message: "Nothing found for this user",
      };
      return error;
    }

    const sucess = {
      type: "sucess",
      message: userInfo,
    };

    return sucess;
  }

  async editUser(userId, nome, setor, cargo, email) {
    // Pegando a instancia do db
    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    let queryComponent = [];

    if (!userId) {
      const error = {
        type: "error",
        message: "Invalid user",
      };
      return error;
    }

    const user = await db.get(`SELECT * \ FROM users \ WHERE id = "${userId}"`);

    if (!user) {
      const error = {
        type: "error",
        message: "Nothing in the database from this user",
      };
      return error;
    }

    if (nome) {
      queryComponent.push(`name="${nome}"`);
    }
    if (setor) {
      queryComponent.push(`name="${setor}"`);
    }
    if (cargo) {
      queryComponent.push(`name="${cargo}"`);
    }
    if (email) {
      queryComponent.push(`name="${email}"`);
    }

    if (!nome && !setor && !cargo && !email) {
      const error = {
        type: "error",
        message: "Nothing to update",
      };
      return error;
    }

    const queryJoined = queryComponent.join(",");

    const update = await db.run(
      `UPDATE users SET ${queryJoined} WHERE id="${userId}"`
    );
    if (update.changes === 0) {
      const error = {
        type: "error",
        message: "Database Error, please try again later",
      };
      return error;
    }
    //Informa a atualização
    const sucess = {
      type: "sucess",
      message: "Informations Updated",
    };

    return sucess;
  }

  async deleteUser(userId) {
    // Pegando a instancia do db
    const db = await sqlite.open({ filename: './database/database.db', driver: sqlite3.Database });

    if (!userId) {
      const error = {
        type: "error",
        message: "Invalid user",
      };
      return error;
    }

    const rowsId = await db.all(
      `SELECT * \ FROM users \ WHERE id = "${userId}"`
    );

    if (!rowsId[0]) {
      const error = {
        type: "error",
        message: "User not found",
      };
      return error;
    }

    //Efetua a deleção
    const deletedUser = await db.run(`DELETE FROM users WHERE id="${userId}"`);
    //Verifica se a chamada para o DB ocorreu sem problemas
    if (deletedUser.changes == 0) {
      const error = {
        type: "error",
        message: "Database Error, please try again later",
      };
      return error;
    }
    //Mostra a validação de que o usuário foi deletado
    const sucess = {
      type: "sucess",
      message: "Informations Deleted",
    };

    return sucess;
  }
}
module.exports = { User };

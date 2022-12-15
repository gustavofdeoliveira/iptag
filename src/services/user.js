const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
class User {
  constructor(nome, setor, cargo, email, senha) {
    this.name = nome;
    this.sector = setor;
    this.role = cargo;
    this.email = email;
    this.password = senha;
    this.db = open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });
  }

  async createUser() {
    // Pegando a instancia do db
    const db = await this.db;

    // Pegando todos os usuários que possuem o email que o usuário informou
    const rowsEmailUser = await db.all(
      `SELECT * \ FROM users \ WHERE email = "${this.email}"`
    );

    if (rowsEmailUser[0]) {
      throw new Error("Usuário já existente com esse email");
    }

    // Encriptando a senha do usuário caso ele tenha passado a senha
    const hashedPassword = await bcrypt.hash(this.password, 8);
    this.password = hashedPassword;

    // Inserindo as informações no db
    const inserction = await db.run(
      "INSERT INTO users (nome, setor, cargo, email, senha) VALUES (?,?,?,?,?)",
      [this.name, this.sector, this.role, this.email, this.password]
    );

    // Checando se todas as informações foram inseridas no db
    if (inserction.changes === 0) {
      throw new Error("Database error");
    }

    const sucess = {
      type: "sucess",
      message: "User created with sucess",
    };

    return sucess;
  }

  async login(emailAuth, passwordAuth) {
    // Pegando a instancia do db
    let token;

    const db = await this.db;

    const user = await db.get(
      `SELECT * \ FROM users \ WHERE email='${emailAuth}'`
    );

    if (!user) {
      throw new Error("User does't exists");
    }

    let passwordMatch = await bcrypt.compare(passwordAuth, user.senha);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }
    token = await jwt.sign(
      {
        name: user.id,
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
    const db = await this.db;

    const userInfo = await db.get(
      `SELECT * \ FROM users \ WHERE id = "${userId}"`
    );

    if (!userInfo) {
      throw new Error("Nothing found for this user");
    }

    const sucess = {
      type: "sucess",
      message: userInfo,
    };

    return sucess;
  }

  async getUsers() {
    // Pegando a instancia do db
    const db = await this.db;

    const userInfo = await db.all(`SELECT * \ FROM users \ ORDER BY id DESC`);

    if (!userInfo) {
      throw new Error("Nothing found for this user");
    }

    const sucess = {
      type: "sucess",
      message: userInfo,
    };

    return sucess;
  }

  async editUser(userId, nome, setor, cargo, email) {
    // Pegando a instancia do db
    const db = await this.db;

    let queryComponent = [];

    if (!userId) {
      throw new Error("Invalid user");
    }

    const user = await db.get(`SELECT * \ FROM users \ WHERE id = "${userId}"`);

    if (!user) {
      throw new Error("Nothing in the database from this user");
    }

    if (nome) {
      queryComponent.push(`nome="${nome}"`);
    }
    if (setor) {
      queryComponent.push(`setor="${setor}"`);
    }
    if (cargo) {
      queryComponent.push(`cargo="${cargo}"`);
    }
    if (email) {
      queryComponent.push(`email="${email}"`);
    }

    if (!nome && !setor && !cargo && !email) {
      throw new Error("Nothing to update");
    }

    const queryJoined = queryComponent.join(",");

    const update = await db.run(
      `UPDATE users SET ${queryJoined} WHERE id="${userId}"`
    );
    if (update.changes === 0) {
      throw new Error("Database Error, please try again late");
    }
    //Informa a atualização
    const sucess = {
      type: "sucess",
      message: "Informations Updated",
    };

    return sucess;
  }

  async editUserAdmin(is_admin, userId) {
    const db = await this.db;

    let queryComponent = [];

    if (is_admin === 0 || is_admin === 1) {
      queryComponent.push(`is_admin=${is_admin}`);
    }

    const queryJoined = queryComponent.join(",");

    console.log(`UPDATE users SET ${queryJoined} WHERE id="${userId}"`);

    const update = await db.run(
      `UPDATE users SET ${queryJoined} WHERE id="${userId}"`
    );
    if (update.changes === 0) {
      throw new Error("Database Error, please try again later");
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
    const db = await this.db;

    if (!userId) {
      throw new Error("Invalid user");
    }

    const rowsId = await db.get(
      `SELECT * \ FROM users \ WHERE id = "${userId}"`
    );

    console.log(rowsId);

    if (!rowsId) {
      throw new Error("User not found");
    }

    //Efetua a deleção
    const deletedUser = await db.run(`DELETE FROM users WHERE id="${userId}"`);
    //Verifica se a chamada para o DB ocorreu sem problemas
    if (deletedUser.changes == 0) {
      throw new Error("Database Error, please try again later");
    }
    //Mostra a validação de que o usuário foi deletado
    const sucess = {
      type: "sucess",
      message: "Informations Deleted",
    };

    return sucess;
  }

  async deleteUserAdmin(userId) {
    // Pegando a instancia do db
    const db = await this.db;

    const rowsId = await db.get(
      `SELECT * \ FROM users \ WHERE id = "${userId}"`
    );
    if (!rowsId) {
      throw new Error("User not found");
    }

    //Efetua a deleção
    const deletedUser = await db.run(`DELETE FROM users WHERE id="${userId}"`);
    //Verifica se a chamada para o DB ocorreu sem problemas
    if (deletedUser.changes == 0) {
      throw new Error("Database Error, please try again later");
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

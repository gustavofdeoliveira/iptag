const bcrypt = require("bcrypt");
const dbInstance = require("../database");

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
    const db = dbInstance();

    // Pegando todos os usuários que possuem o email que o usuário informou
    const rowsEmailUser = await db.all(
      `SELECT * \ FROM users \ WHERE email = "${this.email}"`
    );

    if (rowsEmailUser[0] == this.email) {
      throw new Error("Usuário já existente com esse email");
    }

    // Encriptando a senha do usuário caso ele tenha passado a senha
    if (this.password) {
      const hashedPassword = await bcrypt.hash(this.password, 8);
      this.password = hashedPassword;
    }

    // Inserindo as informações no db
    const inserction = await db.run(
      "INSERT INTO users (nome, setor, cargo, senha, email) VALUES (?,?,?,?,?)",
      [this.name, this.sector, this.role, this.password, this.email]
    );

    // Checando se todas as informações foram inseridas no db
    if (inserction.changes === 0) {
      throw new Error("Database error");
    }
  }
}

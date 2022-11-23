const dbInstance = require("../database");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const { open } = require("sqlite");
class Device {
  constructor(
    nome,
    origemPredio,
    origemSala,
    setor,
    responsavel,
    apelido,
    status
  ) {
    this.nome = nome;
    this.origemPredio = origemPredio;
    this.origemSala = origemSala;
    this.setor = setor;
    this.responsavel = responsavel;
    this.apelido = apelido;
    this.status = status;
  }

  async createDevice() {
    // Pegando a instancia do db
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    // Pegando todos os dispositivos que possuem o nome que o usuário informou
    const rowsNamesDevices = await db.all(
      `SELECT * \ FROM device \ WHERE nome = "${this.nome}"`
    );

    if (rowsNamesDevices[0]) {
      const error = {
        type: "error",
        message: "Dispositivo já existente",
      };
      return error;
    }

    // Inserindo as informações no db
    const inserction = await db.run(
      "INSERT INTO device (nome, origem_predio, origem_sala, setor, responsavel, apelido, status, dt_instalacao) VALUES (?,?,?,?,?,?,?, DateTime('now','localtime'))",
      [
        this.nome,
        this.origemPredio,
        this.origemSala,
        this.setor,
        this.responsavel,
        this.apelido,
        this.status,
      ]
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
      message: "Device created with sucess",
    };

    return sucess;
  }

  async getDevice(nome, apelido, id) {
    if (!nome && !apelido && !id) {
      const error = {
        type: "error",
        message: "Nothing passed to search",
      };
      return error;
    }
    // Pegando a instancia do db
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    if (nome) {
      const deviceInfo = await db.all(
        `SELECT * \ FROM device \ WHERE nome = "${nome}"`
      );
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
    } else if (apelido) {
      const deviceInfo = await db.all(
        `SELECT * \ FROM device \ WHERE apelido = "${apelido}"`
      );
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
    } else if (id) {
      const deviceInfo = await db.all(
        `SELECT * \ FROM device \ WHERE id = "${id}"`
      );
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
    } else {
      const error = {
        type: "error",
        message: "Nothing found for this device",
      };
      return error;
    }
  }

  async getDevices() {
    // Pegando a instancia do db
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    const devicesInfo = await db.all(
      `SELECT * \ FROM device \ ORDER BY id DESC`
    );

    if (!devicesInfo) {
      const error = {
        type: "error",
        message: "Nothing found",
      };
      return error;
    }

    const sucess = {
      type: "sucess",
      message: devicesInfo,
    };

    return sucess;
  }

  async editDevice(
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
  ) {
    if (!id) {
      const error = {
        type: "error",
        message: "Id was not passed",
      };
      return error;
    }
    if (
      !nome &&
      !dtInstalacao &&
      !origemPredio &&
      !origemSala &&
      !setor &&
      !responsavel &&
      !apelido &&
      !status &&
      !destinoSala &&
      !destinoPredio
    ) {
      const error = {
        type: "error",
        message: "Nothing to update",
      };
      return error;
    }
    // Pegando a instancia do db
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    let queryComponent = [];

    const device = await db.get(`SELECT * \ FROM device \ WHERE id = "${id}"`);

    if (!device) {
      const error = {
        type: "error",
        message: "Nothing in the database from this device",
      };
      return error;
    }

    if (nome) {
      const device = await db.all(
        `SELECT * \ FROM device \ WHERE nome = "${nome}"`
      );
      if (device[0]) {
        const error = {
          type: "error",
          message: "This name already exist",
        };
        return error;
      } else {
        queryComponent.push(`nome="${nome}"`);
      }
    }
    if (dtInstalacao) {
      queryComponent.push(`dt_instalacao="${dtInstalacao}"`);
    }
    if (origemPredio) {
      queryComponent.push(`origem_predio="${origemPredio}"`);
    }
    if (origemSala) {
      queryComponent.push(`origem_sala="${origemSala}"`);
    }
    if (setor) {
      queryComponent.push(`setor="${setor}"`);
    }
    if (responsavel) {
      queryComponent.push(`responsavel="${responsavel}"`);
    }
    if (apelido) {
      queryComponent.push(`apelido="${apelido}"`);
    }
    if (status) {
      queryComponent.push(`status="${status}"`);
    }
    if (destinoSala) {
      queryComponent.push(`destino_sala="${destinoSala}"`);
    }
    if (destinoPredio) {
      queryComponent.push(`destino_predio="${destinoPredio}"`);
    }

    const queryJoined = queryComponent.join(",");

    const update = await db.run(
      `UPDATE device SET ${queryJoined}, dt_atualizacao=DateTime('now','localtime') WHERE nome="${nome}"`
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

  async deleteDevice(id) {
    // Pegando a instancia do db
    const db = await sqlite.open({
      filename: "./database/database.db",
      driver: sqlite3.Database,
    });

    if (!id) {
      const error = {
        type: "error",
        message: "Any id provided",
      };
      return error;
    }

    const rowsId = await db.get(`SELECT * \ FROM device \ WHERE id = "${id}"`);

    if (!rowsId) {
      const error = {
        type: "error",
        message: "Device not found",
      };
      return error;
    }

    //Efetua a deleção
    const deletedDevice = await db.run(`DELETE FROM device WHERE id="${id}"`);
    //Verifica se a chamada para o DB ocorreu sem problemas
    if (deletedDevice.changes == 0) {
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
module.exports = { Device };

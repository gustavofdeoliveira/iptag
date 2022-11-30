const dbInstance = require("../database");
require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const { open } = require("sqlite");
class Device {
  constructor(
    nome,
    apelido,
    mac_address,
    dt_instalacao,
    origem_predio,
    origem_sala,
    setor_origem,
    responsavel,
    tipo
  ) {
    (this.nome = nome),
      (this.apelido = apelido),
      (this.macAddress = mac_address),
      (this.dtInstalacao = dt_instalacao),
      (this.origemPredio = origem_predio),
      (this.origemSala = origem_sala),
      (this.setorOrigem = setor_origem),
      (this.responsavel = responsavel),
      (this.tipo = tipo);
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
      "INSERT INTO device (nome, apelido, mac_address, dt_instalacao, origem_predio, origem_sala, setor_origem, responsavel, tipo) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        this.nome,
        this.apelido,
        this.macAddress,
        this.dtInstalacao,
        this.origemPredio,
        this.origemSala,
        this.setorOrigem,
        this.responsavel,
        this.tipo,
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
      if (!deviceInfo[0]) {
        const error = {
          type: "error",
          message: "Nothing found for this device",
        };
        return error;
      }
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
    } else if (apelido) {
      const deviceInfo = await db.all(
        `SELECT * \ FROM device \ WHERE apelido = "${apelido}"`
      );
      if (!deviceInfo[0]) {
        const error = {
          type: "error",
          message: "Nothing found for this device",
        };
        return error;
      }
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
    } else if (id) {
      const deviceInfo = await db.all(
        `SELECT * \ FROM device \ WHERE id = "${id}"`
      );
      if (!deviceInfo[0]) {
        const error = {
          type: "error",
          message: "Nothing found for this device",
        };
        return error;
      }
      const sucess = {
        type: "sucess",
        message: deviceInfo,
      };

      return sucess;
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
  ) {
    if (
      !nome &&
      !apelido &&
      !mac_address &&
      !dt_instalacao &&
      !origem_predio &&
      !origem_sala &&
      !setor_origem &&
      !responsavel &&
      !tipo &&
      !status &&
      !atual_predio &&
      !atual_sala &&
      !dt_rastreio &&
      !hr_rastreio &&
      !dt_atualizacao
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
    if (apelido) {
      queryComponent.push(`apelido="${apelido}"`);
    }
    if (mac_address) {
      queryComponent.push(`mac_address="${mac_address}"`);
    }
    if (dt_instalacao) {
      queryComponent.push(`dt_instalacao="${dt_instalacao}"`);
    }
    if (origem_predio) {
      queryComponent.push(`origem_predio="${origem_predio}"`);
    }
    if (origem_sala) {
      queryComponent.push(`origem_sala"${origem_sala}"`);
    }
    if (setor_origem) {
      queryComponent.push(`setor_origem="${setor_origem}"`);
    }
    if (responsavel) {
      queryComponent.push(`responsavel="${responsavel}"`);
    }
    if (tipo) {
      queryComponent.push(`tipo="${tipo}"`);
    }
    if (status) {
      queryComponent.push(`status="${status}"`);
    }
    if (atual_predio) {
      queryComponent.push(`atual_predio="${atual_predio}"`);
    }
    if (atual_sala) {
      queryComponent.push(`atual_sala="${atual_sala}"`);
    }
    if (dt_rastreio) {
      queryComponent.push(`dt_rastreio="${dt_rastreio}"`);
    }
    if (hr_rastreio) {
      queryComponent.push(`hr_rastreio="${hr_rastreio}"`);
    }
    if (dt_atualizacao) {
      queryComponent.push(`dt_atualizacao="${dt_atualizacao}"`);
    }

    const queryJoined = queryComponent.join(",");

    const update = await db.run(
      `UPDATE device SET ${queryJoined} WHERE id="${id}"`
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

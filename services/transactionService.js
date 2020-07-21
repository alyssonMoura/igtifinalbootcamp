const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require("../models/TransactionModel");

const findAll = async (req, res) => {
  const period = req.params.period;

  try {
    const data = await TransactionModel.find({ yearMonth: period }).sort({
      day: 1,
    });
    if (data.length < 1) {
      res.status(404).send({ message: "Nenhum Transação encontrado" });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction `);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};
const findFilterAll = async (req, res) => {
  const period = req.body.period;
  const value = req.body.value;

  try {
    const data = await TransactionModel.find({
      yearMonth: period,
      description: { $regex: new RegExp(value), $options: "i" },
    }).sort({
      day: 1,
    });
    if (data.length < 1) {
      res.status(404).send({ message: "Nenhum Transação encontrado" });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction `);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  //condicao para o filtro no findAll

  try {
    const data = await TransactionModel.findOne({ _id: id });
    if (!data) {
      res.status(404).send({ message: "Transação não encontrado" });
    } else {
      res.send(data);
    }
    logger.info(`GET /transaction - ${id}`);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar o transaction id: " + id });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Dados para atualizacao vazio",
    });
  }
  const transaction = req.body;
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      transaction,
      {
        new: true,
      }
    );
    if (!data) {
      res.status(404).send({ message: "Transação não encontrado" });
    } else {
      res.send({ message: "transaction atualizado com sucesso" });
    }

    logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar a transaction id: " + id });
    logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });
    if (!data) {
      res.status(404).send({ message: "Transação não encontrado" });
    } else {
      res.send({ message: "Transação excluida com sucesso" });
    }

    logger.info(`DELETE /transaction - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Nao foi possivel deletar a transação id: " + id });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

const create = async (req, res) => {
  console.log(req.body);
  const description = req.body.description;
  const value = req.body.value;
  const category = req.body.category;
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const yearMonth = req.body.yearMonth;
  const yearMonthDay = req.body.yearMonthDay;
  const type = req.body.type;
  const transaction = new TransactionModel({
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  });
  try {
    const data = await transaction.save();
    if (data) {
      res.send(data);
    }
    logger.info(`POST /transaction - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
    logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
  }
};
// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
module.exports = { create, findFilterAll, findAll, findOne, update, remove };

import service from "./service";

const getTransactions = (period) => {
  return service.get(`/api/transaction/${period}`);
};
const getTransaction = (id) => {
  return service.get(`/api/transaction/edt/${id}`);
};
const getFilterTransactions = (filter) => {
  console.log(filter);
  return service.post(`/api/transaction/filter/`, filter);
};
const remove = (data) => {
  return service.delete(`/api/transaction/${data}`);
};
const create = (data) => {
  return service.post(`/api/transaction/`, data);
};
const update = (id, transaction) => {
  return service.patch(`/api/transaction/${id}`, transaction);
};

export default {
  getTransactions,
  getFilterTransactions,
  remove,
  getTransaction,
  create,
  update,
};

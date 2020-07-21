import React, { useEffect, useState } from "react";
import SelectedPeriod from "./component/Selection/SelectedPeriod";
import List from "./component/listTransaction/List";
import Header from "./component/header/Header";
import ModalTransaction from "./component/Modal/ModalTransaction";
import routes from "./service/routes";
import SearchLaunch from "./component/search/SearchLaunch";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [period, setPeriod] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    startPeriod();
  }, []);

  useEffect(() => {
    getListTransaction();
  }, [period]);

  const startPeriod = () => {
    const data = new Date();
    const periodSel = `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    setPeriod(periodSel);
  };
  const getListTransaction = () => {
    if (period) {
      routes
        .getTransactions(period)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handlerSearch = (value) => {
    const filter = { period, value };
    console.log(filter);
    routes
      .getFilterTransactions(filter)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlerEdit = (data) => {
    routes
      .getTransaction(data)
      .then((response) => {
        setTransaction(response.data);
        setIsOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const hendlerDelete = (data) => {
    routes
      .remove(data)
      .then((response) => {
        getListTransaction();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const closeModal = (modalIsOpen) => {
    setTransaction([]);
    setIsOpen(false);
  };

  const changePeriod = (value) => {
    setPeriod(value);
  };

  return (
    <div className="container center-align">
      <h4>Desafio Final do Bootcamp Full Stack</h4>
      <h6>Controle Financeiro Pessoal {modalIsOpen}</h6>
      <SelectedPeriod changePeriod={changePeriod} period={period} />
      <Header heads={transactions} />
      <div className="row">
        <div className="col s3">
          <ModalTransaction
            transaction={transaction}
            isOpen={modalIsOpen}
            modalClosed={closeModal}
          />
        </div>
        <div className="col s9">
          <SearchLaunch onGetValue={handlerSearch} />
        </div>
      </div>
      <List
        transactions={transactions}
        onEdit={handlerEdit}
        onDelete={hendlerDelete}
      />
    </div>
  );
}

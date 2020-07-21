import React, { useState, useEffect } from "react";

export default function Header({ heads }) {
  const [launch, setLaunch] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    getHeader(heads);
  }, [heads]);
  const getHeader = (data) => {
    setLaunch(data.length);
    let enter = 0;
    let out = 0;
    let total = 0;
    data.forEach((item) => {
      if (item.type === "-") {
        out = out - item.value;
        total = total - item.value;
      } else {
        enter = enter + item.value;
        total = total + item.value;
      }
    });
    setBalance(total);
    setExpenses(out);
    setRevenue(enter);
  };

  return (
    <div className="m-2 row">
      <div className="col s1">
        <span className="flow-text">Lançamentos </span>
      </div>
      <div className="col s2">
        <span className="flow-text">{launch} </span>
      </div>
      <div className="col s1">
        <span className="flow-text">Receitas </span>
      </div>
      <div className="col s2">
        <span className="flow-text">R$ {revenue} </span>
      </div>
      <div className="col s1">
        <span className="flow-text">Despesas </span>
      </div>
      <div className="col s2">
        <span className="flow-text">R$ {expenses} </span>
      </div>
      <div className="col s1">
        <span className="flow-text">Saldo </span>
      </div>
      <div className="col s2">
        <span className="flow-text">R$ {balance} </span>
      </div>
    </div>
  );
}

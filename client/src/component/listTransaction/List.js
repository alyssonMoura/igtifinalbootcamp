import React from "react";
import CardTransaction from "./CardTransaction";

export default function List({ transactions, onEdit, onDelete }) {
  const handlerEdit = (data) => {
    return onEdit(data);
  };
  const hendlerDelete = (data) => {
    return onDelete(data);
  };
  return (
    <div>
      <h1>Lista</h1>
      <ul>
        {transactions.map((trans) => {
          return (
            <CardTransaction
              transaction={trans}
              key={trans._id}
              onEdit={handlerEdit}
              onDelete={hendlerDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}

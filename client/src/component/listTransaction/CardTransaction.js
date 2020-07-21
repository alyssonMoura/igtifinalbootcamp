import React from "react";
export default function CardTransaction({ transaction, onEdit, onDelete }) {
  const { _id, description, value, category, day, type } = transaction;
  let color = "blue";
  if (type === "-") {
    color = "red";
  }
  const handlerEdit = () => {
    return onEdit(_id);
  };
  const hendlerDelete = () => {
    return onDelete(_id);
  };
  return (
    <div
      className={`card-panel ${color} lighten-1 white-text no-padding row valign-wrapper`}
    >
      <div className="col s1">
        <h4>{day}</h4>
      </div>
      <div className="col s6">
        <div className="row left-align no-padding">
          <span className="flow-text">{category}</span>
        </div>
        <div className="row left-align no-padding">{description}</div>
      </div>
      <div className="col s1">R$ {value}</div>
      <div className="col s1">
        <i className="material-icons" onClick={handlerEdit}>
          edit
        </i>
      </div>
      <div className="col s1">
        <i className="material-icons" onClick={hendlerDelete}>
          delete
        </i>
      </div>
    </div>
  );
}

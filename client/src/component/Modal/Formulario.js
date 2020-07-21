import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function Formulario({ transaction, hendlerTransaction }) {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState();
  const [_id, setId] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [yearMonthDay, setYearMonthDay] = useState();
  const [day, setDay] = useState();
  const [yearMonth, setYearMonth] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const handleChange = (dia) => {
    const data = new Date(dia);
    console.log(data);
    setDate(data);
    setDay(`${data.getDate().toString().padStart(2, "0")}`);
    setMonth(`${(data.getMonth() + 1).toString().padStart(2, "0")}`);
    setYear(data.getFullYear());
    setYearMonth(
      `${data.getFullYear()}-${(data.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`
    );
    setYearMonthDay(
      `${data.getFullYear()}-${(data.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${data.getDate().toString().padStart(2, "0")}`
    );
  };

  const handlerRadio = (event) => {
    setType(event.target.value);
  };
  useEffect(() => {
    if (transaction._id) {
      console.log(transaction);
      const d = new Date(transaction.yearMonthDay.replace(/-/g, "/"));
      console.log(d);
      handleChange(d);
      setValue(transaction.value);
      setDescription(transaction.description);
      setCategory(transaction.category);
      setType(transaction.type);
      setId(transaction._id);
      setDate(d);
    } else {
      const data = new Date();
      handleChange(data);
    }
  }, []);

  useEffect(() => {
    setHendlerTransaction();
  }, [_id, value, description, category, type, yearMonthDay]);
  const handlerDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlerCategory = (event) => {
    setCategory(event.target.value);
  };
  const handlerValue = (event) => {
    setValue(event.target.value);
  };
  const setHendlerTransaction = () => {
    transaction = {
      _id,
      category,
      description,
      value,
      type,
      day,
      month,
      year,
      yearMonth,
      yearMonthDay,
    };
    console.log(transaction);
    return hendlerTransaction(transaction);
  };
  return (
    <div className="col s12">
      <div className="row">
        <div className="input-field col s3">
          <label>
            <input
              name="group1"
              type="radio"
              value="+"
              onChange={handlerRadio}
              checked={type === "+"}
            />
            <span>Receita</span>
          </label>
        </div>
        <div className="input-field col s3">
          <label>
            <input
              name="group1"
              type="radio"
              value="-"
              onChange={handlerRadio}
              checked={type === "-"}
            />
            <span>Despesa</span>
          </label>
        </div>
        <hr />
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Descriçao"
            id="description"
            type="text"
            defaultValue={description}
            className="validate"
            onChange={handlerDescription}
          ></input>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Categoria"
            id="category"
            type="text"
            defaultValue={category}
            className="validate"
            onChange={handlerCategory}
          ></input>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="valor"
            id="value"
            defaultValue={value}
            type="number"
            className="validate"
            onChange={handlerValue}
          ></input>
          <DatePicker selected={date} onChange={handleChange} dateFormat="PP" />
        </div>
      </div>
    </div>
  );
}

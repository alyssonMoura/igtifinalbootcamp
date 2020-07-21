import React from "react";

export default function SearchLaunch(props) {
  const handlerSearch = (value) => {
    props.onGetValue(value.target.value);
    // props.onGetValue(value);
  };
  return (
    <input
      type="text"
      label="pesquisa"
      name="inputSerch"
      placeholder=""
      onChange={handlerSearch}
    />
  );
}

import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { PERIODS } from "../../helpers/periods";
export default function SelectedPeriod({ period, changePeriod }) {
  const [currentPeriod, setCurrentPeriod] = useState();
  const removeAllGrade = () => {
    console.log("teste");
  };
  useEffect(() => {
    const d = new Date();
    setCurrentPeriod(`${d.getFullYear()}-${d.getMonth()}`);
    M.AutoInit();
  }, []);

  const handleCurrentChange = (event) => {
    setCurrentPeriod(event.target.value);
    return changePeriod(event.target.value);
  };
  return (
    <div className="center-align">
      <div className="row">
        <div className="col s1 offset-s4">
          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={removeAllGrade}
          >
            <i className="material-icons">chevron_left</i>
          </button>
        </div>
        <div className="col s2">
          <select value={currentPeriod} onChange={handleCurrentChange}>
            {PERIODS.map((period) => {
              return (
                <option key={period} value={period}>
                  {period}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col s1">
          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={removeAllGrade}
          >
            <i className="material-icons">chevron_right</i>
          </button>
        </div>
      </div>
    </div>
  );
}

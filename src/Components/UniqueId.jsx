import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";

function UniqueId() {
  const data = useContext(dataContext);
  const [cusid, setCusid] = useState([]);
  const [id, setId] = useState("");
  const [inovice, setInvoice] = useState(0);
  useEffect(() => {
    let uniqueId = data.data.map((val) => val.CustomerID);
    uniqueId = [...new Set(uniqueId)];
    setCusid(uniqueId);
  }, [data]);
  const idHandler = (e) => {
    setId(e.target.value);
    let tempBill = 0;
    data.data.map((val) => {
      if (val.CustomerID === e.target.value) {
        tempBill += Number(val.Quantity) * Number(val.UnitPrice);
      }
    });
    setInvoice(tempBill);
  };
  return (
    <div>
      <center>
        <br></br>
        <h1>Generate Invoice</h1>
        <br></br>
        <div style={{ width: "50%" }}>
          {cusid.length !== 0 ? (
            <select
              onChange={idHandler}
              className="form-select"
              aria-label="Default select example"
            >
              <option>--Select ID--</option>

              {cusid.map((val, index) => (
                <option key={index} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ) : (
            <span>loading...</span>
          )}
          {id !== "" ? (
            <div style={{ marginTop: "1em" }}>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Generate Invoice
              </button>
            </div>
          ) : null}

          <div
            style={{ marginTop: "1em" }}
            class="collapse"
            id="collapseExample"
          >
            <div class="card card-body">
              <h1>Invoice : ${parseInt(inovice)}</h1>
            </div>
          </div>
        </div>
      </center>
      <br></br>
      <hr></hr>
    </div>
  );
}

export default UniqueId;

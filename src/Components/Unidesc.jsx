import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";

function Unidesc() {
  const data = useContext(dataContext);
  const [desc, setDesc] = useState([]);
  const [select, setSelect] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [order, setOrder] = useState(0);
  useEffect(() => {
    let uniqueDesc = data.data.map((val) => val.Description);
    uniqueDesc = [...new Set(uniqueDesc)];
    setDesc(uniqueDesc);
  }, [data]);
  const descHandler = (e) => {
    setSelect(e.target.value);
    let tempQuant = 0;
    let tempOrder = 0;
    data.data.map((val) => {
      if (val.Description === e.target.value) {
        tempQuant++;
        tempOrder += Number(val.Quantity);
      }
    });
    setQuantity(tempQuant);
    setOrder(tempOrder);
  };
  return (
    <div>
      <center>
        <br></br>
        <h1>Ordered Item</h1>
        <br></br>
        <div style={{ width: "50%" }}>
          {desc.length !== 0 ? (
            <select
              onChange={descHandler}
              className="form-select"
              aria-label="Default select example"
            >
              <option>--Select Description--</option>

              {desc.map((val, index) => (
                <option key={index} value={val}>
                  {val}
                </option>
              ))}
            </select>
          ) : (
            <span>loading...</span>
          )}
          {select !== "" ? (
            <div style={{ marginTop: "1em" }}>
              <button
                class="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDesc"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Generate Ordered Item
              </button>
            </div>
          ) : null}

          <div style={{ marginTop: "1em" }} class="collapse" id="collapseDesc">
            <div class="card card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Total Quantity</th>
                    <th>Item Orders</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quantity}</td>
                    <td>{order}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </center>
      <br></br>
      <hr></hr>
    </div>
  );
}

export default Unidesc;

import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";

function UniqueId() {
  const data = useContext(dataContext);
  const [cusid, setCusid] = useState([]);
  const [id, setId] = useState("");
  const [inovice, setInvoice] = useState(0);
  const [table, setTable] = useState([]);
  useEffect(() => {
    // Filter Unique Data
    let uniqueId = data.data.map((val) => val.CustomerID);
    uniqueId = [...new Set(uniqueId)];
    let temp = uniqueId.map((val) => parseInt(val));
    let filter = temp.filter((val) => JSON.stringify(val).length === 5);
    // Set into state
    setCusid(filter);
  }, [data]);

  // Select Id Hadler
  const idHandler = (e) => {
    setId(e.target.value);
    let temp = [];
    let tempBill = 0;
    data.data.map((val) => {
      if (val.CustomerID === `${e.target.value}.0`) {
        tempBill += Number(val.Quantity) * Number(val.UnitPrice);
        let obj = {
          disc: val.Description,
          quan: Number(val.Quantity),
          price: Number(val.UnitPrice),
          cost: Number(val.Quantity) * Number(val.UnitPrice),
        };
        temp.push(obj);
      }
    });
    // Store only 10 data in table
    temp = temp.splice(0, 10);
    setTable(temp);
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
              <table class="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((val) => (
                    <tr>
                      <td>{val.disc}</td>
                      <td>{val.quan}</td>
                      <td>$ {val.price}</td>
                      <td>$ {parseInt(val.cost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3>Total Amount : $ {parseInt(inovice)}</h3>
              <hr></hr>
              <p style={{ textAlign: "left" }}>Note* Only 10 items display</p>
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

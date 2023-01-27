import React, { useContext, useEffect, useState } from "react";
import { dataContext } from "../App";

function Country() {
  // UseContext For Data
  const data = useContext(dataContext);
  const [country, setCountry] = useState([]);
  //   UseState For Select Field
  const [select, setSelect] = useState("");
  const [order, setOrder] = useState(0);
  const [quan, setQuan] = useState(0);
  useEffect(() => {
    // Filer by country
    let uniqueCoun = data.data.map((val) => val["Country\r"]);
    uniqueCoun = uniqueCoun = [...new Set(uniqueCoun)];
    uniqueCoun = uniqueCoun.filter((val) => isNaN(val));
    setCountry(uniqueCoun);
  }, [data]);
  //   Click Country Handler
  const countryHandler = (e) => {
    setSelect(e.target.value);
    let tempQuant = 0;
    let tempOrder = 0;
    data.data.map((val) => {
      if (val["Country\r"] === e.target.value) {
        tempQuant++;
        tempOrder += Number(val.Quantity);
      }
    });
    setOrder(tempOrder);
    setQuan(tempQuant);
  };
  return (
    <div>
      <center>
        <br></br>
        <h1>Country</h1>
        <br></br>
        <div style={{ width: "50%" }}>
          {country.length !== 0 ? (
            <select
              onChange={countryHandler}
              className="form-select"
              aria-label="Default select example"
            >
              <option>--Select Country--</option>

              {country.map((val, index) => (
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
                data-bs-target="#collapseCoun"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Click
              </button>
            </div>
          ) : null}

          <div style={{ marginTop: "1em" }} class="collapse" id="collapseCoun">
            <div class="card card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Total Products</th>
                    <th>Total Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quan}</td>
                    <td>{order}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Country;

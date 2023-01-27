import React, { useContext, useEffect } from "react";
import { dataContext } from "../App";
const csv = require("../CSV File/online_retail.csv");
function LandingPage() {
  const data = useContext(dataContext);
  useEffect(() => {
    fetch(csv)
      .then((res) => res.text())
      .then((string) => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        // Data Split
        const array = csvRows.map((i) => {
          const values = i.split(",");
          const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
          }, {});
          return obj;
        });
        // Set Into Context Array
        data.setData(array);
      });
  }, []);

  return <div></div>;
}

export default LandingPage;

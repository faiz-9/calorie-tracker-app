import React, { useState } from "react";
import moment from "moment";

const Filter = ({ data, tempData, setTempData }) => {
  const [disabled, setDisabled] = useState(true);
  const [validateMinDate, setValidateMinDate] = useState();

  console.log(data);
  const min_date = "2015-01-01T12:32";
  const max_date = "2023-01-05T12:32";

  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const filterData = () => {
    if (minDate && maxDate) {
      const min = Date.parse(minDate);
      const max = Date.parse(maxDate);
      const neww = data.filter((vals) => {
        const currDate = Date.parse(vals.date);
        return currDate > min && currDate < max;
      });
      setTempData(neww);
    } else {
      return alert("KINDLY SELECT BOTH DATES FOR FILTER");
    }
  };

  // const handleMinChange = (e) => {
  //   const newMinDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
  //   setMinDate(newMinDate);
  //   console.log(newMinDate); //value picked from date picker
  // };

  // const handleMaxChange = (e) => {
  //   const newMaxDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
  //   setMaxDate(newMaxDate);
  //   console.log(newMaxDate); //value picked from date picker
  // };

  return (
    <div className="my-5">
      <div>
        <h5>FILTER</h5>
      </div>
      <input
        type="datetime-local"
        min={min_date}
        max={max_date}
        onChange={(e) => {
          setMinDate(e.target.value);
          setValidateMinDate(e.target.value);
          setDisabled(false);
        }}
      />
      <input
        type="datetime-local"
        min={validateMinDate}
        max={max_date}
        style={{ marginLeft: "10px" }}
        // defaultValue={moment(max_date).format("YYYY-MM-DDThh:mm")}
        onChange={(e) => {
          setMaxDate(e.target.value);
        }}
        disabled={disabled}
      />

      <button
        className="  btn-success mx-1"
        onClick={() => {
          filterData();
        }}
      >
        FILTER
      </button>
    </div>
  );
};

export default Filter;

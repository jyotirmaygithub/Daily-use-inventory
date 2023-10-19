import React, { useState, useEffect } from "react";
import Todisplay from "./Display";

export default function Local(props) {
  const [values, setValues] = useState("");
  const [storage, setStorage] = useState([]);
  const [alert ,setAlert] = useState(null)

  function timer(){
    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }

  function givingvalues(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addingtoloalstorage();
      setStorage(avaliabledata());
      setAlert("Success : Item inserted into the list")
      timer()
    }
  }

  useEffect(() => {
    setStorage(avaliabledata());
  }, []);

  function addingtoloalstorage() {
    let existingdata = avaliabledata();
    if (values !== "") {
      existingdata.push(values);

      localStorage.setItem("inventory", JSON.stringify(existingdata));
      setValues("");
    }
  }

  function avaliabledata() {
    let dataarray;
    if (localStorage.getItem("inventory") === null) {
      dataarray = [];
    } else {
      dataarray = JSON.parse(localStorage.getItem("inventory"));
    }
    return dataarray;
  }

  function tochangeitem(some) {
    let storedarray = avaliabledata();
    setValues(storedarray[some]);
    storedarray.splice(some, 1);
    localStorage.setItem("inventory", JSON.stringify(storedarray));
    setAlert("Success : Now you can change item")
    timer()
  }

  function cleareverything() {
    localStorage.removeItem("inventory");
    setStorage(avaliabledata());
    setAlert("Success : Basket is Empty")
    timer()
  }
  return (
    <>
    <div className="alert-contain">
    {alert !== null && <div className="alert-section">
      <h4>{alert}</h4>
    </div>}
    </div>
    <div className="universal container">
      <h3>Inventory</h3>
      <div className="universal">
        <form onKeyDown={givingvalues}>
          <input
            className="input-things"
            placeholder="Get rid of notebook"
            onChange={(e) => setValues(e.target.value)}
            value={values}
            type="text"
            />
          <button className="tosubmit">Submit</button>
        </form>
      </div>
      <Todisplay storedvalue={storage} toedit={tochangeitem} alert={setAlert} removealert={timer} />
      <button className="toreset" onClick={cleareverything}>
        Clear Baskets
      </button>
    </div>
           </>
  );
}

// noted : always use localstorageremoveitem method of the javascript so that you will be able to remove specific key and pairs from the local stoarge

import React, { useState, useEffect } from "react";
import Delete from "./delete.png";
import Edit from "./edit.png";

export default function Display(props) {
  let { storedvalue, toedit ,alert, removealert } = props;

  const [arraytodisplay, setarraytodisplay] = useState([...storedvalue]);

  useEffect(() => {
    setarraytodisplay([...storedvalue]);
  }, [storedvalue]);

  function todelete(e) {
    let idd = e.currentTarget.id;
    //in react if you want to access id of the element then it need to be use current target after succeding e
    let storearray = JSON.parse(localStorage.getItem("inventory"));
    storearray.splice(idd, 1);
    localStorage.setItem("inventory", JSON.stringify(storearray));
    setarraytodisplay(storearray);
    alert("Success : One item removed")
    removealert()
  }
  return (
    <>
      {console.log(arraytodisplay)}
      <div>
        {arraytodisplay.length === 0 ? (
          <p className="empty">Basket is Empty</p>
        ) : (
          arraytodisplay.map((element, index) => {
            const touppercase = element
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            //slice 1 means first letter of it

            return (
              <div key={index} className="universal para-contain">
                <p className="list-text" id={index}>
                  {touppercase}
                </p>
                <div>
                  <img id={index} onClick={todelete} src={Delete} alt="" />
                  <img
                    id={index}
                    onClick={() => toedit(index)}
                    src={Edit}
                    alt=""
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

// noted : three dot operator generally spread all the elementss which we have inside an array

//noted : one more thing about three dot operator is it is less problemetic when it is come to deal with the useeffect hook of the react

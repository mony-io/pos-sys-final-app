import React from "react";

function Dates() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className="App">
      <h1>{date}</h1>
    </div>
  );
}

export default Dates;
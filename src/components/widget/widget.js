import React from "react";
import "./widget.css";

const Widget = (props) => {
  const max = props.max;
  const min = props.min;

  return (
    <div className="widget">
      <div className="tempMaxMinCard">
        <p>Город: {max.city}</p>
        <p>максимальная: {max.temp}</p>
      </div>

      <div className="tempMaxMinCard">
        <p>Город: {min.city}</p>
        <p>минимальная: {min.temp}</p>
      </div>
    </div>
  );
};

export default Widget;

import React, { useState } from "react";
import "./form.css";
import citys from "./citys.json";

const Form = ({ weatherMethod, refreshAll }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const inputValue = (event) => {
    setValue(event.target.value);
  };

  const inputClick = () => {
    setIsOpen(true);
  };

  const itemClick = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const filterCitys = citys.city.filter((city) => {
    const result = value.charAt(0).toUpperCase() + value.slice(1);
    return city.name.includes(result);
  });

  return (
    <div className="searchBar">
      <form className="form" onSubmit={weatherMethod}>
        <input
          className="textFieldInput"
          type="text"
          multiple
          name="city"
          placeholder="Название города"
          list="names"
          value={value}
          onChange={inputValue}
          onClick={inputClick}
        />
        <ul className="autocomplete" onClick={weatherMethod}>
          {isOpen && value && value.length > 2
            ? filterCitys.map((citys) => {
                return (
                  <li
                    className="autocompleteItem"
                    value={citys.name}
                    onClick={itemClick}
                  >
                    {citys.name}
                  </li>
                );
              })
            : null}
        </ul>
      </form>
      <div className="updateForm">
        <p>Автообновление 5с</p>
        <input className="checkUpdate" type="checkbox"></input>
      </div>
    </div>
  );
};

export default Form;

import React, { useState } from "react";
import "./form.css";
import citys from "./citys.json";

const Form = ({ weatherMethod, refreshAll }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [checked, setChecked] = useState(false);

  const inputValue = (e) => {
    setValue(e.target.value);
    setIsOpen(true);
  };

  const inputClick = () => {
    setIsOpen(true);
  };

  /* filling the input from auto-completion */
  const itemClick = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };

  /* filter cities by input */
  const filterCitys = citys.city.filter((city) => {
    const result = value.charAt(0).toUpperCase() + value.slice(1);
    return city.name.includes(result);
  });

  /* creating a card with auto-completion */
  const itemAdd = (e) => {
    e.preventDefault();
    const cityName = e.target.getAttribute(`value`);
    weatherMethod(cityName);
  };

  /* creating a card with input */
  const inputAdd = (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    weatherMethod(cityName);
  };

  return (
    <div className="searchBar">
      <form className="form" onSubmit={inputAdd}>
        <input
          className="textFieldInput"
          autocomplete="off"
          type="text"
          name="city"
          placeholder="Название города"
          value={value}
          onChange={inputValue}
          onClick={inputClick}
        />
        <ul className="autocomplete" onClick={itemAdd}>
          {isOpen && value && value.length > 2
            ? filterCitys.map((citys, index) => {
                return (
                  <li
                    className="autocompleteItem"
                    key={index}
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
        <input
          className="checkUpdate"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          onClick={refreshAll}
        ></input>
      </div>
    </div>
  );
};

export default Form;

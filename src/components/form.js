import React from "react";
import "./form.css";

class Form extends React.Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.weatherMethod}>
        <div className="SearchBar">
          <label>
            <input
              className="textFieldInput"
              type="text"
              multiple
              name="city"
              placeholder="Название города"
              list="names"
            />
          </label>
          <datalist id="names">
            <option value="Minsk" />
            <option value="Moskow" />
            <option value="London" />
            <option value="Kiev" />
            <option value="Brest" />
          </datalist>
          <div className="updateForm">
            <p>Автообновление 5с</p>
            <input className="checkUpdate" type="checkbox" name="a"></input>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;

import React from "react";
import "./weather.css";

const Weather = ({obj, onDelete, refresh}) => {
  const {city, temp, humidity, pressure, speed, dt, id} = obj;
    console.log(city)
    return (
      <div className="cards">
        <div className="weatherCard">
          <p>Город: {city}</p>
          <p>Температура: {temp}</p>
          <p>Влажность: {humidity}</p>
          <p>Атмосферное давление: {pressure}</p>
          <p>Сила и направление ветра: {speed}</p>
          <p>Последнее обновление данных: {dt}</p>
          <div className="btn">
            <button className="button" onClick={() => onDelete(id)}>
              Удалить
            </button>
            <button className="button" onClick={() => refresh(city)}>Обновить</button>
          </div>
        </div>
      </div>
    );
}

export default Weather;

import React from "react";
import "./card.css";

const Card = ({ obj, onDelete, refresh }) => {
  const { city, temp, humidity, pressure, speed, dt, id } = obj;

  return (
    <div className="weatherCard">
      <p>Город: {city}</p>
      <p>Температура: {temp}</p>
      <p>Влажность: {humidity}</p>
      <p>Атмосферное давление: {pressure}</p>
      <p>Сила и направление ветра: {speed}</p>
      <p>Последнее обновление: {dt}</p>
      <div className="btn">
        <button className="button" onClick={() => onDelete(id)}>
          Удалить
        </button>
        <button className="button" onClick={() => refresh(city)}>
          Обновить
        </button>
      </div>
    </div>
  );
};

export default Card;

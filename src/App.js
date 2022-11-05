import React, { useState } from "react";
import Form from "./components/form/form";
import Card from "./components/card/card";
import "./App.css";

const App = () => {
  /* const API_KEY = "f901b49665f1c1a7425f470ce9d5cd44"; */
  const API_KEY = "1340c1b61c42d543c0ee862d22a1b2b5";

  const [arr, setArr] = useState(JSON.parse(localStorage.getItem(`arr`)) || []);

  const addWeather = async (e) => {
    e.preventDefault();
    const cityName = e.target.elements.city.value;
    const weatherData = await gettingWeather(cityName);
    arr.push(weatherData);
    arr.sort((a, b) => b.tempRange - a.tempRange);
    setArr([...arr]);
    setWeatherLocalStorage(arr);
    console.log(arr);
  };

  const gettingWeather = async (cityName) => {
    const city = cityName;
    let weatherIcon = "";
    let windDirection = "";

    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`
      );
      const data = await api_url.json();

      getWeatherIcon();
      getWindDirection();

      let obj = {
        city: data.name,
        temp: Math.round(data.main.temp) + "°С" + weatherIcon,
        tempRange: data.main.temp,
        humidity: data.main.humidity + "%",
        pressure: data.main.pressure,
        speed: data.wind.speed + "М/С - " + windDirection,
        deg: data.wind.deg,
        dt: getDateUpdate(),
        id: data.id,
      };

      function getWeatherIcon() {
        if (data.main.temp >= 0) {
          weatherIcon = " ☀️";
        } else {
          weatherIcon = " ❄️";
        }
      }

      function getWindDirection() {
        if (data.wind.deg > 337.5 || data.wind.deg < 22.5) {
          windDirection = "⬆";
        } else if (data.wind.deg >= 22.5 && data.wind.deg < 67.5) {
          windDirection = "↗";
        } else if (data.wind.deg >= 67.5 && data.wind.deg < 112.5) {
          windDirection = "➡";
        } else if (data.wind.deg >= 112.5 && data.wind.deg < 157.5) {
          windDirection = "↘";
        } else if (data.wind.deg >= 157.5 && data.wind.deg < 202.5) {
          windDirection = "⬇";
        } else if (data.wind.deg >= 202.5 && data.wind.deg < 247.5) {
          windDirection = "↙";
        } else if (data.wind.deg >= 247.5 && data.wind.deg < 292.5) {
          windDirection = "⬅";
        } else if (data.wind.deg >= 292.5 && data.wind.deg < 337.5) {
          windDirection = "↖";
        }
      }

      function getDateUpdate() {
        let dt = data.dt;
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (hours < 10) {
          hours = "0" + hours;
        }

        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        const dt_date = hours + ":" + minutes + ":" + seconds;
        return dt_date;
      }
      return obj;
    }
  };

  const handleClickDelete = (id) => {
    const filterArr = arr.filter((obj) => obj.id !== id);
    setWeatherLocalStorage(filterArr);
    setArr(filterArr);
  };

  const refresh = async (city) => {
    const updateWeather = await gettingWeather(city);
    const updateArrData = arr.map((item) => {
      if (item.city == city) {
        item = updateWeather;
      }
      return item;
    });
    setWeatherLocalStorage(updateArrData);
    setArr(updateArrData);
  };

  /* Обновление всех карточек */

  const refreshAll = async () =>
    await arr.map((item) => {
      console.log(`Обновление для ${item.dt}`);
      refresh(item.city);
    });

  const setWeatherLocalStorage = (weatherData) => {
    localStorage.setItem(`arr`, JSON.stringify(weatherData));
  };

  return (
    <div id="weatherApp" className="weatherApp">
      <Form weatherMethod={addWeather} refreshAll={refreshAll} />
      <div id="cardsContainer" className="cardsContainer">
        {arr.map((obj, index) => (
          <Card
            key={index}
            obj={obj}
            refresh={refresh}
            onDelete={handleClickDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

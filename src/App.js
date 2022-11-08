import React, { useState, useEffect } from "react";
import Form from "./components/form/form";
import Card from "./components/card/card";
import Widget from "./components/widget/widget";
import "./App.css";

const App = () => {

  const API_KEY = "1340c1b61c42d543c0ee862d22a1b2b5";

  /* assign a value to arr */
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem(`arr`)) || []);
  const [max, setMax] = useState('')
  const [min, setMin] = useState('')

  const addWeather = async (e) => {
    const cityName = e;
    const weatherData = await gettingWeather(cityName); /* get weather data for the city */
    arr.push(weatherData); /* add data to arr */
    arr.sort((a, b) => b.tempRange - a.tempRange); /* sort by temperature for the widget */
    setArr([...arr]);
    setWeatherLocalStorage(arr);
    tempMaxMin()
  };

  /* maximum and minimum temperatures */
  const tempMaxMin = () => {
    let tempArr = arr
      tempArr.sort((a, b) => b.tempRange - a.tempRange);
      setMax(tempArr[0])
      setMin(tempArr.slice(-1)[0])
  }

  /* displaying the widget when rendering */
  useEffect(() => {
    if (arr.length !== 0) {
      tempMaxMin()
    }
  });
  
  const gettingWeather = async (cityName) => {
    const city = cityName;
    let weatherIcon = "";
    let windDirection = "";

    /* getting data from the API */
    if (city) {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`
      );
      const data = await api_url.json();

      getWeatherIcon();
      getWindDirection();

      /* generating an object from API data for arr */
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

      /* temperature icon selection */
      function getWeatherIcon() {
        if (data.main.temp >= 0) {
          weatherIcon = " ☀️";
        } else {
          weatherIcon = " ❄️";
        }
      }

      /* choosing the wind direction */
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

      /* getting the current date */
      function getDateUpdate() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        /* array of month names */
        const monthName = [
          "Января",
          "Февраля",
          "Марта",
          "Арпреля",
          "Мая",
          "Июня",
          "Июля",
          "Августа",
          "Сентября",
          "Октября",
          "Ноября",
          "Декабря",
        ];

        /* choosing the name of the month */
        switch (month) {
          case 0:
            month = monthName[0];
            break;
          case 1:
            month = monthName[1];
            break;
          case 2:
            month = monthName[2];
            break;
          case 3:
            month = monthName[3];
            break;
          case 4:
            month = monthName[4];
            break;
          case 5:
            month = monthName[5];
            break;
          case 6:
            month = monthName[6];
            break;
          case 7:
            month = monthName[7];
            break;
          case 8:
            month = monthName[8];
            break;
          case 9:
            month = monthName[9];
            break;
          case 10:
            month = monthName[10];
            break;
          case 11:
            month = monthName[11];
            break;
        }

        /* correct time output */
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        /* the end result of the current date and time */
        const dt_date =
          day +
          " " +
          month +
          " " +
          year +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;
        return dt_date;
      }
      return obj;
    }
  };

  /* deleting the weather card */
  const clickDelete = (id) => {
    const filterArr = arr.filter((obj) => obj.id !== id); 
    setWeatherLocalStorage(filterArr);
    setArr(filterArr);
  };

  /* updating the weather card */
  const refresh = async (city) => {
    const updateWeather = await gettingWeather(city);
    const updateArrData = arr.map((item) => {
      if (item.city == city) {
        item = updateWeather;
      }
      return item;
    });
    setArr(updateArrData);
    setWeatherLocalStorage([...updateArrData]);
    tempMaxMin()
  };

  /* updating all weather cards */
  const refreshAll = () => {
    console.log(`начало`)
    console.log(arr)
    const updateArrData = arr.map((item) => {
      const weather = gettingWeather(item.city);
      return weather;
    });
    Promise.all(updateArrData).then((data) => {
      setArr(data);
      setWeatherLocalStorage(data);
      console.log(`конец`)
      console.log(arr)
    });
  };

  /* adding to localStorage  */
  const setWeatherLocalStorage = (weatherData) => {
    localStorage.setItem(`arr`, JSON.stringify(weatherData));
  };

  return (
    <div id="weatherApp" className="weatherApp">
      <Widget 
        max={max}
        min={min}
      />
      <Form weatherMethod={addWeather} refreshAll={refreshAll} />
      <div id="cardsContainer" className="cardsContainer">
        {arr.map((obj, index) => (
          <Card
            key={index}
            obj={obj}
            refresh={refresh}
            onDelete={clickDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

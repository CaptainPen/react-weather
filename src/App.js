import React from 'react';
import Form from './components/form';
import Weather from './components/weather';
import './App.css';

const API_KEY = "f901b49665f1c1a7425f470ce9d5cd44";

class App extends React.Component {

  state = {
    city: undefined,
    temp: undefined,
    humidity: undefined,
    pressure: undefined,
    speed: undefined,
    deg: undefined,
    dt: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    let weatherIcon = ""  
    let windDirection  = ""

    if(city) {
      const api_url = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=ru&units=metric`);
      const data = await api_url.json();
      console.log(data)



      getWeatherIcon()
      getWindDirection()


      this.setState({
        city: data.name,
        temp: Math.round(data.main.temp) + '°С' + weatherIcon,
        humidity: data.main.humidity + '%',
        pressure: data.main.pressure,
        speed: data.wind.speed + 'М/С - ' + windDirection,
        deg: data.wind.deg,
        dt: getDateUpdate()
      });

      function getWeatherIcon() {
        if (data.main.temp > 0) {
          weatherIcon = " ☀️"
          console.log(weatherIcon)
        } else {
          weatherIcon = " ❄️"
          console.log(weatherIcon)
        } 
      }

      function getWindDirection() {
        if (data.wind.deg > 337.5 || data.wind.deg < 22.5) {
          windDirection = "⬆"
        } else if (data.wind.deg > 22.5 && data.wind.deg < 67.5) {
          windDirection = "↗"
        } else if (data.wind.deg > 67.5 && data.wind.deg < 112.5) {
          windDirection = "➡"
        } else if (data.wind.deg > 112.5 && data.wind.deg < 157.5) {
          windDirection = "↘"
        } else if (data.wind.deg > 157.5 && data.wind.deg < 202.5) {
          windDirection = "⬇"
        } else if (data.wind.deg > 202.5 && data.wind.deg < 247.5) {
          windDirection = "↙"
        } else if (data.wind.deg > 247.5 && data.wind.deg < 292.5) {
          windDirection = "⬅"
        } else if (data.wind.deg > 292.5 && data.wind.deg < 337.5) {
          windDirection = "↖"
        }
      }

      function getDateUpdate() {
        let dt = data.dt;
        let date = new Date();
      
        date.setTime(dt);

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        
        if (hours < 10) {
          hours = '0' + hours
        }
       
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        
        if (seconds < 10) {
          seconds = '0' + seconds
        }

        const dt_date = hours + ":" + minutes + ":" + seconds;
        return dt_date;
      }
    }
  }

  render() {  
    return (
      <div id="weatherApp" className='weatherApp'>
        <Form weatherMethod={this.gettingWeather}/>
        <div id="cardsContainer" className="cardsContainer">
          <Weather 
            city={this.state.city}
            temp={this.state.temp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            deg={this.state.deg}
            dt={this.state.dt}
          /> 
          
          <Weather 
            city={this.state.city}
            temp={this.state.temp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            deg={this.state.deg}
            dt={this.state.dt}
          /> 

<Weather 
            city={this.state.city}
            temp={this.state.temp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            deg={this.state.deg}
            dt={this.state.dt}
          /> 

<Weather 
            city={this.state.city}
            temp={this.state.temp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            deg={this.state.deg}
            dt={this.state.dt}
          /> 

<Weather 
            city={this.state.city}
            temp={this.state.temp}
            humidity={this.state.humidity}
            pressure={this.state.pressure}
            speed={this.state.speed}
            deg={this.state.deg}
            dt={this.state.dt}
          /> 
          
        </div>
        

      </div>
    )
  }
}

export default App;

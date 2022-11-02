import React from "react";
import '../App.css';
                                                                            
class Weather extends React.Component {
    render() {
        return (
            <div className="weatherCard">
                    <p>Город: {this.props.city}</p>
                    <p>Температура: {this.props.temp}</p>
                    <p>Влажность: {this.props.humidity}</p>
                    <p>Атмосферное давление: {this.props.pressure}</p>
                    <p>Сила и направление ветра: {this.props.speed}</p>
                    <p>Последнее обновление данных: {this.props.dt}</p>
                    <div className="btn">
                        <button>Удалить</button>
                        <button>Обновить</button>
                    </div>
            </div>
            
        )
    }
}

export default Weather;
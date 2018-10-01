import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Line } from 'react-chartjs-2';
import format from 'date-fns/format';
import getDay from 'date-fns/get_day';
import Card from './card';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: false,
            humidity: false,
            temperature: true,
            pressure: false,
            units: 'imperial'
        };
    }

    componentWillMount() {
        this.props.getWeather(this.state.units, () => this.setState({ forecast: true }));
    }

    chooseDisplay(option) {
        if (option === "temperature") {
            this.setState({ temperature: true });
            this.setState({ humidity: false });
            this.setState({ pressure: false });
        }
        if (option === "humidity") {
            this.setState({ temperature: false });
            this.setState({ humidity: true });
            this.setState({ pressure: false });
        }
        if (option === "pressure") {
            this.setState({ temperature: false });
            this.setState({ humidity: false });
            this.setState({ pressure: true });
        }
    }

    convertTemps() {
        this.setState({ units: (this.state.units === 'imperial') ? 'metric' : 'imperial' }, function () {
            this.props.getWeather(this.state.units, () => this.setState({ forecast: true }));
        });
    }

    render() {
        if (!this.state.forecast) {
            return <div>Loading..</div>
        }

        var list = this.props.forecast.list;
        var dayOne = list.slice(0, 8);
        var dayTwo = list.slice(8, 16);
        var dayThree = list.slice(16, 24);
        var dayFour = list.slice(24, 32);
        var dayFive = list.slice(32, 40);
        var days = [dayOne, dayTwo, dayThree, dayFour, dayFive];

        if (this.props.forecast.err) {
            return <div>{this.props.forecast.err}</div>
        }
        if (this.props.forecast) {
            var week = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' }
            return (
                <div>
                    <h1>5 Day Weather Forecast</h1>
                    <h2 className="name">{this.props.forecast.city.name}</h2>
                    <div className="cards">
                        {days.map((day, index) => {
                            return (
                                <div className="card" key={index}>
                                    <Card day={day} week={week} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="tempScale">
                        <button className={(this.state.units === "imperial") ? "selected" : ''} onClick={() => { if (this.state.units === "metric") { this.convertTemps() } }}>Farenheit</button>
                        <button className={(this.state.units === "metric") ? "selected" : ''} onClick={() => { if (this.state.units === "imperial") { this.convertTemps() } }}>Celsius</button>
                    </div>
                    <div className="dataButtons">
                        <button className={this.state.temperature ? "selected" : ''} onClick={() => this.chooseDisplay("temperature")}>Temperature {(this.state.units === "imperial") ? <span>&deg;F</span> : <span>&deg;C</span>}</button>
                        <button className={this.state.humidity ? "selected" : ''} onClick={() => this.chooseDisplay("humidity")}>Humidity (%)</button>
                        <button className={this.state.pressure ? "selected" : ''} onClick={() => this.chooseDisplay("pressure")}>Pressure (hPa)</button>
                    </div>
                    {days.map((day, index) => {
                        let temps = day.map(weather => weather.main.temp);
                        const humidities = day.map(weather => weather.main.humidity)
                        const pressures = day.map(weather => weather.main.pressure)
                        var dataArray;
                        if (this.state.temperature) {
                            dataArray = temps;
                            var color = 'red';
                        }
                        if (this.state.humidity) {
                            dataArray = humidities;
                            var color = 'blue';
                        }
                        if (this.state.pressure) {
                            dataArray = pressures;
                            var color = 'green';
                        }
                        var weekday;
                        const timestamps = day.map(weather => {
                            var d = new Date(0);
                            d.setUTCSeconds(weather.dt);
                            if (weekday === undefined) {
                                weekday = getDay(d);
                            }
                            return format(d, ['h:mm A']);
                        });
                        var data = { datasets: [{ label: week[weekday], data: dataArray, borderColor: color }], labels: timestamps };
                        var legendOpts = { display: false }
                        return (
                            <div key={index}>
                                <h2>{week[weekday]}</h2>
                                <Line data={data} legend={legendOpts} />
                            </div>
                        )
                    })
                    }
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return { forecast: state.weather }
}

export default connect(mapStateToProps, actions)(Weather);
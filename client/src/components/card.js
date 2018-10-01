import React, { Component } from 'react';
import getDay from 'date-fns/get_day'

class Card extends Component {
    render() {
        //get the day of the week from the first 3 hour segment of the day
        var weekday;
        this.props.day.map(weather => {
            var d = new Date(0);
            d.setUTCSeconds(weather.dt);
            if (weekday === undefined) {
                weekday = getDay(d);
            }
        });

        const temps = this.props.day.map(weather => weather.main.temp);
        const descriptions = this.props.day.map(weather => weather.weather[0].description);
        
        //get most frequent description to use on summary card
        var counts = {};
        for (var i = 0; i < descriptions.length; i++) {
            var num = descriptions[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        //If there are equal counts, the reduce function will only keep one, which is fine for this purpose.
        var mostFrequentDescription = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

        //get icons associated with descriptions
        var icons = this.props.day.map(weather => {
            if (weather.weather[0].description === mostFrequentDescription) {
                return weather.weather[0].icon;
            }
        })

        //remove undefined array items from when descriptions were not equal
        icons = icons.filter(icon => icon !== undefined)

        //remove d and n so that all icons can be day
        icons = icons.map(icon => {
            icon = icon.replace('d', '');
            icon = icon.replace('n', '');
            return icon;
        })


        var high = Math.round(Math.max(...temps));
        var low = Math.round(Math.min(...temps));

        return (
            <div>
                <div>{this.props.week[weekday]}</div>
                <div>{high}&deg; / {low}&deg;</div>
                <div>{mostFrequentDescription}</div>
                <img src={`https://openweathermap.org/img/w/${icons[0]}d.png`} alt={mostFrequentDescription} />
            </div>
        );
    }
}

export default Card;
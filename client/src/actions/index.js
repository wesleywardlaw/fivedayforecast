import axios from 'axios';
import { GET_WEATHER } from './types';

const ROOT_URL = 'http://localhost:3000'

var lat;
var lon;

function geoFindMe(callback) {

	if (!navigator.geolocation){
		callback();
	  }

	function success(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;

		callback();
	}

	function error() {
		callback();
	}




	navigator.geolocation.getCurrentPosition(success, error);

}



export function getWeatherFromIP(units, callback) {

	return function (dispatch) {
		geoFindMe(function () {
			console.log(lat);
			console.log(lon);

			axios.post(`${ROOT_URL}/weather`, { units, lat, lon })
				.then(response => {
					console.log(response.data);
					dispatch({
						type: GET_WEATHER,
						payload: response.data

					});

					callback();
				});

		})
	}

}




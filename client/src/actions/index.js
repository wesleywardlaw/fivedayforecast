import axios from 'axios';
import { GET_WEATHER } from './types';


//use different server depending on environment
let ROOT_URL = '';
if (process.env.NODE_ENV == undefined) {
	ROOT_URL = 'http://localhost:3000'
} else {
	ROOT_URL = ''
}

var lat, lon;

//get geolocation
function geoFindMe(callback) {
	if (!navigator.geolocation) {
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

export function getWeather(units, callback) {
	return function (dispatch) {
		geoFindMe(function () {
			axios.post(`${ROOT_URL}/weather`, { units, lat, lon })
				.then(response => {
					dispatch({
						type: GET_WEATHER,
						payload: response.data
					});
					callback();
				});
		})
	}
}



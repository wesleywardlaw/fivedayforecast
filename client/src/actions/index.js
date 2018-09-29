import axios from 'axios';
import {GET_WEATHER} from './types';

const ROOT_URL = 'http://localhost:3000'

export function getWeatherFromIP(callback) {
	return function (dispatch) {
		axios.get(`${ROOT_URL}/weather`)
			.then(response => {
				console.log(response.data);
				dispatch({
					type: GET_WEATHER,
					payload: response.data
					
				});
				
				callback();
			});
		
	}
}




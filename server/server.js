const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({type:"*/*"}));
app.post('/weather', (req,res) => {
	var lat = req.body.lat;
	var lon = req.body.lon;
	var units = req.body.units;
	console.log(units);
	if(lat!==undefined&&lon!==undefined){
		axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER}&units=${units}`)
			.then(response => {
				res.send(response.data);
			})
			.catch((err)=>res.send({err:"We are unable to retreive weather information at this time."}))
	} else{
		axios.get('https://ipinfo.io')
		.then(response => {
			console.log(response.data);
			var location = response.data.loc.split(",");
			var lat = location[0];
			var lon = location[1];
			
			axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER}&units=${units}`)
				.then(response => {
					res.send(response.data);
				})
				.catch((err)=>res.send({err:"We are unable to retreive weather information at this time."}))
		})
	}					
});

app.listen(port);

console.log("Server started...");
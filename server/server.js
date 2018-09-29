const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv').config();



// app.use(express.static(__dirname));
app.use(cors());
app.get('/weather', (req,res) => {
	axios.get('https://ipinfo.io')
		.then(response => {
			console.log(response.data);
			var location = response.data.loc.split(",");
			var lat = location[0];
			var lon = location[1];
			var units = 'imperial';
			axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER}&units=${units}`)
				.then(response => {
					// console.log(response);
					// console.log(response.data);
					res.send(response.data);
				})
				.catch((err)=>res.send({err:"We are unable to retreive weather information at this time."}))
			
			// callback(response.data.tax);
		})
		
		
});

// app.get("*", (req,res) =>{
// 	res.sendFile(path.resolve(__dirname, 'index.html'));
// });

app.listen(port);

console.log("Server started...");
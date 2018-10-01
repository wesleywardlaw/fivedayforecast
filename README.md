# 5 Day Weather Forecast

## How to Run

In the server folder, first create a .env file and insert the following code, replacing yourapikey with a key from [OpenWeatherMap](https://openweathermap.org/api):
```
WEATHER=yourapikey
```

Then run:
```
npm install
npm start
```

In the client folder, run:

```
npm install
```

If you are on Windows, you may get some warnings about optional dependencies for fsevents.  To remove these warnings, run:
```
npm audit fix --force
```

Then to start the client, run:
```
npm run dev
```

You should now be able to view the project on http://localhost:8080.

To build the bundle for the dist folder:

```
npm run build
```

Then you will need to either manually move the index.html file and style folder into the distribution folder, or do it via the command line.  On Windows, this can be done with:

```
copy index.html dist
mkdir dist\style
copy style\style.css dist\style
```

## Deployed Example

The client is [hosted on netlify](https://eager-murdock-f5c9ef.netlify.com/).  The service recognizes it as a React app and the dist folder is all that is needed to serve the client files.

The server is hosted on heroku at https://fivedayforecastserver.herokuapp.com.  This is a free server so it may be asleep the first time you visit the app.

## Thought Process

I chose to use React because it's what I most commonly work in and a weather forecast inherently has repetitive elements that can be represented with components.

I decided to use a Node server as a simple back end in order to keep the API key private.

I wanted the app to provide a quick overview at the top and then allow users to see more detail at the bottom if they were interested.

I decided to use the Geolocation API to get latitude and longitude information for the request to OpenWeatherMap.  I used information from ipinfo.io as a backup if geolocation was not available.

Traditionally, weather is presented using days of the week (Sunday, Monday, etc.)  I used the date-fns package to simplify this conversion and to format the times for my charts.

Most online weather forecasts provide the option to view temperature in either Fahrenheit or Celsius, and OpenWeatherMap allows the specification of units so I simply created a new request and asked for metric units in order to get Celsius.

OpenWeatherMap provides icons to represent the weather.  The API response gives these as short codes that can be put into a complete img tag.  Since the top of the app is a quick overview, I just wanted to display a description and icon that represented the most frequent weather type for an individual day.  I collected the descriptions in an array, used an object to count occurrences, and collected the matching icons in another array.  I really just needed one of these so I used the first index of the icons array to get the code that I needed to put in the img tag.  I cut off the end of the code, which is always a d or an n, representing day and night.  I chose to use all day icons since I think it makes more sense for this type of forecast.

I used react-chartjs-2 to create the charts.  I've used it before and it's relatively easy to implement, although the default charts usually need some options changed for typical use cases.

## Tradeoffs

react-chartjs-2 is a large package.  It creates really nice charts, but is by far the biggest thing in my bundle since it also requires the original chartjs.  

I considered implementing a search function, but my experiments with OpenWeatherMap showed a lot of potential issues.  Zip codes don't always result in the city that might be expected.  If there are multiple cities with the same name in the same country, they have to be sorted through and the API doesn't seem to pull up every one.  In the end, geolocation seemed to be more precise and allows for a cleaner look since the app doesn't require any inputs.

## With More Time

With more time, I would implement some kind of testing, probably using Jest and Enzyme.  It might also be nice to have a component that pulled up the location on Google Maps.  I could also add Kelvin as an option.   


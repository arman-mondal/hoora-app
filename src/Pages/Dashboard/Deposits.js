import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
    const [city, setCity] = React.useState('');
    const [weather,setWeather]=React.useState('');
    const [currentDate, setCurrentDate] = React.useState('');


    React.useEffect(() => {
      // Check if the Geolocation API is available in the browser
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const apikey="e83d9e533131b6173401bde70326bc7c";
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            fetch(weatherApiUrl)
              .then((response) => response.json())
              .then((data) => {
                const weatherDescription = data.weather[0].description;
                setWeather(weatherDescription);
              })
              .catch((error) => {
                console.error('Error fetching weather:', error);
              });
          
            // Use a reverse geocoding API (such as OpenStreetMap Nominatim) to get city from coordinates
            const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
            fetch(reverseGeocodingUrl)
              .then((response) => response.json())
              .then((data) => {
                const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
                setCity(city);

              })
              .catch((error) => {
                console.error('Error fetching city:', error);
              });
          },
          (error) => {
            console.error('Geolocation error:', error);
          }
        );
      } else {
        console.log('Geolocation not available');
      }
      
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
      setCurrentDate(formattedDate);
     }, []);
  
  
  return (
    <React.Fragment>
      <Title>Date</Title>
      <Typography component="p" variant="h4">
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {currentDate}
            </Typography>
        
        
        <Title>Weather</Title>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
        {weather || 'Unknown'}
        </Typography>
      <Title>Location</Title>

      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {city || 'Unknown'}
        </Typography> 
      <div>
      </div>
    </React.Fragment>
  );
}
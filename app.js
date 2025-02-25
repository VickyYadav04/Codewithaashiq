const apiKey = "45ae1d82e2d7488291a171057252202";
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

function getWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');
    
    if (!location) {
        weatherInfo.innerHTML = '<p id="error-message">Please enter a location.</p>';
        return;
    }

    fetch(apiUrl + location + "&aqi=yes")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                weatherInfo.innerHTML = '<p id="error-message">Location not found. Please try again.</p>';
            } else {
                const tempC = data.current.temp_c;
                const tempF = data.current.temp_f;
                const condition = data.current.condition.text;
                const locationName = data.location.name;
                const country = data.location.country;

                weatherInfo.innerHTML = `
                    <p><strong>Location:</strong> ${locationName}, ${country}</p>
                    <p><strong>Condition:</strong> ${condition}</p>
                    <p><strong>Temperature:</strong> ${tempC}°C / ${tempF}°F</p>
                `;
            }
        })
        .catch(error => {
            weatherInfo.innerHTML = '<p id="error-message">Something went wrong. Please try again later.</p>';
            console.error(error);
        });
}

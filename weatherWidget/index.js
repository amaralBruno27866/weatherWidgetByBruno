// Get references to HTML elements
const container = document.querySelector('.container'); // Main container
const searchButton = document.querySelector('.search-box button'); // Search button
const searchInput = document.querySelector('.search-box input'); // Search input field
const weatherBox = document.querySelector('.weather-box'); // Weather information display
const weatherDetails = document.querySelector('.weather-details'); // Additional weather details
const error404 = document.querySelector('.not-found'); // Location not found display

// Add a click event listener to the search button
searchButton.addEventListener('click', () => {
  performSearch();
});

// Add a keydown event listener to the search input for pressing Enter
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Function to perform the weather search
function performSearch() {
  const APIKey = 'e33bcc053ee3763f195976119fa3ad8a'; // Your API Key
  const city = searchInput.value; // Get the city name from the input field

  // Check if the input is empty
  if (city === '') {
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()) // Convert response to JSON
    .then(json => {
      // Handle the response data

      // Check if the location is not found (404 error)
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      // Hide the "Location not found" section
      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      // Get references to weather information elements
      const image = document.querySelector('.weather-box img'); // Weather icon
      const temperature = document.querySelector('.weather-box .temperature'); // Temperature display
      const description = document.querySelector('.weather-box .description'); // Weather description
      const humidity = document.querySelector('.weather-details .humidity span'); // Humidity display
      const wind = document.querySelector('.weather-details .wind span'); // Wind speed display

      // Set the weather icon based on the weather condition
      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = '';
      }

      // Display temperature with unit (°C)
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      // Display weather description
      description.innerHTML = `${json.weather[0].description}`;
      // Display humidity percentage
      humidity.innerHTML = `${json.main.humidity}%`;
      // Display wind speed in Km/h
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      // Show weather information and details
      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px'; // Adjust container height
    });
}

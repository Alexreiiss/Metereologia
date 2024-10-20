const apiKey = '61984da825477e83eb3c74ec371ae641'; 
const weatherInfo = document.getElementById('weather-info');

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim(); // Remove espaços em branco
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada'); // Lança um erro se a resposta não for 2xx
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            weatherInfo.innerHTML = `<p>${error.message}</p>`; // Exibe a mensagem de erro
        });
}

function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <h2>${name}</h2>
            <p>Temperatura: ${main.temp}°C</p>
            <p>Umidade: ${main.humidity}%</p>
            <p>Condições: ${weather[0].description}</p>
            <p>Vento: ${wind.speed} m/s</p>
        </div>
    `;
}

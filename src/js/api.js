async function getWeather(city) {
  const apiKey = "0e44e0c77b4369ecff686c2b08617a38";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
  
  const container = document.getElementById("apiData");
  const errorMsg = document.getElementById("errorMsg");
  container.innerHTML = ""; 
  errorMsg.innerText = "";

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
    }

    const weatherData = await res.json();
    container.innerHTML = ""; 
    
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
      <h3>${weatherData.name}, ${weatherData.sys.country}</h3>
      <p><img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Ícone do clima"></p>
      <p style="font-size: 1.5em; font-weight: bold;">${weatherData.main.temp.toFixed(1)}°C</p>
      <p>${weatherData.weather[0].description}</p>
      <p>Umidade: ${weatherData.main.humidity}%</p>
    `;
    container.appendChild(card);

  } catch (error) {
    container.innerHTML = ""; 
    errorMsg.innerText = error.message;
    console.error("Erro ao buscar clima:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.getElementById("weatherForm");
  if (weatherForm) {
    weatherForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = document.getElementById("cityInput").value;
      getWeather(city);
    });
  }
});
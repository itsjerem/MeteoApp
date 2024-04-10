const API_KEY = "c6785d1c161289c7746f30876e626bea";

export async function getWeather(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
  );

  if (!response.ok) {
    // console.error("Error:", response.status);
    return;
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function getForecast(lat, long) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&lang=fr`
  );
  const data = await response.json();
  return data.list;
}

/*eslint-env es6*/
window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  const successCallback = (pos) => {
  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  // console.log("lats ", lat);
  // console.log("longs ", long);
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=56231f7739ce2d0ae04f1f50dccc61d7`;

  fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temp } = data.main;
          const { name } = data;
          const { main } = data.weather[0];
          
          // console.log(name);
          // console.log(temp);
          // console.log(main);
          
          // Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = main;
          locationTimezone.textContent = name;
          // Formula for Celsius
          let celsius = (temp - 32) * (5 / 9);
          
          // Change temperature
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp;
            }
          });
        });
  };

  const errorCallback = (err) => {
    console.error(err);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
});

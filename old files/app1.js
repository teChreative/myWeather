// https://www.youtube.com/watch?v=wPElVpR1rwA&t=4s
// https://darksky.net/forecast/40.7127,-74.0059/us12/en
// https://darkskyapp.github.io/skycons/
// https://github.com/darkskyapp/skycons
/*eslint-env es6*/
// https://openweathermap.org/api ... use One Call API


window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      // const api = `${proxy}https://api.darksky.net/forecast/KEY/${lat},${long}`;
      // const api = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat={lat}.&lon={lon}&appid=56231f7739ce2d0ae04f1f50dccc61d7`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          const { temperature, summary, icon } = data.currently;
          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Formula for Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector('.icon'));
          // Change temperature
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });

  } 
  // else {
  //   h1.textContent = "Not Working"
  // }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});

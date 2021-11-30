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
  // TEST GROUNDS START

const successCallback = (pos) => {
  console.log(pos.coords.latitude);
  console.log(pos.coords.longitude);
  var lats = pos.coords.latitude;
  console.log(lats);
};
const errorCallback = (err) => {
  console.error(err);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// TEST GROUNDS END
// debugger;
// alert("SUP");
//  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      navigator.geolocation.getCurrentPosition;
      // long = position.coords.longitude;
      // lat = position.coords.latitude;
      long = -73.53;
      lat = 41.05;

      //const proxy = `https://cors-anywhere.herokuapp.com/`;
      // const api = `${proxy}https://api.darksky.net/forecast/KEY/${lat},${long}`;
      // const api = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;
      //const api = `https://api.openweathermap.org/data/2.5/weather?lat=41.05&lon=-73.53&appid=56231f7739ce2d0ae04f1f50dccc61d7`;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=56231f7739ce2d0ae04f1f50dccc61d7`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          // console.log(data);
          // const { temperature, summary, icon } = data.currently;
          const { temp } = data.main;
          const { main } = data.weather[0];
          const { name } = data;
          //const { long } = 
          console.log(temp);
          console.log(name);
          // console.log("Latitude", position.coords.latitude);
          // console.log(navigator.geolocation);
          // console.log(data.weather[0]);
          
          // Set DOM Elements from the API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = main;
          locationTimezone.textContent = name;
          // Formula for Celsius
          let celsius = (temp - 32) * (5 / 9);
          // Set Icon
          // setIcons(icon, document.querySelector('.icon'));
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
    });

  //} 
  // else {
  //   h1.textContent = "Not Working"
  // }

  // function setIcons(icon, iconID) {
  //   const skycons = new Skycons({color: "white"});
  //   const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  //   skycons.play();
  //   return skycons.set(iconID, Skycons[currentIcon]);
  // }
  

});

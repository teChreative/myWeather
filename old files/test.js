



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
  // console.log(pos.coords.latitude);
  // console.log(pos.coords.longitude);
  var lat = pos.coords.latitude;
  var long = pos.coords.longitude;
  console.log("lats ", lat);
  console.log("longs ", long);
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=56231f7739ce2d0ae04f1f50dccc61d7`;

  fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temp } = data.main;
          const { name } = data;
          const { main } = data.weather[0];
          
          console.log(name);
          console.log(temp);
          console.log(main);
          
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

// TEST GROUNDS END

//  if(navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(position => {
    //   navigator.geolocation.getCurrentPosition;
      // long = position.coords.longitude;
      // lat = position.coords.latitude;
      // long = -73.53;
      // lat = 41.05;

      //const api = `https://api.openweathermap.org/data/2.5/weather?lat=41.05&lon=-73.53&appid=56231f7739ce2d0ae04f1f50dccc61d7`;
      //t const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=56231f7739ce2d0ae04f1f50dccc61d7`;

      // fetch(api)
      //   .then(response => {
      //     return response.json();
      //   })
        // .then(data => {
        //   const { temp } = data.main;
        //   const { main } = data.weather[0];
        //   const { name } = data;
           
        //   console.log(temp);
        //   console.log(name);
          
        //   // Set DOM Elements from the API
        //   temperatureDegree.textContent = temp;
        //   temperatureDescription.textContent = main;
        //   locationTimezone.textContent = name;
        //   // Formula for Celsius
        //   let celsius = (temp - 32) * (5 / 9);
          
        //   // Change temperature
        //   temperatureSection.addEventListener('click', () => {
        //     if(temperatureSpan.textContent === "F"){
        //       temperatureSpan.textContent = "C";
        //       temperatureDegree.textContent = Math.floor(celsius);
        //     } else {
        //       temperatureSpan.textContent = "F";
        //       temperatureDegree.textContent = temp;
        //     }
        //   });
        // });
    });

  //} 
  
  

// });

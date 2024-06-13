//http://api.weatherapi.com/v1/current.json?key=43013aada4304d9cbe495659241306&q=London
var inputsearch=document.querySelector(".input1")
var finalres;

var button=document.querySelector(".button")

button.addEventListener("click", function() {
    (async function() {
        try {
            
         
            var apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=43013aada4304d9cbe495659241306&q=${inputsearch.value}&days=3 `;
            
            var res = await fetch(apiUrl);
            var finalres = await res.json();
            
            console.log(finalres); 
            displayAllWeather(finalres); 
            
            return finalres; 
        } catch (error) {
            console.error('Error fetching weather data:', error);
           
        }
    })();
});


function displayAllWeather(finalres){
    cartona="";

  
        cartona+=`
        <div class="col-md-4 inner">
        <div class="item">
          <div class="d-flex justify-content-around align-content-center day">
            <p>${ getDayName(finalres.current.last_updated)}</p>
            <p>${finalres.current.last_updated.slice(8,10)+getMonth(finalres.current.last_updated)}</p>
          </div>
          <div class="content position-relative">
            <p class="my-3 city">${inputsearch.value.toLowerCase().includes(finalres.location.name.toLowerCase())? finalres.location.name:finalres.location.name+","+ finalres.location.country}</p>
            <div class="icon-span d-flex flex-column ">
            <h2 class="text-center">
              ${finalres.current.temp_c+"oC"}
            </h2>
           
              <img src="${ displayWeatherIcon(finalres.current.condition.icon)} "width="50px" class="position-absolute image" /> 
              <span class="my-3 status">${ finalres.current.condition.text}</span>
            </div>
         
            <div class="iconns my-5">
              <i class="fa-solid mx-2 fa-umbrella"> 20%</i>
              <i class="fa-solid mx-2 fa-wind"> 18km/h</i>
              <i class="fa-regular mx-2 fa-compass"> east</i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 avv">
        <div class="item ">
          <div class="d-flex justify-content-around align-content-center dayyy ">
            <p>${getDayName(finalres.forecast.forecastday[1].date)}</p>
       
          </div>
          <div class="content text-center">
          
            <h2 class="text-center mt-5">
            ${ finalres.forecast.forecastday[1].day.maxwind_kph}
            </h2>
            <h5>  ${ finalres.forecast.forecastday[1].day.maxwind_mph
                }</h5>
            <div class="icon-span d-flex flex-column">
            <img src="${ displayWeatherIcon(finalres.forecast.forecastday[1].day.condition.icon)} "width="50px" class="position-absolute image2 mb-3" /> 
              <span class="my-3 status"> ${ finalres.forecast.forecastday[1].day.condition.text
              }</span>
            </div>
         
          </div>
        </div>
      </div>
      <div class="col-md-4   day3">
        <div class="item ">
          <div class="d-flex justify-content-around align-content-center dayy ">
            <p>${getDayName(finalres.forecast.forecastday[2].date)}</p>
       
          </div>
          <div class="content text-center">
        
          <h2 class="text-center mt-5">
          ${ finalres.forecast.forecastday[2].day.maxwind_kph}
          </h2>
          <h5 >  ${ finalres.forecast.forecastday[2].day.maxwind_mph
              }</h5> 
         
         
            <div class="icon-span d-flex flex-column">
            <img src="${ displayWeatherIcon(finalres.forecast.forecastday[2].day.condition.icon)} "width="50px" class="position-absolute image3 " /> 
              <span class="my-3 status"> ${ finalres.forecast.forecastday[2].day.condition.text
              }</span>
            </div>
         
          </div>
        </div>
      </div>
        `
        document.querySelector(".row").innerHTML=cartona
    }
  

function getDayName(dateString) {
    var date = new Date(dateString);
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

function getMonth(){
    var months=[ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var date=new Date;
var monthindex=date.getMonth()
return months[monthindex]
}

function displayWeatherIcon(iconUrl) {
    var img = document.querySelector(".img")
  
    if (img) {
      img.src = iconUrl;
  } else {
      console.error('Element not found');
  }
    return iconUrl
}

document.addEventListener('DOMContentLoaded', () => {
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
      console.log("Geolocation is not supported by your browser");
  }

  function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  ( async function () {
            try {
                
             
                var apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=43013aada4304d9cbe495659241306&q=${latitude},${longitude}&days=3 `;
                
                var res = await fetch(apiUrl);
                var data = await res.json();
                
                console.log(data); 
                displayAllWeathe(data); 
                
                return data; 
            } catch (error) {
                console.error('Error fetching weather data:', error);
               
            }
        }());
  }

  function errorCallback(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              console.error("User denied the request for Geolocation.");
              break;
          case error.POSITION_UNAVAILABLE:
              console.error("Location information is unavailable.");
              break;
          case error.TIMEOUT:
              console.error("The request to get user location timed out.");
              break;
          case error.UNKNOWN_ERROR:
              console.error("An unknown error occurred.");
              break;
      }
  }
});


function displayAllWeathe(data){
    cartona="";

  
        cartona+=`
        <div class="col-md-4 inner">
        <div class="item">
          <div class="d-flex justify-content-around align-content-center day">
            <p>${ getDayName(data.current.last_updated)}</p>
            <p>${data.current.last_updated.slice(8,10)+getMonth(data.current.last_updated)}</p>
          </div>
          <div class="content position-relative">
            <p class="my-3 city">${inputsearch.value.toLowerCase().includes(data.location.name.toLowerCase())? data.location.name:data.location.name+","+ data.location.country}</p>
            <div class="icon-span d-flex flex-column ">
            <h2 class="text-center">
              ${data.current.temp_c+"oC"}
            </h2>
           
              <img src="${ displayWeatherIcon(data.current.condition.icon)} "width="50px" class="position-absolute image" /> 
              <span class="my-3 status">${ data.current.condition.text}</span>
            </div>
         
            <div class="iconns my-5">
              <i class="fa-solid mx-2 fa-umbrella"> 20%</i>
              <i class="fa-solid mx-2 fa-wind"> 18km/h</i>
              <i class="fa-regular mx-2 fa-compass"> east</i>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 avv">
        <div class="item ">
          <div class="d-flex justify-content-around align-content-center dayyy ">
            <p>${getDayName(data.forecast.forecastday[1].date)}</p>
       
          </div>
          <div class="content text-center">
          
            <h2 class="text-center mt-5">
            ${ data.forecast.forecastday[1].day.maxwind_kph}
            </h2>
            <h5>  ${ data.forecast.forecastday[1].day.maxwind_mph
                }</h5>
            <div class="icon-span d-flex flex-column">
            <img src="${ displayWeatherIcon(data.forecast.forecastday[1].day.condition.icon)} "width="50px" class="position-absolute image2 mb-3" /> 
              <span class="my-3 status"> ${ data.forecast.forecastday[1].day.condition.text
              }</span>
            </div>
         
          </div>
        </div>
      </div>
      <div class="col-md-4   day3">
        <div class="item ">
          <div class="d-flex justify-content-around align-content-center dayy ">
            <p>${getDayName(data.forecast.forecastday[2].date)}</p>
       
          </div>
          <div class="content text-center">
        
          <h2 class="text-center mt-5">
          ${ data.forecast.forecastday[2].day.maxwind_kph}
          </h2>
          <h5 >  ${ data.forecast.forecastday[2].day.maxwind_mph
              }</h5> 
         
         
            <div class="icon-span d-flex flex-column">
            <img src="${ displayWeatherIcon(data.forecast.forecastday[2].day.condition.icon)} "width="50px" class="position-absolute image3 " /> 
              <span class="my-3 status"> ${ data.forecast.forecastday[2].day.condition.text
              }</span>
            </div>
         
          </div>
        </div>
      </div>
        `
        document.querySelector(".row").innerHTML=cartona
    }
  
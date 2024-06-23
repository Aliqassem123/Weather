var city = null;
var daysArr = [];
var searchInput = document.getElementById("search");


async function search(country) {
  var url = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=6dbeb1d4fc0648b597073111241406&q=${country}&days=3`
  );
  if (url.ok) {
    var res = await url.json();

    city = res.location.name;
    var forecastdayArr = res.forecast.forecastday;

    for (var i = 0; i < forecastdayArr.length; i++) {
        
      daysArr.push({
        icon: forecastdayArr[i]?.day?.condition?.icon,
        tempC: forecastdayArr[i]?.day?.avgtemp_c,
        stateWeather: forecastdayArr[i]?.day?.condition.text,
        date: new Date(forecastdayArr[i]?.date),
      });
    
    }
  

    displayCurrent();
  }
}


var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent() {
  for (var i = 0; i < daysArr.length; i++) {

    var n = `<div class="col-lg-4 col-md-12  shadow-sm p-0 mt-2 px-3 content-item" >
        <div id="date" class=" text-center w-100 d-flex justify-content-between align-items-center p-2 text-center py-1">
         <p class="pe-5">${days[daysArr[i].date.getDay()]}</p>
         <p class="ps-5">${monthNames[daysArr[i].date.getMonth()]}</p>
     </div>
     <div class="text-center">
          <p class="m-3">${city}</p>
         <h1 class="m-3">${daysArr[i].tempC}<sup>o</sup>C</h1>
     </div>
     <div class="text-center">
         <p  class="m-3 text-info">${daysArr[i].stateWeather}</p>
        <img src="https:${daysArr[i].icon}" class="w-25 m-3 text-center" alt=""/>
         
     </div>
     <div class=" d-flex flex-row mt-5">
        <p class="ps-4"> <i class="fa-solid fa-umbrella"></i> 20% </p>
         <p  class="ps-4"><i class="fa-solid fa-wind"></i> 18km/h</p>
        <p  class="ps-4"> <i class="fa-regular fa-compass"></i> East</p>
        
     </div>
     </div>`;
    // document.getElementById(`forecast_${i+1}`).innerHTML = n;
    document.getElementById(`forecast`).innerHTML += n;
    
  
  }



}
document.getElementById("submit").addEventListener("click",function (){
  search(searchInput.value)})


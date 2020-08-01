
// Open Weather API key
const APIKey = "e932f12603238c44a864079c0f8f9cc9";

async function getWeatherByCity(boxNumber) {
    
    var cityName = document.getElementById("input"+boxNumber).value; 
    if (cityName === "") {
        window.alert("Please enter a city name");
        return;
    }

    var currentWeatherData = await getCurrentWeatherData(cityName);
    var forecastWeatherData = await getForecastWeatherData(cityName);

    //console.log(currentWeatherData);
    //console.log(forecastWeatherData);

    if(currentWeatherData.cod === "404"){
        window.alert("Please enter a city name");
        return;
    }
    
    document.getElementById("location"+boxNumber).innerHTML = currentWeatherData.name + ", " + currentWeatherData.sys.country;
    document.getElementById("temperature"+boxNumber).innerHTML = Math.round(currentWeatherData.main.feels_like - 273.15).toString() + "°C";
    document.getElementById("minMax"+boxNumber).innerHTML = Math.round(currentWeatherData.main.temp_max - 273.15).toString() + "°C/" + 
                                                                    Math.round(currentWeatherData.main.temp_min - 273.15).toString() + "°C";
    var date = new Date(currentWeatherData.sys.sunrise * 1000);
    document.getElementById("sunrise"+boxNumber).innerHTML = date.getHours().toString() + ":" + date.getUTCMinutes().toString();
    date = new Date(currentWeatherData.sys.sunset * 1000);
    document.getElementById("sunset"+boxNumber).innerHTML = date.getHours().toString() + ":" + date.getUTCMinutes().toString();

    document.getElementById("humidity"+boxNumber).innerHTML = (currentWeatherData.main.humidity).toString() + "%";
    document.getElementById("wind"+boxNumber).innerHTML = (currentWeatherData.wind.speed).toString() + " m/s";
    document.getElementById("pressure"+boxNumber).innerHTML = currentWeatherData.main.pressure.toString() + " hPa"

    var isRaining = false;
    if(currentWeatherData.rain !== undefined){
        isRaining = true;
    }
    var isCloudy = false;
    if(currentWeatherData.clouds !== undefined){
        if(currentWeatherData.clouds.all > 70){
            isCloudy = true;
        }
    }

    if(boxNumber === 1){
        if(isRaining){
            document.getElementById("cardOne").style.backgroundImage = "url('assets/rain.gif')";
        }else if(isCloudy){
            document.getElementById("cardOne").style.backgroundImage = "url('assets/cloudy.jpg')";
        }else{
            document.getElementById("cardOne").style.backgroundImage = "url('assets/sunny.jpg')";
        }
    } else if(boxNumber === 2){
        if(isRaining){
            document.getElementById("cardTwo").style.backgroundImage = "url('assets/rain.gif')";
        }else if(isCloudy){
            document.getElementById("cardTwo").style.backgroundImage = "url('assets/cloudy.jpg')";
        }else{
            document.getElementById("cardTwo").style.backgroundImage = "url('assets/sunny.jpg')";
        }
    }else if(boxNumber === 3){
        if(isRaining){
            document.getElementById("cardThree").style.backgroundImage = "url('assets/rain.gif')";
        }else if(isCloudy){
            document.getElementById("cardThree").style.backgroundImage = "url('assets/cloudy.jpg')";
        }else{
            document.getElementById("cardThree").style.backgroundImage = "url('assets/sunny.jpg')";
        }
    }

    document.getElementById("forecastOne"+boxNumber).innerHTML = "";
    document.getElementById("forecastTwo"+boxNumber).innerHTML = "";
    document.getElementById("forecastThree"+boxNumber).innerHTML = "";

    var isRaining = false;
    if(forecastWeatherData.list[8].rain !== undefined){
        isRaining = true;
    }
    var isCloudy = false;
    if(forecastWeatherData.list[8].clouds !== undefined){
        if(forecastWeatherData.list[8].clouds.all > 70){
            isCloudy = true;
        }
    }

    if(isRaining){
        document.getElementById("forecastOne"+boxNumber).innerHTML = '<i class="fa fa-tint" aria-hidden="true"></i>'
    }else if(isCloudy){
        document.getElementById("forecastOne"+boxNumber).innerHTML = '<i class="fa fa-cloud" aria-hidden="true"></i>'
    }else{
        document.getElementById("forecastOne"+boxNumber).innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>'
    }

    document.getElementById("forecastOne"+boxNumber).innerHTML += "<p>" + Math.round(forecastWeatherData.list[8].main.temp_max - 273.15).toString() + "/" + Math.round(forecastWeatherData.list[8].main.temp_min - 273.15).toString() + "°C</p>";

    var isRaining = false;
    if(forecastWeatherData.list[16].rain !== undefined){
        isRaining = true;
    }
    var isCloudy = false;
    if(forecastWeatherData.list[16].clouds !== undefined){
        if(forecastWeatherData.list[16].clouds.all > 70){
            isCloudy = true;
        }
    }

    if(isRaining){
        document.getElementById("forecastTwo"+boxNumber).innerHTML = '<i class="fa fa-tint" aria-hidden="true"></i>'
    }else if(isCloudy){
        document.getElementById("forecastTwo"+boxNumber).innerHTML = '<i class="fa fa-cloud" aria-hidden="true"></i>'
    }else{
        document.getElementById("forecastTwo"+boxNumber).innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>'
    }

    document.getElementById("forecastTwo"+boxNumber).innerHTML += "<p>" + Math.round(forecastWeatherData.list[16].main.temp_max - 273.15).toString() + "/" + Math.round(forecastWeatherData.list[16].main.temp_min - 273.15).toString() + "°C</p>";

    var isRaining = false;
    if(forecastWeatherData.list[24].rain !== undefined){
        isRaining = true;
    }
    var isCloudy = false;
    if(forecastWeatherData.list[24].clouds !== undefined){
        if(forecastWeatherData.list[24].clouds.all > 70){
            isCloudy = true;
        }
    }

    if(isRaining){
        document.getElementById("forecastThree"+boxNumber).innerHTML = '<i class="fa fa-tint" aria-hidden="true"></i>'
    }else if(isCloudy){
        document.getElementById("forecastThree"+boxNumber).innerHTML = '<i class="fa fa-cloud" aria-hidden="true"></i>'
    }else{
        document.getElementById("forecastThree"+boxNumber).innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>'
    }

    document.getElementById("forecastThree"+boxNumber).innerHTML += "<p>" + Math.round(forecastWeatherData.list[24].main.temp_max - 273.15).toString() + "/" + Math.round(forecastWeatherData.list[24].main.temp_min - 273.15).toString() + "°C</p>";

}

function getCurrentWeatherData(cityName){

    return new Promise((resolve, reject) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)  
        .then(function(response) { return response.json() })
        .then(function(currentWeather) {
            resolve(currentWeather);
        })
        .catch(function() {
            // errors
        });
    },2000)
    

}

function getForecastWeatherData(cityName){

    return new Promise((resolve, reject) => {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + APIKey)  
        .then(function(response) { return response.json() })
        .then(function(forecastWeather) {
            resolve(forecastWeather);
        })
        .catch(function() {
            // errors
        });
    }, 2000)
}
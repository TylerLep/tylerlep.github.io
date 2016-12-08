//check for geolocation support in browser- HTTPS preventing this from happening
//if ("geolocation" in navigator) { 
//    navigator.geolocation.getCurrentPosition(function(position) {
//        loadWeather(position.coords.latitude + ',' + position.coords.longitude);
//    });
//} else {
//    loadWeather("Boston,MA", "");
//}

//set weather refresh -- throws error when background refresh...need to fix
//$(document).ready(function(){
//    setInterval(loadWeather,10000);
//});

//fdynamically load weather data into html page - hard code boston with https error
function loadWeather(location) {
    $(document).ready(function() {
        $.simpleWeather({
//            zipcode: '',
//            woeid: woeid,
            location: "Boston, MA",
            unit: 'f',
            success: function(weather) {
                html = '<h2>' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
                html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
                html += '<li class="currently">' + weather.currently + '</li>';

                $("#weather").html(html);
            },
            error: function(error) {
                $("#weather").html('<p>' + error + '</p>');
            }
        });
    });
}


$(document).ready(function() {
    $.simpleWeather({
        location: "New York,NY",
        unit: 'f',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';
            $(".container .location").text(city);
            $(".container .temperature").html(temp);
            $(".container .climate_bg").html(wcode);
            $(".container .windspeed").html(wind);
            $(".container .humidity").text(humidity);
        },
        error: function(error) {
            $(".error").html('<p>' + error + '</p>');
        }
    });


    $.simpleWeather({
        location: "Denver,CO",
        unit: 'f',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';
            $(".container2 .location").text(city);
            $(".container2 .temperature").html(temp);
            $(".container2 .climate_bg").html(wcode);
            $(".container2 .windspeed").html(wind);
            $(".container2 .humidity").text(humidity);
        },
        error: function(error) {
            $(".error").html('<p>' + error + '</p>');
        }
    });

    $.simpleWeather({
        zipcode: '',
        location: "Las Vegas, NV",
        unit: 'f',
        success: function(weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';
            $(".container3 .location").text(city);
            $(".container3 .temperature").html(temp);
            $(".container3 .climate_bg").html(wcode);
            $(".container3 .windspeed").html(wind);
            $(".container3 .humidity").text(humidity);
        },
        error: function(error) {
            $("#weather2").html('<p>' + error + '</p>');
        }
    });
});


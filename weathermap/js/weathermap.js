// create global variables
var map;
var geoJSON;
var request;
var gettingData = false; // start function as false to prevent multiple calls
var openWeatherMapKey = "8c4b23a03e5a4c6d56e863faf35bf26e" //api key

// initialize original google map
function initialize() {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(42.4, -71) // set center of map if current location fails
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // add interaction listeners to make weather requests
    google.maps.event.addListener(map, 'idle', checkIfDataRequested);

    // sets up and populates the info window with details
    map.data.addListener('click', function(event) {
        infowindow.setContent(
            "<img src=" + event.feature.getProperty("icon") + ">" +
            "<br /><strong>" + event.feature.getProperty("city") + "</strong>" +
            "<br />" + event.feature.getProperty("temperature") + "&deg;F" +
            "<br />" + event.feature.getProperty("weather")
        );
        infowindow.setOptions({
            position: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            },
            pixelOffset: {
                width: 0,
                height: -15
            }
        });
        infowindow.open(map);
    });

    // create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // var map = new google.maps.Map(document.getElementById('map-canvas'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // for each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // nly geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });


    var infowindow = new google.maps.InfoWindow({
        map: map
    });

}

//move to pre-selected location based off of button selection
function clickroute(lati, long) {
    var latLng = new google.maps.LatLng(lati, long); //Makes a latlng
    map.panTo(latLng); //Make map global
    console.log(latLng)
}

//geolocator - NOT working

//        if (navigator.geolocation) {
//          navigator.geolocation.getCurrentPosition(function(position) {
//            var pos = {
//              lat: position.coords.latitude,
//              lng: position.coords.longitude
//            };
//          }
//        )}



var checkIfDataRequested = function() {
    // stop extra requests being sent
    while (gettingData === true) {
        request.abort();
        gettingData = false;
    }
    getCoords();
};

// get the coordinates from the Map bounds
var getCoords = function() {
    var bounds = map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
};
// make the weather request
var getWeather = function(northLat, eastLng, southLat, westLng) {
    gettingData = true;
    var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox=" +
        westLng + "," + northLat + "," //left top
        +
        eastLng + "," + southLat + "," //right bottom
        +
        map.getZoom() +
        "&cluster=yes&format=json" +
        "&APPID=" + openWeatherMapKey + "&units=imperial";
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
    console.log(requestString);
};
// take the JSON results and proccess them
var proccessResults = function() {
    console.log(this);
    var results = JSON.parse(this.responseText);
    if (results.list.length > 0) {
        resetData();
        for (var i = 0; i < results.list.length; i++) {
            geoJSON.features.push(jsonToGeoJson(results.list[i]));
        }
        drawIcons(geoJSON);
    }
};

// for each result that comes back, convert the data to geoJSON
var jsonToGeoJson = function(weatherItem) {
    var feature = {
        type: "Feature",
        properties: {
            city: weatherItem.name,
            weather: weatherItem.weather[0].main,
            temperature: weatherItem.main.temp,
            min: weatherItem.main.temp_min,
            max: weatherItem.main.temp_max,
            humidity: weatherItem.main.humidity,
            pressure: weatherItem.main.pressure,
            windSpeed: weatherItem.wind.speed,
            windDegrees: weatherItem.wind.deg,
            windGust: weatherItem.wind.gust,
            icon: "http://openweathermap.org/img/w/" +
                weatherItem.weather[0].icon + ".png",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
        },
        geometry: {
            type: "Point",
            coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
        }
    };




    //      var searchAlbums = function (query) {
    //    $.ajax({
    //        url: 'https://api.spotify.com/v1/search',
    //        data: {
    //            q: query,
    //            type: 'album'
    //        },
    //        success: function (response) {
    //            // console.log(response);
    //            // console.log(response.albums);
    //            // console.log(response.albums.items);
    //            // console.log(response.albums.items[0]);
    //            // console.log(response.albums.items[0].images);
    //            // console.log(response.albums.items[0].images[0].url);
    //            addAlbumsToPage(response.albums);
    //            addAlbumPreview();
    //        }
    //    });
    //};


    // set the custom marker icon
    map.data.setStyle(function(feature) {
        return {
            icon: {
                url: feature.getProperty('icon'),
                anchor: new google.maps.Point(25, 25)
            }
        };
    });
    // returns object
    return feature;
};
// add the markers to the map
var drawIcons = function(weather) {
    map.data.addGeoJson(geoJSON);
    // Set the flag to finished
    gettingData = false;
};


// clear data layer and geoJSON
var resetData = function() {
    geoJSON = {
        type: "FeatureCollection",
        features: []
    };
    map.data.forEach(function(feature) {
        map.data.remove(feature);
    });
};
//   google.maps.event.addDomListener(window, 'load', initialize);
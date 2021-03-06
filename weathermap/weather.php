<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weather layer</title>



    <link rel="stylesheet" href="css/weather.css">


</head>
<body>
<div id="map-canvas"></div>

<input id="pac-input" class="controls" type="text" placeholder="Search For Location">

<button class="button" onclick="clickroute(39.742043, -104.991531)">Fly to Denver</button>
<button class="button" onclick="clickroute(40.742836, -73.988976)">Fly to New York</button>
<button class="button" onclick="clickroute(36.114647, -115.172813)">Fly to Las Vegas</button>
<button class="button" onclick="clickroute(55.676098, 12.568337)">Fly to Copenhagen</button>
<button class="button" onclick="clickroute(-34.603722, -58.381592)">Fly to Buenos Aires</button>



    <style>
    html, body {
        height: 95%;
        margin: 0;
        padding: 0;
      }

    </style>



</body>

<script src="js/weathermap.js" type="text/javascript" charset="utf-8"></script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA89HGhYGbzJ3dB8YpzybQuudABgjiwpzU&libraries=places&callback=initialize"></script>


<script src="http://openlayers.org/api/OpenLayers.js"></script>
</html>

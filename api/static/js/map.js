function createMap(earthquakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the earthquakes layer
  var overlayMaps = {
    "Earthquakes": earthquakes
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [39.50, -98.35],
    zoom: 5,
    layers: [lightmap, earthquakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 1, 2, 3, 4, 5],
      labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i + 1]) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
};


function createMarkers(response) {
  console.log(response);

  function onEachFeature(feature, layer) {
    // does this feature have a property named mag?
    // if (feature.properties && feature.properties.mag) {
        layer.bindPopup("<h3>" + feature.properties.title + "</h3><hr>" + "<h3>" + feature.properties.place + "</h3>");
    }

  var earthquakeLayer= L.geoJSON(response, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var geojsonMarkerOptions = {
          radius: 3*feature.properties.mag, 
          fillColor:  getColor(feature.properties.mag),
          color: "#050f02",
          weight: 0.3,
          opacity: 0.5,
          fillOpacity: 0.8
      };
        return L.circleMarker(latlng, geojsonMarkerOptions);
      }
  });
// }).addTo(map);

createMap(earthquakeLayer)
onEachFeature(feature.properties.mag, "Light Map")

};

  function getColor(mag){
    return (mag > 5) ? "#ff0000" :
        (mag > 4) ? "#ff6600" :
        (mag > 3) ? "#ff9900" :
        (mag > 2) ? "#ffff00" :
        (mag > 1) ? "#e6ff99":
        mag > 0 ? "#66ff33":
                "#ffff"
    };


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
var url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
d3.json(url, function(data){
  createMarkers(data.features)
});

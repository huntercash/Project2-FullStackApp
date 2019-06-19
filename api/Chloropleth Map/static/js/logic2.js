function createMap(studentloan) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, IAmount_loans_awardedery © <a href=\"http://mapbox.com\">Mapbox</a>",
      maxZoom: 10,
      id: "mapbox.light",
      accessToken: API_KEY
    });

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 20,
      id: "mapbox.streets",
      accessToken: API_KEY
    })
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap,
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the Student Loan layer
    var overlayMaps = {
      "Student Loan": studentloan
      
    };
  
    // Create the map object with options
    var map = L.map("map", {
      center: [39.50, -98.35],
      zoom: 5,
      layers: [lightmap, studentloan]
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
      // does this feature have a property named Amount_loans_awarded?
      // if (feature.properties && feature.properties.Amount_loans_awarded) {
          layer.bindPopup("<h3>" + feature.properties.City + "</h3><hr>" + "<h3> Total Loans Awarded: $" + feature.properties.Amount_loans_awarded + "</h3>" );
      }

    var studentloanlayer= L.geoJSON(response, {
      onEachFeature: onEachFeature,
      pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
            radius: 0.00000005 * feature.properties.Amount_loans_awarded, 
            fillColor:  getColor(feature.properties.Amount_loans_awarded),
            color: "#050f02",
            weight: 0.3,
            opacity: 0.5,
            fillOpacity: 0.8
        };
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    });
  // }).addTo(map);

  createMap(studentloanlayer)
  onEachFeature(feature.properties.Amount_loans_awarded, "Light Map")

  };

    function getColor(Amount_loans_awarded){
      return (Amount_loans_awarded > 4000000) ? "#ff0000" :
          (Amount_loans_awarded > 300000) ? "#ff6600" :
          (Amount_loans_awarded > 200000) ? "#ff9900" :
          (Amount_loans_awarded > 100000) ? "#ffff00" :
          (Amount_loans_awarded > 50000) ? "#e6ff99":
          Amount_loans_awarded > 0 ? "#66ff33":
                  "#ffff"
      };

  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  var url= "static/js/loans_by_state.geojson"
  d3.json(url, function(data){
    createMarkers(data.features)
  });
  
var url = "https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson";
var geojson_total;
var geojson_avg;

d3.json(url, function (new_data) {
  console.log(new_data)

  var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 5
  });


  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  var mapbox_streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.dark",
    accessToken: API_KEY
  });


  // path to data from DB
  var loansURL = "static/js/loans_by_state.json";
  // var avgURL = "/income";

  // console.log(new_data)

  // getting data from RESTfull API for total student loan
  d3.json(loansURL, function (loans_data) {
    console.log(loans_data)

    // adding total student loan info into geoJson object
    for (i = 0; i < new_data.features.length; i++) {
      Object.entries(loans_data).forEach(([key, value]) => {
        if (value.City == new_data.features[i].properties.name) {
          new_data.features[i].properties.labelrank = value.Amount_loans_awarded;
          console.log(new_data.features[i].properties.labelrank)
        }
      })
    }
    


    // // getting data from RESTfull API for income

    var avgURL = "static/js/loans_by_state.json"

    d3.json(avgURL, function (avg_data) {

     // adding total student loan info into geoJson object
    for (i = 0; i < new_data.features.length; i++) {
      Object.entries(loans_data).forEach(([key, value]) => {
        if (value.City == new_data.features[i].properties.name) {
          new_data.features[i].properties.name_len = value.avg_loan;
          console.log(value.City)
          console.log(value.avg_loan)
          console.log(new_data.features[i].properties.name_len)
        }
      })
    }



      // creating layer for total student loan
      geojson_total = L.choropleth(new_data, {

        valueProperty: "labelrank",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name+ '<bh>' + '<br>' + feature.properties.labelrank)
        }
      }).addTo(myMap);

        // Binding a pop-up to each layer

      
      // creating layer for income
      geojson_avg = L.choropleth(new_data, {

        valueProperty: "name_len",

        // Set color scale
        scale: ["#ffffb2", "#016703"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name + '<bh>' +  '<br>' + feature.properties.name_len)
        }
      }).addTo(myMap);


      // adding few basemaps
          var baseMaps = {
            "Streets map": mapbox_streets,
            "Light map": light,
            "Dark Map": dark
          };

          // Overlays that may be toggled on or off
          var overlayMaps = {
            "Total Federal Student Loans": geojson_total,
            "Average Student Loan": geojson_avg
          };


          // Pass our map layers into our layer control
          // Add the layer control to the map
          L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
          
      
      
      
      //closing d3 call to income
    });



    //closing d3 call to total student loan
  });


  //closing d3 call to original geojson
});
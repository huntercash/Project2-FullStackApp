
createMaps(statesData)

function createMaps(data) {

var map = L.map('map').setView([37.8, -96], 4);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);

   
  var mapgeojson

  mapgeojson= L.geoJson(statesData, {
		style: mapStyle,
		// onEachFeature: onEachFeature
  }).addTo(map);

  var mapStyle = [{
    'featureType': 'all',
    'elementType': 'all',
    'stylers': [{'visibility': 'off'}]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
  }, {
    'featureType': 'water',
    'elementType': 'labels',
    'stylers': [{'visibility': 'off'}]
  }, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
  }];
};

// ____________________________________________________________________________

var url = "static/js/loans_by_state.json"

// Grab the data with d3
d3.json(url, function(response) {
  function_call(response);
});


function function_call(response){
  console.log(response)
  
  // Create a new marker cluster group
  var marker_grp = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {

    // Set the data location property to a variable
    // var location = response[i].location;
    // console.log(location);

    // Check for location property
    // if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      marker_grp.addLayer(L.marker([response[i].Latitude, response[i].Longitude])
        .bindPopup(response[i].State));
    // }

  }

  // Add our marker cluster layer to the map
  Window.map = new L.Map('map');
  map.addLayer(marker_grp);
   

};









// function createData () {
// 	// control that shows state info on hover
//   var info = L.control();

// 	info.onAdd = function (map) {
// 		this._div = L.DomUtil.create('div', 'info');
// 		this.update();
// 		return this._div;
// 	};

// 	info.update = function (props) {
// 		this._div.innerHTML = '<h4>US Population Amounts_loans_awarded</h4>' +  (props ?
// 			'<b>' + props.name + '</b><br />' + props.Amounts_loans_awarded + ' people / mi<sup>2</sup>'
// 			: 'Hover over a state');
// 	};

// 	info.addTo(map);


// 	// get color depending on population Amounts_loans_awarded value
// 	function getColor(d) {
//     console.log(d)
// 		return d > 40000000 ? '#800026' :
// 				d > 3000000  ? '#BD0026' :
// 				d > 200000  ? '#E31A1C' :
// 				d > 100000  ? '#FC4E2A' :
// 				d > 50000   ? '#FD8D3C' :
// 				d > 20000   ? '#FEB24C' :
// 				d > 10000   ? '#FED976' :
// 							'#FFEDA0';
// 	}

// 	function style(feature) {
// 		return {
// 			weight: 2,
// 			opacity: 1,
// 			color: 'white',
// 			dashArray: '3',
// 			fillOpacity: 0.7,
// 			fillColor: getColor(feature.properties.Amounts_loans_awarded)
// 		};
// 	}

// 	function highlightFeature(e) {
// 		var layer = e.target;

// 		layer.setStyle({
// 			weight: 5,
// 			color: '#666',
// 			dashArray: '',
// 			fillOpacity: 0.7
// 		});

// 		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
// 			layer.bringToFront();
// 		}

// 		info.update(layer.feature.properties);
// 	}

//   var geojson;

// 	function resetHighlight(e) {
// 		geojson.resetStyle(e.target);
// 		info.update();
// 	}

// 	function zoomToFeature(e) {
// 		map.fitBounds(e.target.getBounds());
// 	}

// 	function onEachFeature(feature, layer) {
// 		layer.on({
// 			mouseover: highlightFeature,
// 			mouseout: resetHighlight,
// 			click: zoomToFeature
// 		});
// 	}

// 	geojson = L.geoJson(studentLoan, {
// 		style: style,
// 		onEachFeature: onEachFeature
// 	}).addTo(map);

// 	map.attributionControl.addAttribution('Population data &copy; <a href="http://studentLoan.gov/">US studentLoan Bureau</a>');


// 	var legend = L.control({position: 'bottomright'});

// 	legend.onAdd = function (map) {

// 		var div = L.DomUtil.create('div', 'info legend'),
// 			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
// 			labels = [],
// 			from, to;

// 		for (var i = 0; i < grades.length; i++) {
// 			from = grades[i];
// 			to = grades[i + 1];

// 			labels.push(
// 				'<i style="background:' + getColor(from + 1) + '"></i> ' +
// 				from + (to ? '&ndash;' + to : '+'));
// 		}

// 		div.innerHTML = labels.join('<br>');
// 		return div;
// 	};

//   legend.addTo(map);
// };

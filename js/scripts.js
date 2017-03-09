// instantiate the map object
var map = L.map('mapContainer').setView([19.215342, 72.828487], 15);

//add a dark basemap from carto's free basemaps
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);



var layer = L.geoJson(myData).addTo(map);

function getColor(d) {
    return d == 1  ? '#800026' :
           d == 2  ? '#BD0026' :
           d == 3  ? '#E31A1C' :
           d == 4  ? '#FC4E2A' :
           d == 5  ? '#FD8D3C' :
           d == 6  ? '#FEB24C' :
           d == 7  ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
        return {
            fillColor: getColor(feature.properties.value),
            weight: 1,
            opacity: .9,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.2

        };
    }

var geojson = L.geoJson(myData, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer= e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });


        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

//mousout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

//zoom to feature on click of municipality
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//listen for the functions so that on these actions it highlights, zooms etc.
function onEachFeature(feature,layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
geojson = L.geoJson(myData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
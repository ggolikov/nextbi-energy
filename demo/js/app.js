import L from 'leaflet';
import points from '../data/points';
import lines from '../data/lines';

let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    center = [0, 0],
    lmap = new L.Map('map', {layers: [osm], center, zoom: 5, maxZoom: 22, zoomAnimation: true});

lmap.fitBounds([
    [56.67207490184347, 38.29936981201172],
    [56.197919018820286, 37.83159255981445]
]);

let geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};

let greenHex = "0x00ff00",
    redHex = "0xff0000",
    greenInt = parseInt(greenHex, 16),
    redInt = parseInt(redHex, 16);


console.log(greenInt);
console.log(redInt);
let linesLayer = new L.geoJSON(lines).addTo(lmap);

let pointsLayer = new L.geoJSON(points, {
    pointToLayer: function (feature, latlng) {
        let radius = feature.properties.capacity,
            colorInt = greenInt + feature.properties.risk * (redInt - greenInt),
            colorHex = numHex(colorInt);

            console.log(colorHex);

        return L.circleMarker(latlng, {...geojsonMarkerOptions, radius, fillColor: `#${colorHex}` });
    },
    onEachFeature: function(feature, layer){
        layer.bindPopup(feature.properties.city);
    },
}).addTo(lmap);

function numHex(s)
{
    var a = s.toString(16);
    if ((a.length % 2) > 0) {
        a = "0" + a;
    }
    return a;
}

window.lmap = lmap;

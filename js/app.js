import L from 'leaflet';
import points from '../data/points';
import points2 from '../data/points2';
import lines from '../data/lines';
import palette from './palette';

// let osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
// let osm = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
let osm = L.tileLayer('http://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}{r}.png?access_token=pk.eyJ1Ijoia29zbW9zbmlta2lydSIsImEiOiJjaWhxMHNlZDgwNGFldHBtMjdyejQ3YTJ3In0.3UAAWcIBabrbUhHwmp1WjA', {
// let osm = L.tileLayer('http://atilecart.kosmosnimki.ru/kosmo/{z}/{x}/{y}{r}.png', {
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
let linesLayer = new L.geoJSON(lines, {
    style: function(feature) {
        return { color: `#999999`, weight: 2 }
    },
}).addTo(lmap);

let pointsLayer;

function addPoints(points) {
    if (pointsLayer && lmap.hasLayer(pointsLayer)) {lmap.removeLayer(pointsLayer)};
    pointsLayer = new L.geoJSON(points, {
        style: function(feature) {
            let { name, risk } = feature.properties;
            return { fillColor: palette[risk], fillOpacity: 1 }
        },
        pointToLayer: function (feature, latlng) {
            let radius = feature.properties.capacity;

            return L.circleMarker(latlng, {...geojsonMarkerOptions, radius })
        },
        onEachFeature: function(feature, layer){
        },
    }).addTo(lmap);
}

addPoints(points);

window.lmap = lmap;

window.setRisk = () => {
    addPoints(points2);
}

window.resetRisk = () => {
    addPoints(points);
}

let setButton = document.getElementById('set');
let resetButton = document.getElementById('reset');

setButton.addEventListener('click', window.setRisk);
resetButton.addEventListener('click', window.resetRisk);

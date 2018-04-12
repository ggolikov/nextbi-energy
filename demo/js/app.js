require('leaflet');
require('../../src/L.Plugin.js');

const osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    map = new L.Map('map', {layers: [osm], center: point, zoom: 17, maxZoom: 22}),
    root = document.getElementById('content');

console.log(L.Plugin);

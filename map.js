let map;
let baseMaps;
let safra = L.layerGroup();
let overlays;

async function main() {
  function init() {
    map = initMap();

    window.addEventListener('DOMContentLoaded', function(){
        loadData();
        loadSafra();
    })
  }

  function initMap() {
    // Initialise map
    let singapore = [1.3521, 103.8198];
    let map = L.map("singaporeMap");
    map.setView(singapore, 13);

    // Add light layer
    let lightMode = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY2FyYWNhcmE2IiwiYSI6ImNrenV6anhiMjdyamYyd25mYXB3N2V6aGUifQ._MiXk72eEw378aB0cJnNng",
      }
    );
    lightMode.addTo(map)
    // Add dark layer
    let darkMode = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: 'GSRGuSqDDcYgQnf3k9ESutlUBugw4YctZAzWNSE7iZLhxb0jQZLuHbOXq5etkVAQ'
    });
    

    // Set up base layers
    baseMaps = {
        "Light" : lightMode,
        "Dark" : darkMode
    };

    // let safraLatLng = safraCoordinates();
    // console.log(safraLatLng)
    
    // for(let item of safraLatLng){
    //   let marker = L.marker(item);
    //   marker.addTo(safraLayer)
    // }

    overlays = {
      "SAFRA" : safra
    }
    // {collapsed=false}??
    L.control.layers(baseMaps, overlays).addTo(map);

    return map;
  }
  init();
}

main();

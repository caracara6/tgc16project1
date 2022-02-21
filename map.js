let map;
let lightMode;
let darkMode;
let safra = L.layerGroup();
let schoolClusterLayer = L.markerClusterGroup();
let searchSportsLayer = L.markerClusterGroup();
let baseMaps;
let overlays;

async function main() {
  function init() {
    map = initMap();

    window.addEventListener('DOMContentLoaded', function(){
        loadData();
        loadSafra();
        loadSchools();
        let searchBtn = document.querySelector('#searchBtn');
        searchBtn.addEventListener('click', async function(){

          map.eachLayer(function (layer) {
            map.removeLayer(layer);
          });

          let searchInput = document.querySelector('#searchInput').value;
          // which part of the api to search?
          let response = await axios.get('data/school_sports_facilities.geojson');
          for(let item of response.data.features){
            let dummyDiv = document.createElement('div')
            dummyDiv.innerHTML = item.properties.description;
            let sportsTargetArray = dummyDiv.querySelectorAll('td');
            let sportsTarget = sportsTargetArray[15].innerHTML;
            sportsTarget = sportsTarget.toLowerCase().trim().split(',')
            // console.log(sportsTarget)
            if (sportsTarget.includes(searchInput.toLowerCase().trim())) {
              let sportsTargetMarker = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]]);
              sportsTargetMarker.addTo(searchSportsLayer)
              searchSportsLayer.addTo(map);
              document.querySelector('#result').innerHTML = item.properties.name
            }
          }
          
        })
    })
  }

  function initMap() {
    // Initialise map
    let singapore = [1.3521, 103.8198];
    let map = L.map("singaporeMap");
    map.setView(singapore, 13);

    // Add light layer
    lightMode = L.tileLayer(
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
    darkMode = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
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

    // Set up overlays
    overlays = {
      "SAFRA" : safra,
      "Dual-Use-Scheme" : schoolClusterLayer
    }

    // {collapsed=false}??
    L.control.layers(baseMaps, overlays).addTo(map);

    return map;
  }
  init();
}

main();

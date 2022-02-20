async function loadData() {
    let response = await axios.get('data/sportsfacilities.geojson');
    let sportsFacilitiesLayer = L.geoJson(response.data, {
        onEachFeature : function(feature, layer) {
            // layer.bindPopup(feature.properties.Description)
            let dummyDiv = document.createElement('div')
            dummyDiv.innerHTML = feature.properties.Description;
            let rightColumn = dummyDiv.querySelectorAll('td');
            let facilityName = rightColumn[0];
            let address = rightColumn[1];
            layer.bindPopup(`<div>
                    <ul>
                        <li>Facilities: ${facilityName}</li>
                        <li>Address: ${address}</li>
                    </ul>
                </div>`)
        }
    }).addTo(map);
    sportsFacilitiesLayer.setStyle({
        'color' : '#F226EE'
    })
    return sportsFacilitiesLayer
}

async function loadSafra() {
    let response = await axios.get('')
}

// async function search(place){

// }

async function loadData() {
    let response = await axios.get('data/sportsfacilities.geojson');
    let sportsFacilitiesLayer = L.geoJson(response.data, {
        onEachFeature : function(feature, layer) {
            // layer.bindPopup(feature.properties.Description)
            let dummyDiv = document.createElement('div')
            dummyDiv.innerHTML = feature.properties.Description;
            let rightColumn = dummyDiv.querySelectorAll('td');
            let facilityName = rightColumn[0].innerHTML;
            let address = rightColumn[1].innerHTML;
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
    let response = await axios.get('data/SAFRA.geojson');
    let safraLayer = L.geoJSON(response.data, {
        onEachFeature : function(feature, layer){
            layer.bindPopup(feature.properties.name)
        }
    }).addTo(safra);
    return safraLayer
}

async function loadSchools() {
    let response = await axios.get('data/school_sports_facilities.geojson');
    let schoolLayer = L.geoJSON(response.data, {
        onEachFeature : function(feature, layer){
            layer.bindPopup(feature.properties.name)
        }
    }).addTo(schoolClusterLayer);
    return schoolLayer
}


async function search(place){

}
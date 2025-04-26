// Mock data: in real life, fetch from your backend or MLS API
const properties = [
  {
    id: 1,
    title: "123 Main St",
    price: "$1,150,000",
    lat: 48.76,
    lng: -122.461,
  },
  { id: 2, title: "456 Elm Ave", price: "$899,000", lat: 48.75, lng: -122.47 },
  // ...
];

let map,
  markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 48.76, lng: -122.461 },
    zoom: 12,
  });
  renderResults(properties);
}

function renderResults(list) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  // clear old markers
  markers.forEach((m) => m.setMap(null));
  markers = [];

  list.forEach((p) => {
    // create card
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `<h4>${p.title}</h4><p>${p.price}</p>`;
    card.onclick = () => focusMarker(p.id);
    container.append(card);

    // create map marker
    const marker = new google.maps.Marker({
      position: { lat: p.lat, lng: p.lng },
      map,
    });
    marker.addListener("click", () => {
      map.panTo(marker.getPosition());
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    marker.propertyId = p.id;
    markers.push(marker);
  });
}

function focusMarker(id) {
  const marker = markers.find((m) => m.propertyId === id);
  if (marker) {
    map.panTo(marker.getPosition());
    map.setZoom(15);
  }
}

window.onload = initMap;
// Optionally wire your "apply-filters" button to filter the `properties` array
// and then call renderResults(filteredList);

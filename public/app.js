// // As an example, let's say that Masada is a national park you visited
// var visitedParks = [{name: "Masada", lat: 31.3154, lng: 35.3536}];

// // Center the map around Masada, with zoom level 8
// var map = L.map('map').setView([31.3154, 35.3536], 8);

// // Set up the map layer source
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
// }).addTo(map);

// // Function to add park to map
// function addParkToMap(park) {
//     L.marker([park.lat, park.lng]).addTo(map)
//         .bindPopup('I have visited ' + park.name + '!');
// }



// const addParkButton = document.getElementById('addParkButton');
// const addParkForm = document.getElementById('addParkForm');

// addParkButton.addEventListener('click', () => {
//     addParkForm.style.display = 'block'; // Show the form when the button is clicked
// });

// addParkForm.addEventListener('submit', event => {
//     event.preventDefault(); // Prevent the form from reloading the page
//     const name = document.getElementById('name').value;
//     const lat = parseFloat(document.getElementById('lat').value);
//     const lng = parseFloat(document.getElementById('lng').value);

//     fetch('/parks', { // Send a POST request to the server
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, lat, lng }) // Pass the name and coordinates from the form
//     })
//     .then(response => response.json())
//     .then(park => {
//         addParkForm.style.display = 'none'; // Hide the form after the park is added
//         addParkToMap(park); // Add the new park to the map
//     })
//     .catch(error => console.error('Error:', error));
// });

// const cancelAddParkButton = document.getElementById('cancelAddPark');

// cancelAddParkButton.addEventListener('click', event => {
//     event.preventDefault(); // Prevent the form from reloading the page
//     addParkForm.style.display = 'none'; // Hide the form when the "X" button is clicked
// });

// // Loop over the list of visited parks and add a marker for each one
// for (var i = 0; i < visitedParks.length; i++) {
//     var park = visitedParks[i];
//     addParkToMap(park);
// }


// Center the map around Jerusalem, with zoom level 8
var map = L.map('map').setView([31.7683, 35.2137], 8);

// Set up the map layer source
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to add park to map
function addParkToMap(park) {
    L.marker([park.lat, park.lng]).addTo(map)
        .bindPopup('I have visited ' + park.name + '!');
}


const addParkButton = document.getElementById('addParkButton');
const addParkForm = document.getElementById('addParkForm');

addParkButton.addEventListener('click', () => {
    addParkForm.style.display = 'block'; // Show the form when the button is clicked
});

addParkForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from reloading the page
    const name = document.getElementById('name').value;
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);

    fetch('/parks', { // Send a POST request to the server
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lat, lng }) // Pass the name and coordinates from the form
    })
    .then(response => response.json())
    .then(park => {
        addParkForm.style.display = 'none'; // Hide the form after the park is added
        addParkToMap(park); // Add the new park to the map
    })
    .catch(error => console.error('Error:', error));
});

const cancelAddParkButton = document.getElementById('cancelAddPark');

cancelAddParkButton.addEventListener('click', event => {
    event.preventDefault(); // Prevent the form from reloading the page
    addParkForm.style.display = 'none'; // Hide the form when the "X" button is clicked
});

// Loop over the list of visited parks and add a marker for each one
for (var i = 0; i < visitedParks.length; i++) {
    var park = visitedParks[i];
    addParkToMap(park);
}

// Fetch the list of visited parks and add a marker for each one
fetch('/parks')
.then(response => response.json())
.then(visitedParks => {
    for (var i = 0; i < visitedParks.length; i++) {
        var park = visitedParks[i];
        addParkToMap(park);
    }
});
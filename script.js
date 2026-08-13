// MAP

const mapElement = document.querySelector('#map');

// Creates map
const map = L.map(mapElement).setView([-36.877, 174.764], 14);
    // Gets map images 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // Maximum zoom set to 19
        maxZoom: 19,
        // Credits
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


    // Load saved posts
    const posts = JSON.parse(localStorage.getItem("posts")) || [];


    // Add markers function
    function createMarker(post) {

    const marker = L.marker([
        post.latitude,
        post.longitude
    ]).addTo(map);

   marker.bindPopup(`
        <b>${post.title}</b><br>
        Type: ${post.type}<br>
        Address: ${post.address}<br>
        Date: ${post.date}<br>
        Description: ${post.description}
    `);
}

// Calls marker function to make the marker
posts.forEach(post => {

    if (post.latitude && post.longitude) {
        createMarker(post);
    }

});
    





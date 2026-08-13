// Define error variables
const errorAddress = document.getElementById("errorAddress");
const errorPostType = document.getElementById("errorPostType");
const errorDate = document.getElementById("errorDate");
const errorDescription = document.getElementById("errorDescription");
const errorTitle = document.getElementById("errorTitle");
const titleInput = document.getElementById("title");
const errorCheckBox = document.getElementById("errorCheckBox");
const postTitleQ =document.getElementById("postTitleQ");
const postTypeQ =document.getElementById("postTypeQ");
const postAddressQ =document.getElementById("postAddressQ");
const postDateQ =document.getElementById("postDateQ");
const postDescriptQ =document.getElementById("postDescriptQ");







const textarea = document.querySelector("textarea");
const counter = document.getElementById("counter");
textarea.addEventListener("input", function(e){
  const target = e.target;
  const maxLength = target.getAttribute("maxlength");
  const currentLength = target.value.length;
  counter.innerHTML = `${currentLength}/${maxLength}`;

  if (currentLength >= 400){
    errorDescription.textContent = "Character length limit reached!";
  } 


})



// Finds post form, waits till form is submitted and runs below code. Event stores information of what happened and async allos to use await later in the code.
document.getElementById("postForm").addEventListener("submit", async function (event) {
  // Stops normal form behaviour so js can handle the submission 
  event.preventDefault();
  // Clears error messages
  errorPostType.textContent = "";
  errorAddress.textContent = "";
  errorDate.textContent = "";
  errorDescription.textContent = "";
  errorTitle.textContent = "";

// Title Validation

// Read the date input in HTML
const title = document.getElementById('title').value.trim();

// Require a title and if not entered then prevent submission

if (!title) {
    errorTitle.textContent = "Please type a title for your post!";
    postTitleQ.scrollIntoView({
    behavior: "smooth",
    });
    return;
}

// Radio button (post type) validation
  // Which radio is selected and makes sure it is selected.
  const selected = document.querySelector('input[name="type"]:checked');

  if (!selected) {
    errorPostType.textContent = "Please enter a post type!";
    postTypeQ.scrollIntoView({
    behavior: "smooth",
    });
    return;

  }
  

  // Reads and trim the address
  const address = document.getElementById('address').value.trim();
  
  // Prepare coordinates
  let latitude = null;
  let longitude = null;

  // Checks the input address and checks if the geocode returned is valid and has 'Eden' to check if it is in Mt Eden
  if (address) {

    try {
        const geocode = await geocodeAddress(address);
        
        if (!geocode.display_name.includes("Eden")) {
            errorAddress.textContent = "Please enter an valid address in Mt Eden (the entire address eg: Kenyon Avenue, Mt Eden)";
            postAddressQ.scrollIntoView({
            behavior: "smooth",
            });

            return;
}

        // Gets the returned lat and lon values.
        latitude = parseFloat(geocode.lat);
        longitude = parseFloat(geocode.lon);

    // If address check fails this will prints message in console and webpage to debug
    } catch (err) {
        console.error(err);
        errorAddress.textContent = "Address check failed. Retry the address";
        errorAddress.classList.add("error-message");
        postAddressQ.scrollIntoView({
        behavior: "smooth",
      });
        return;
    }

    // Checks if address was entered or else displays text.
} else {
    errorAddress.textContent = "Please enter an address.";
    postAddressQ.scrollIntoView({
    behavior: "smooth",
    });
    return;
}


// Date Validation

// Read the date input in HTML
const incidentDate = document.getElementById('incidentDate').value.trim();

// Require a date and if not entered then prevent submission

if (!incidentDate) {
    errorDate.textContent = "Please select the incident date.";
    postDateQ.scrollIntoView({
    behavior: "smooth",
    });
    return;
}

// Description Validation

// Read the data input in HTML
const description = document.getElementById("description").value.trim();

if (!description) {
  errorDescription.textContent = "Please enter a description!";
  postDescriptQ.scrollIntoView({
  behavior: "smooth",
  });
  return;
}


//Post guidelines validation
 
const checked = document.querySelector('input[name="checkbox"][type="checkbox"]:checked');

if (!checked) {
  errorCheckBox.textContent = "Please check that you agree to post guidelines in order to proceed!";
  return;
}



  // Gets already saved posts
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  // Creates new post object
  const post = {
    title: title,
    // Stores radio button value
    type: selected.value,
    // Gets address and lat and lon
    address: address,
    latitude: latitude,
    longitude: longitude,
    // Gets date
    date: incidentDate,
    description: description,

  };

  // Adds new post and saves to local storage. Then redirects the user to the appropriate page
  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  // Redirect based on type
  if (selected.value === "Crime") {
    window.location.href = "crime.html";
  } else if (selected.value === "Lost Property") {
    window.location.href = "lost_property.html";
  } 
});

// Gets the coordinates for an address
async function geocodeAddress(address) {
    // Creates the URL to send user's address to Nominatim
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    // Sends a request to the Nominatim server and awaits response
    const response = await fetch(url);
    // Converts the JSON response into JavaScript data
    const results = await response.json();
    // Returns the first matching address, or null if no address was found
    return results.length > 0 ? results[0] : null;
}



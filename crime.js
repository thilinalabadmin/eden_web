// Get existng post from local storage
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Filter out other posts except for ones labaled with Crime
const crimePosts = posts.filter(post => post.type === "Crime");

// Find the container box on crime.html page
const container = document.getElementById("crimePostsContainer");

// If no crimes, then display message else list the crimes
if (crimePosts.length === 0 ) {
    container.innerHTML = "<p class='noCrimes'> No crimes reported yet. </p>";

} else {
    // Check already existing posts and orders them.
    crimePosts.forEach((post, index) => {
        const originalIndex = posts.indexOf(post);
        // Creates a new p tag for each post
        const postElement = document.createElement("p");
        postElement.classList.add("crime-post-box");
        // Responsible for text shown in crime page
        postElement.innerHTML = `
           <span class="crime-title"> ${post.title} </span> <br><br>
            Address: ${post.address} <br><br>
            Date: ${post.date} <br>
            Description: ${post.description}

        `;

        // Creating a delete button for each post
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = " Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add("delete_style");

        // Delete this specific item
        deleteBtn.addEventListener("click", () => {

            // Remove one item at the original index
            posts.splice(originalIndex, 1);                
            // Save the newly updated list back to localStorage
            localStorage.setItem("posts", JSON.stringify(posts)); 
                
            // Refresh the page to show the new list
            location.reload(); 
            });

            postElement.appendChild(deleteBtn);
            container.appendChild(postElement);
        })

}


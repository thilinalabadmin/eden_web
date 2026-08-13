// Get existng post from local storage
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Filter out other posts except for ones labaled with Lost property
const propertyPosts = posts.filter(post => post.type === "Lost Property");

// Find the container box on lost_property.html page
const container = document.getElementById("propertyPostsContainer");

// If no lost property, then display message or else list the lost property
if (propertyPosts.length === 0 ) {
    container.innerHTML = "<p class='noProperty'> No lost property reported yet. </p>";

} else {
    // Check already existing posts and orders them.
    propertyPosts.forEach((post, index) => {
        const originalIndex = posts.indexOf(post);
        // Creates a new p tag for each post
        const postElement = document.createElement("p");
        postElement.classList.add("property-post-box");
        // Responsible for text shown in lost property page
        postElement.innerHTML = `
           <span class="property-title"> ${post.title} </span> <br><br>
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


const errorName = document.getElementById("errorName");
const errorPassword = document.getElementById("errorPassword");
const success = document.getElementById("success");
const formErrorMessage = document.getElementById("formErrorMessage");


document.getElementById("login").addEventListener("submit", async function (event) {
    //Stops form from submitting
    event.preventDefault();
  
  // Clears error messages
  errorName.textContent = "";
  errorPassword.textContent = "";
  formErrorMessage.textContent = "";
  success.textContent= "";



  const name = document.getElementById('name')?.value.trim();


if (!name) {
    errorName.textContent = "Please enter your full name!";
    return;
}


  const password = document.getElementById('password')?.value.trim();

if (!password) {
    errorPassword.textContent = "Please enter your password!";
    return;
}

if (name === "Testing" && password === "ABC123") {
    document.getElementById("login").style.display = "none";
    document.getElementById("success").textContent = `Welcome ${name}!`;

} else {
    formErrorMessage.textContent = "Name or password incorrect";
}



});



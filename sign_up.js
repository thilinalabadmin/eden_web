const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ageError = document.getElementById("ageError");
const passwordError = document.getElementById("passwordError");
const passwordConfirmError = document.getElementById("passwordConfirmError");
const success = document.getElementById("success");


document.getElementById("signUp").addEventListener("submit", async function (event) {
    //Stops form from submitting
    event.preventDefault();
  
    // Clears error messages
    nameError.textContent = "";
    emailError.textContent = "";
    ageError.textContent = "";
    passwordError.textContent = "";
    passwordConfirmError.textContent = "";


  const name = document.getElementById('name')?.value.trim();

  if (!name) {
    nameError.textContent = "Please enter your full name!";
    document.getElementById("name").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    return;
}

  const email= document.getElementById('email')?.value.trim();
  if (!email) {
    emailError.textContent = "Please enter your email!";
    document.getElementById("name").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    return;
}

  const age= document.getElementById('age')?.value.trim();

   if (!age) {
    ageError.textContent = "Please enter your age!";
    return;
}

    if (age <= 13) {
        ageError.textContent = "You must be older than 13 to create an account!"
        return;
    }
    
  const password = document.getElementById('password')?.value.trim();
  const passwordConfirm = document.getElementById('passwordConfirm')?.value.trim();


    if (!password) {
        passwordError.textContent = "Please enter your password!"
        return;
    }

    if (!passwordConfirm) {
        passwordConfirmError.textContent = "Please confirm your password!"
        return;
    }

     //Terms and conditions validation
    
    const checked = document.querySelector('input[name="checkbox"][type="checkbox"]:checked');

    if (!checked) {
        errorCheckBox.textContent = "Please check that you agree to Terms and Conditions in order to proceed!";
        return;
    }

    if (password === passwordConfirm) {
        document.getElementById("signUp").style.display = "none";
        document.getElementById("success").textContent = `Welcome ${name}!`;

    } else {
        passwordConfirmError.textContent = "Passwords do not match!"


    }

   











});



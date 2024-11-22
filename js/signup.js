var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var retypePassword = document.getElementById("retypePassword");
var signupbtn = document.getElementById("signupbtn");
var error = document.getElementById("error");
var success = document.getElementById("success");

var togglePassword = document.getElementById("togglePassword");
var toggleRetypePassword = document.getElementById("toggleRetypePassword");

var sign_up_arr = [];

if (localStorage.getItem("info") == null) {
  sign_up_arr = [];
} else {
  sign_up_arr = JSON.parse(localStorage.getItem("info"));
}

function sign_up() {
  if (isSigupEmpty()) {
    error.innerHTML = `<p class="text-danger m-3">All inputs are required</p>`;
  } else if (!isPasswordValid()) {
    error.innerHTML = `<p class="text-danger m-3">Password must contain at least one uppercase letter and one symbol</p>`;
  } else if (signupPassword.value !== retypePassword.value) {
    error.innerHTML = `<p class="text-danger m-3">Passwords do not match</p>`;
  } else {
    var signup = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };

    if (isEmailExist()) {
      error.innerHTML = `<p class="text-danger m-3">Email already exists</p>`;
    } else {
      sign_up_arr.push(signup);
      localStorage.setItem("info", JSON.stringify(sign_up_arr));
      error.innerHTML = `<p class="text-success m-3">Signup Successful</p>`;

      // Redirect to login page after successful signup
      setTimeout(function () {
        window.location.href = "index.html"; // Change to your actual login page URL
      }, 1000); // Wait 1 second to allow success message to show
    }
  }
}

function isSigupEmpty() {
  return (
    signupName.value === "" ||
    signupEmail.value === "" ||
    signupPassword.value === "" ||
    retypePassword.value === "" // Check for the retype password as well
  );
}

function isEmailExist() {
  for (var i = 0; i < sign_up_arr.length; i++) {
    if (sign_up_arr[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
      return true;
    }
  }
  return false;
}

// Password validation: must contain at least one uppercase letter and one symbol
function isPasswordValid() {
  var password = signupPassword.value;
  var hasUppercase = /[A-Z]/.test(password); // Check for uppercase letter
  var hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Check for symbol
  return hasUppercase && hasSymbol;
}

// Toggle visibility for signupPassword
togglePassword.addEventListener("click", function () {
  const icon = togglePassword.querySelector("i");

  if (signupPassword.type === "password") {
    signupPassword.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    signupPassword.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// Toggle visibility for retypePassword
toggleRetypePassword.addEventListener("click", function () {
  const icon = toggleRetypePassword.querySelector("i");

  if (retypePassword.type === "password") {
    retypePassword.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    retypePassword.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// Validate inputs on signup button click
signupbtn.addEventListener("click", function () {
  sign_up();
});

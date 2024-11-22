var loginemail = document.getElementById("loginemail");
var loginpassword = document.getElementById("loginpassword");
var loginbtn = document.getElementById("loginbtn");

if (localStorage.getItem("info") == null) {
  sign_up_arr = [];
} else {
  sign_up_arr = JSON.parse(localStorage.getItem("info"));
}

function isLoginEmpty() {
  if (loginemail.value == "" || loginpassword.value == "") {
    return true;
  } else {
    return false;
  }
}

function login() {
  if (isLoginEmpty() == true) {
    error.innerHTML = `<p class="text-danger m-3">All inputs is required</p>`;
  } else {
    for (var i = 0; i < sign_up_arr.length; i++) {
      {
        if (
          sign_up_arr[i].email.toLowerCase() ==
            loginemail.value.toLowerCase() &&
          sign_up_arr[i].password.toLowerCase() ==
            loginpassword.value.toLowerCase()
        ) {
          localStorage.setItem("login-info", sign_up_arr[i].name);
          window.location = "./home.html";
        } else {
          error.innerHTML = `<p class="text-danger m-3">incorrect email or password</p>`;
        }
      }
    }
  }
}

loginbtn.addEventListener("click", function () {
  login();
});
var loginPassword = document.getElementById("loginpassword");
var togglePassword = document.getElementById("togglePassword");

// Toggle visibility for login password
togglePassword.addEventListener("click", function () {
  const icon = togglePassword.querySelector("i");

  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    loginPassword.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let signInBtn = document.querySelector("#signIn");
let getUserData = JSON.parse(localStorage.getItem("userData"));

window.onload = function () {
  userName.focus();
};

signInBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (userName.value && password.value) {
    if (
      getUserData.userName.trim() === userName.value.trim() &&
      getUserData.password.trim() === password.value.trim()
    ) {
      setTimeout(() => {
        window.location = "index.html";
      }, 500);
    } else {
      alert("not valid");
    }
  } else {
    alert("Fill Your Data");
  }
});

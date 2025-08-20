let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let signUPBtn = document.querySelector("#signUP");

window.onload = function () {
  userName.focus();
};

signUPBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (userName.value && password.value && email.value) {
    let userData = {
      userName: userName.value,
      password: password.value,
      email: email.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(() => {
      window.location = "login.html";
    }, 500);
  } else {
    alert("please Fill The Empty");
  }
});


let userInfo = document.querySelector("#userInfo")
let user = document.querySelector("#user")
let links = document.querySelector("#links")
let getUserData=JSON.parse(localStorage.getItem('userData'))
//if user is saveing in localstorage this will happen
if (getUserData.userName) {
    links.remove();
    user.style.display = 'block'

    userInfo.style.display = "flex";
    user.innerHTML = getUserData.userName;
}

// if user is clicking on button logout this will happen
let logOutBtn = document.querySelector("#logOut")
logOutBtn.addEventListener("click",logOut)
function logOut() {
 localStorage.clear();
    setTimeout(() => {
        window.location = "index.html"
    }, 500);

}
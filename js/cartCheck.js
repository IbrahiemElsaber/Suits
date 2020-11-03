export let LoggedInUser = JSON.parse(sessionStorage.getItem("userData"));
function checkIfUserLoggedIn() {
  if (LoggedInUser) {
    document.getElementById("accountPage").style.display = "none";
    document.getElementById("logOut").style.display = "block";
  } else {
    document.getElementById("accountPage").style.display = "block";
    document.getElementById("logOut").style.display = "none";
  }
}
export let checkIfUserLoggedInCalling = checkIfUserLoggedIn();
export let logOutAndDeleteLoggedInUsers = document.getElementById("logOut").addEventListener("click", function () {
  sessionStorage.clear();

  window.location = window.location;
});

export let showGalleryFromHome = $(".card input[type='button']").on("click", function () {
  window.location.href = "./gallery.html";
});

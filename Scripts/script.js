var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var wind=document.getElementById("window");

var span = document.getElementsByClassName("close")[0];
function func() {
  modal.style.display = "block";
}

btn.onclick = func;


span.onclick = function() {
  modal.style.display = "none";
}


wind.onclick = function(event) {
  modal.style.display = "none";
}
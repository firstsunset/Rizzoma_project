/*var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}*/

var btn = document.querySelector('.btn');
btn.onclick = function(e) {
	var element = document.querySelector(".block");
  if(element.classList.contains("show-block")) {
  	element.classList.remove("show-block");
  } else {
  	element.classList.add("show-block");
  }
}

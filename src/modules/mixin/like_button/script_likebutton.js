
var expanded = false;
function likeFunction() {
  var likeCheckmarkAfter = document.getElementById("likeCheckmarkAfter");
  if (!expanded) {
    likeCheckmarkAfter.style.display = "none";
    expanded = true;
  } else {
    likeCheckmarkAfter.style.display = "block";
    expanded = false;
  }
}
document.getElementById("like-button").addEventListener("click", likeFunction);


 


function plusLike() {
  var count = document.getElementById("like-count");
   if (count.firstChild.nodeValue == "2") {
    count.firstChild.nodeValue = "3";
  } else {
    count.firstChild.nodeValue = "2";
  }
 }
 document.getElementById("like-button").addEventListener("click", plusLike, false);
 


 
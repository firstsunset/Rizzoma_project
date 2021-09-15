/*var count = 0;
var countEl = document.getElementById("like-count");
function plus(){
    count++;
    countEl.value = count;
}*/


document.getElementById("like-button").addEventListener("click", likeFunction);
var expanded = false;

function likeFunction() {
  var likeCheckmarkAfter = document.getElementById("likeCheckmarkAfter");
  if (!expanded) {
    likeCheckmarkAfter.style.display = "block";
    expanded = true;
  } else {
    likeCheckmarkAfter.style.display = "none";
    expanded = false;
  }
}



/*function likeFunction() {
    var element = document.getElementById("like-ceckmark");
    document.getElementById("like-ceckmark").innerHTML = element;
   /* element.classList.toggle("like-checkmark-after");
 }*/
/*function likeFunction() {
    document.getElementById("like-button").innerHTML = "favorite";
 }*/


 

var count = 0;
var countEl = document.getElementById("like-count");
document.getElementById("like-button").addEventListener("click", plusLike)
 function plusLike(){
    count ++;
    countEl.value = count;
    
 }


 
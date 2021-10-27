var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  var button = document.getElementById("checkBoxBtn");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
    button.style.transform = "rotate(-180deg)";
  } else {
    checkboxes.style.display = "none";
    button.style.transform = "none";
    expanded = false;
  }
}
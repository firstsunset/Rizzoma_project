/*function fun1() {
    var sel = document.getElementById('mySelect').selectedIndex;
    var options = document.getElementById('mySelect').options;
    alert('выбрана' +options[sel].text);

}*/

function getSelectedValue(){
    var e = document.getElementById("sel1");
    var choiceValue = e.value; // to get value only
    var choicetext = e.options[e.selectedIndex].text;
    alert(choiceValue+" "+choicetext);

    var newDiv = document.createElement('span');
    newDiv.setAttribute("class","badge badge-primary");
    newDiv.innerHTML=choicetext+ " ";
    var spanDiv = document.createElement('i');
    spanDiv.setAttribute("class","fa fa-close");
    spanDiv.setAttribute("onclick",'closeDiv(this)');
    //clsbtn.appendChild(spanDiv)
    newDiv.appendChild(spanDiv);
    var displaydiv=document.getElementById('displaydiv');
    displaydiv.appendChild(newDiv);

}

function closeDiv(x){
    var parentDiv=x.parentNode.parentNode;
    parentDiv.removeChild(x.parentNode);
}
function getSelection(o){
    if (!o.options) return "";
    var selectedOptions = [];
    for (var i = 0; i < o.options.length; i++) if (o.options[i].selected) selectedOptions.push(o.options[i].value);
    return selectedOptions.join(",");
}
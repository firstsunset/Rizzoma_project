
/*var count = 0;
var countEl = document.getElementById("count");
function plus(){
    count++;
    countEl.value = count;
}
function minus(){
  if (count > 0) {
    count--;
    countEl.value = count;
  }  
}*/

var value,
    quantity = document.getElementsByClassName('number');

		function createBindings(numberContainer) {
      var count = numberContainer.getElementsByClassName('count')[0];
      var plus = numberContainer.getElementsByClassName('plus')[0];
      var minus = numberContainer.getElementsByClassName('minus')[0];
      plus.addEventListener('click', function () { plusValue(count); });
      minus.addEventListener('click', function () { minusValue(count); });
    }

    function init() {
        for (var i = 0; i < quantity.length; i++ ) {
					createBindings(quantity[i]);
        }
    };

    function plusValue(count) {
        value = parseInt(count.value, 10);

        console.log(count, count.value);

        value = isNaN(value) ? 0 : value;
        value++;
        count.value = value;
    }

    function minusValue(count) {
        value = parseInt(count.value, 10);

        value = isNaN(value) ? 0 : value;
        if (value > 0) value--;

        count.value = value;
    }
    
    init();


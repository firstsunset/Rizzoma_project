function num2str(n, text_forms) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) return text_forms[2];
  if (n1 > 1 && n1 < 5) return text_forms[1];
  if (n1 == 1) return text_forms[0];
  return text_forms[2];
}

class ItemQuantity {
  constructor(element, onChangeCallback) {
    this.el = element;
    this.onChange = onChangeCallback;
    this.words = this.el.dataset.words;
    this.min = this.el.dataset.min ? parseInt(this.el.dataset.min) : 0;
    this.minusEl = this.el.querySelector(".item-quantity__button_minus");
    this.plusEl = this.el.querySelector(".item-quantity__button_plus");
    this.minusEl.onclick = this.decriment;
    this.plusEl.onclick = this.increment;
    this.valueEl = this.el.querySelector(".item-quantity__value");
    this.value = parseInt(this.valueEl.innerHTML);
    this._checkButton();
  }
  _checkButton = () => {
    if (this.value === this.min) {
      this.minusEl.disabled = true;
    } else {
      this.minusEl.disabled = false;
    }
  };
  _render = () => (this.valueEl.innerHTML = this.value);
  setValue = (newValue) => {
    const value = newValue > this.min ? newValue : this.min;
    this.value = value;
    this._render();
    this.onChange(this.value);
    this._checkButton();
  };
  getValue = () => this.value;
  isMinimal = () => this.value === this.min;
  isZerro = () => this.value === 0
  getString = () => {
    if (this.words !== undefined) {
      const words = this.words.split(",");
      return this.value > 0
        ? `${this.value} ${num2str(this.value, words)}`
        : null;
    } else {
      return this.getValue();
    }
  };
  increment = () => this.setValue(this.value + 1);
  decriment = () => this.setValue(this.value - 1);
}

class Dropdown {
  constructor(element) {
    this.el = element;
    document.addEventListener('click',(e)=> !this.el.contains(e.target) && this.hide(e))
    this.el.onclick = this.show
    this.default = this.el.dataset.default || "";
    this.words = this.el.dataset.words;
    this.items = Array.from(this.el.querySelectorAll(".item-quantity")).map(
      (item) => new ItemQuantity(item, () => this._render())
    );
    this.sum = this.getSum();
    this.clear = this.el.querySelector(".dropdown__clear");
    this.clear && (this.clear.onclick = this._clearClick);
    this.apply= this.el.querySelector(".dropdown__apply");
    this.apply && (this.apply.addEventListener('click', (e)=> {
      this._renderHeader()      
      this.hide(e)
    }));
    this.heading = this.el.querySelector(".dropdown__heading");
    this._render();
    this._renderHeader();
    this.hide()
  }
  hide = (e) => {
    e !== undefined && e.stopPropagation()
    !this.el.classList.contains("dropdown_hide") &&
      this.el.classList.add("dropdown_hide");
  };
  show = () => {
    this.el.classList.contains("dropdown_hide") &&
      this.el.classList.remove("dropdown_hide");
  };
  getSum = () => {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.getValue();
    });
    this.sum = sum;
    return sum;
  };
  _render = () => {
    //this._renderHeader();
    this._checkClear();
   // this._checkApply();
  };
  _clearClick = () => {
    this.items.forEach((item) => {
      item.setValue(0);
    });
  };
  _checkClear = () => {
    const allMinimal = !this.items
      .map((item) => item.isMinimal())
      .includes(false);
    if(this.clear && allMinimal){
      this.clear.style.display = 'none';
    }
    else{
      this.clear.style.display = 'inline-block';
    }
    this.clear && (this.clear.disabled = allMinimal);
  };
  _checkApply = () => {
    const isAllZerro = !this.items.map((item)=>item.isZerro()).includes(false)
    if(this.apply&& isAllZerro){
      this.apply.style.display = 'none';
    }
    else{
      this.apply.style.display = 'inline-block';
    }
    this.apply && (this.apply.disabled = isAllZerro)
  }
  _renderHeader = () => {
    const sum = this.getSum();
    if (this.words !== undefined) {
      const words = this.words.split(",");
      this.heading.innerHTML =
        sum > 0 ? `${sum} ${num2str(sum, words)}` : this.default;
    } else {
      let arr = this.items.map((item) => item.getString());
      arr = arr.filter((el) => el !== null);
      this.heading.innerHTML = sum > 0 ? arr.join(", ") : this.default;
    }
  };
}

const dropdowns = document.querySelectorAll(".dropdown");
const Dropdowns = Array.from(dropdowns).map((dd) => new Dropdown(dd));

 

 
 
  
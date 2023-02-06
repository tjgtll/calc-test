'use strict';

(function (document, $) {
  class MyСalculator extends HTMLElement {
    constructor() {      
      super();

      let calculator = document.createElement('div');

      let output = document.createElement('div');

      let previous = document.createElement('div');

      let current = document.createElement('div');

      let buttons = document.createElement('div');

      let operators = document.createElement('div');

      let buttonPlus = document.createElement('div');

      let buttonMinus = document.createElement('div');

      let buttomMulty = document.createElement('div');

      let buttonDivision = document.createElement('div');

      let leftPanel = document.createElement('div');

      let numbersFirstLine = document.createElement('div');

      let button7 = document.createElement('div');

      let button8 = document.createElement('div');

      let button9 = document.createElement('div');

      let numbersSecondLine = document.createElement('div');

      let button4 = document.createElement('div');

      let button5 = document.createElement('div');

      let button6 = document.createElement('div');

      let numbersThirdLine = document.createElement('div');

      let button1 = document.createElement('div');

      let button2 = document.createElement('div');

      let button3 = document.createElement('div');

      let numbersFourthLine = document.createElement('div');

      let buttonC = document.createElement('div');

      let buttonPoint = document.createElement('div');

      let button0 = document.createElement('div');

      let buttonEqual = document.createElement('div');

      let buttonCE = document.createElement('div');

      calculator.setAttribute('class','calculator');

      output.setAttribute('class','output');
      output.setAttribute('id','output');

      previous.setAttribute('class','previous');

      current.setAttribute('class','current');
     
      buttons.setAttribute('class','buttons');
     
      operators.setAttribute('class','operators');
     
      buttonPlus.setAttribute('class','operation');
      buttonPlus.textContent='+';
     
      buttonMinus.setAttribute('class','operation');
      buttonMinus.textContent='-';
     
      buttomMulty.setAttribute('class','operation');
      buttomMulty.textContent='*';
      
      buttonDivision.setAttribute('class','operation');
      buttonDivision.textContent='/';
    
      leftPanel.setAttribute('class','leftPanel');
     
      numbersFirstLine.setAttribute('class','numbers');
     
      button7.setAttribute('class','button');
      button7.textContent='7';
      
      button8.setAttribute('class','button');
      button8.textContent='8';
    
      button9.setAttribute('class','button');
      button9.textContent='9';
      
      numbersSecondLine.setAttribute('class','numbers');
     
      button4.setAttribute('class','button');
      button4.textContent='4';
     
      button5.setAttribute('class','button');
      button5.textContent='5';
     
      button6.setAttribute('class','button');
      button6.textContent='6';
     
      numbersThirdLine.setAttribute('class','numbers');
   
      button1.setAttribute('class','button');
      button1.textContent='1';

      button2.setAttribute('class','button');
      button2.textContent='2';
      
      button3.setAttribute('class','button');
      button3.textContent='3';
    
      numbersFourthLine.setAttribute('class','numbers');

      buttonC.setAttribute('class','delete');
      buttonC.textContent='C';
    
      buttonPoint.setAttribute('class','button');
      buttonPoint.textContent='.';
      
      button0.setAttribute('class','button');
      button0.textContent='0';

      buttonEqual.setAttribute('class','equal');
      buttonEqual.setAttribute('id','result');
      buttonEqual.textContent='=';

      buttonCE.setAttribute('class','number');
      buttonCE.textContent='CE';

      buttonPlus.addEventListener('click', (event) => this.chooseOperation(event.target.innerText));

      buttonMinus.addEventListener('click', (event) => this.chooseOperation(event.target.innerText));

      buttomMulty.addEventListener('click', (event) => this.chooseOperation(event.target.innerText));

      buttonDivision.addEventListener('click', (event) => this.chooseOperation(event.target.innerText));
      
      button7.addEventListener('click', (event) => this.appendNumber(event));

      button8.addEventListener('click', (event) => this.appendNumber(event));

      button9.addEventListener('click', (event) => this.appendNumber(event));

      button4.addEventListener('click', (event) => this.appendNumber(event));

      button5.addEventListener('click', (event) => this.appendNumber(event));

      button6.addEventListener('click', (event) => this.appendNumber(event));

      button1.addEventListener('click', (event) => this.appendNumber(event));

      button2.addEventListener('click', (event) => this.appendNumber(event));

      button3.addEventListener('click', (event) => this.appendNumber(event));

      buttonC.addEventListener('click', () => this.delete());

      buttonPoint.addEventListener('click', (event) => this.appendNumber(event));

      button0.addEventListener('click', (event) => this.appendNumber(event));

      buttonEqual.addEventListener('click', () => this.compute());

      buttonCE.addEventListener('click', () => this.clear());

      this.append(calculator);
      calculator.appendChild(output);

      output.appendChild(previous);

      output.appendChild(current);

      calculator.appendChild(buttons);
      buttons.appendChild(operators);

      operators.appendChild(buttonPlus);
      operators.appendChild(buttonMinus);
      operators.appendChild(buttomMulty);
      operators.appendChild(buttonDivision);

      buttons.appendChild(leftPanel);
      leftPanel.appendChild(numbersFirstLine);
      leftPanel.appendChild(numbersSecondLine);
      leftPanel.appendChild(numbersThirdLine);
      leftPanel.appendChild(numbersFourthLine);

      numbersFirstLine.appendChild(button7);
      numbersFirstLine.appendChild(button8);
      numbersFirstLine.appendChild(button9);

      numbersSecondLine.appendChild(button4);
      numbersSecondLine.appendChild(button5);
      numbersSecondLine.appendChild(button6);

      numbersThirdLine.appendChild(button1);
      numbersThirdLine.appendChild(button2);
      numbersThirdLine.appendChild(button3);

      numbersFourthLine.appendChild(button0);
      numbersFourthLine.appendChild(buttonPoint);
      numbersFourthLine.appendChild(buttonC);

      numbersFirstLine.appendChild(buttonCE);
      numbersSecondLine.appendChild(buttonEqual);

      if (this.hasAttribute('extensions')) {
        var mydatas = JSON.parse(this.extensions);

        let extPanel = document.createElement('div');
        extPanel.setAttribute('class','ExtPanel');

        buttons.appendChild(extPanel);  
        let that = this;
        $.each(mydatas, function(key, value) {
            that.addFunction(key,value);
        });
      }
        $(this).append(this.$text);
        this.clear()  
    }
    
    get extensions() {
      return this.getAttribute('extensions');
    }
    
    set extensions(newValue) {
      this.setAttribute('extensions', newValue);
    }

    clear(){
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = null;
      this.updateDisplay();
    }

    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0,-1);
      this.updateDisplay();
    } 

    appendNumber(event){
        if (event.target.innerText === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + event.target.innerText.toString();
        this.updateDisplay()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') {
            if (this.previousOperand === '') {
                this.previousOperand = 0;
            }
          this.operation = operation;
          return;
        }
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

        this.updateDisplay();
    }

    compute(){
        let computation;
        let previous = parseFloat(this.childNodes[1].childNodes[0].childNodes[0].innerText);
        let current = parseFloat(this.childNodes[1].childNodes[0].childNodes[1].innerText);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation){
            case '+':
                computation = previous + current;
                break
            case '-':
                computation = previous - current;
                break
            case '*':
                computation = previous * current;
                break
            case '÷':
                computation = previous / current;
                break
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
        this.updateDisplay();
    }

    getDisplayNumber(number){
        let stringNumber = number.toString()
        let integerDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0  })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.childNodes[1].childNodes[0].childNodes[1].innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.childNodes[1].childNodes[0].childNodes[0].innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else if (this.isEngeeneeringVersion) {
            this.childNodes[1].childNodes[0].childNodes[0].innerText = this.previousOperand
        } else{
            this.childNodes[1].childNodes[0].childNodes[0].innerText = ''
        }
    }


    addFunction(operation, mathAction) {
        console.log(operation, mathAction);

        let ext = document.createElement('div');
        ext.setAttribute('class','operation');
        ext.textContent=operation;
        let that = this;    
        ext.addEventListener('click', (() => {
            let mathActionFunction = eval('('+mathAction+')');
            this.childNodes[1].childNodes[0].childNodes[0].innerText = `${operation} (${that.currentOperand})`;
            this.operation = `${operation} (${that.currentOperand})`;
            this.currentOperand  = mathActionFunction(that.currentOperand);
            this.updateDisplay();
        })); 

        this.childNodes[1].childNodes[1].childNodes[2].appendChild(ext);
        console.log(`Adding ex ${operation} func ${mathAction}`)
    }
  }
    customElements.define('my-calculator', MyСalculator);    
})(document, jQuery);




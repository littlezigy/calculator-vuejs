<template>
    <div id = 'basicCalc'>
        <div class = 'display' v-html = 'display'>
            {{display}}
        </div>
        <div id = 'buttons'>
            <span v-for = 'button in buttons' v-html = 'button' class = 'button' :key = 'button' @click = "press(button)">{{button}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: ['C','Del','%',"&#247", '1','2','3','+','4','5','6','-','7','8','9','&#215','.','0','Ans','='],
            numbers: ['1','2','3','4','5','6','7','8','9','0'],
            operators: ['+', '-', '&#247', '&#215', 'Ans', '=', 'c', 'del', '%', '.'],
            commands: ['ans', 'del'],
            display: "",
            calculator:{
                dataset: {
                    expression: '',
                    secondvalue: '',
                    command: '',
                    lastkeypressed: ''
                }
            },
        }
    },
    methods: {
        press(key) {
            if(this.numbers.includes(key)) {
                this.inputDigit(key);
            } else if(key == '.') {
                this.inputDecimal();
            } else if (this.operators.includes(key)) {
                this.inputOperand(key);
            } else if(key == 'Backspace') {
                this.backspace();
            } else {
                this.inputCommand(key);
            }
            console.log(`Last key pressed: ${this.calculator.dataset.lastkeypressed}`)
        },
        evalKeypress(key) {
            //Evaluates keyboard events. Converts shortcuts too. 
            console.log(key.key);
            switch(key.key) {
                case '+':
                    this.press('p');
                    break;
                case 'x':
                case '*':
                    this.press('&#215');
                    break;
                case '/':
                    this.press('&#247');
                    break;
                case 'Enter':
                    this.press('=');
                    break;
                default:
                    this.press(key.key);
                    console.log(key.key);
                    break;
            }
        },
        inputDigit(key) {
            if(this.display == '0') {
                this.display = key;
                this.expression = key;
            } else {
                this.display +=key;
                this.expression += key;
            }
            this.calculator.dataset.lastkeypressed = key;
            console.log(this.expression);
        },
        inputDecimal() {
            this.display += '.';
            this.expression += '.';
            this.calculator.dataset.lastkeypressed = '.';
        },
        inputOperand(key) {
            console.log(`Operand entered: ${key}`);
            if(this.operators.includes(this.calculator.dataset.lastkeypressed)) {
                console.log(`Last key pressed was an operator. ${this.calculator.dataset.lastkeypressed}`);
                this.backspace();
                this.inputOperand(key);
            } else {
                console.log("Last key pressed was probably a digit.");
                if(this.display == '0') {
                } else {
                    if(key == '&#215') {
                        this.expression += '*';
                    } else if(key == '&#247') {
                        this.expression += '/';
                    } else if(key == '=') {
                        this.evalexpression();
                    } else {
                        this.expression += key;
                    }
                    this.calculator.dataset.lastkeypressed = key;
                    console.log('Expression', this.expression);
                    this.display += ` ${key} `;
                }
            }
        },
        inputCommand(key) {
            this.calculator.dataset.command += key;
            console.log("Typing command", this.calculator.dataset.command);
            if(this.commands.includes(this.calculator.dataset.command)) {
                var command = this.calculator.dataset.command;
                console.log("Command entered", this.calculator.dataset.command);

                switch(command) {
                    case 'ans': 
                        this.display+='Ans';
                        this.calculator.dataset.lastkeypressed = 'ans';
                        break;
                    case 'del':
                        this.display+='Del';
                        this.calculator.dataset.lastkeypressed = 'del';
                        break;
                }
            }
            if (this.calculator.dataset.command.length == 4) {
                this.calculator.dataset.command = '';
            }
        },
        backspace() {
                this.calculator.dataset.lastkeypressed = 'Backspace';
                var newstr = this.display

                if(this.calculator.dataset.lastkeypressed)
                var n = newstr.lastIndexOf(" ", newstr.length - 2);
                this.display = newstr.substr(0, n);
                this.expression = this.expression.substr(0, this.expression.length - 1);
                console.log(`Backspace was pressed. Confirming ${this.display}`);
        }
    },
    created() {
        window.addEventListener('keydown', this.evalKeypress);
        this.display = '0';
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.evalKeypress)
    }
}
</script>

<style>
#basicCalc {
    width: 75vw;
    border: 1px solid rgb(54, 10, 63);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 1em;
}
.display{
    height: 3em;
    padding: 0 1em;
    border: 1px solid rgb(54, 10, 63);
    width: 60%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.5em;
}
#buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 70%;
}
.button {
    border: 1px solid grey;
    border-radius: 10px;
    cursor: default;
    text-align: center;
    padding: 1em 0.5em;
    margin: 0.5em;
    width: calc(25% - 3em);
    box-shadow: 2px 2px 4px 1px rgba(128, 128, 128, 0.472);
}
.button:hover{
    background-color: rgb(48, 48, 82);
    color: white;
}
.button:active {
    background-color: rgb(19, 19, 47);
    color: white;
    box-shadow: none;
}
</style>

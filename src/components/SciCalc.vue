<template>
    <div id = 'basicCalc'>
        <div class = 'display' v-html = 'display'>
            {{display}}
        </div>
        <div id = 'buttons'>
            <span v-for = 'button in buttons' v-html = 'button' class = 'button' :key = 'button' @click = "evalKeypress(button)">{{button}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: ['C','&plusmn','%',"&#247", '1','2','3','+','4','5','6','-','7','8','9','&#215','.','0','Ans','='],
            numbers: ['1','2','3','4','5','6','7','8','9','0'],
            operators: ['+', '-', '/', '*', 'Ans', '=', 'del', '%', '.'],
            commands: ['ans', 'neg', 'c'],
            display: "",
            calculator:{
                expression: '',
                result: '',
                secondvalue: '',
                command: '',
                lastkeypressed: ''
            },
        }
    },
    methods: {
        press(key) {
            console.log("__________Key press___________\n", key);
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
            console.log(`Last key pressed: ${this.calculator.lastkeypressed}`)
        },
        evalKeypress(key) {
            //Evaluates button presses and keyboard events too. Converts shortcuts too.
            console.log('________Eval keypress function__________\nFor: ', key);
            var n;
            if(key.key) {
                console.log("\n**********\nKEYBOARD press. ", key.key);
                if (key.key == '=') {
                    console.log("Got an equalto sign here");
                    n = '+';
                    console.log("******Changing n********", n);
                } else {
                    n = key.key;
                }
            } else { 
                n = key;
            }

            console.log("Key is ", n);

            switch(n) {
                case 'p':
                    this.press('+');
                    break;
                case 'x':
                case '&#215':
                    this.press('*');
                    break;
                case 'C':
                    this.press('c');
                    break;
                case '&#247':
                    this.press('/');
                    break;
                case 'Enter':
                    this.press('=');
                    break;
                default:
                    this.press(n);
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
            this.calculator.lastkeypressed = key;
            console.log(this.expression);
        },
        inputDecimal() {
            this.display += '.';
            this.expression += '.';
            this.calculator.lastkeypressed = '.';
        },
        inputOperand(key) {
            console.log(`Operand entered: ${key}`);
            if(this.operators.includes(this.calculator.lastkeypressed)) {
                console.log(`Last key pressed was an operator. ${this.calculator.lastkeypressed}`);
                this.backspace();
                this.inputOperand(key);
            } else {
                console.log("Last key pressed was NOT an operator.");
                if(this.display == '0') {
                } else {
                    if(key == '*') {
                        this.expression += '*';
                        this.display += ` &#215 `;
                        this.calculator.lastkeypressed = key;
                    } else if(key == '/') {
                        this.expression += '/';
                        this.display += ' &#247 ';
                        this.calculator.lastkeypressed = key;
                    } else if(key == '=') {
                        console.log("Evaluating string...");
                        this.result = eval(this.expression);
                        this.expression = this.result;
                        this.display = this.result;
                    } else {
                        this.expression += key;
                        this.display += ` ${key} `;
                        this.calculator.lastkeypressed = key;
                    }
                    console.log('Expression', this.expression);
                }
            }
        },
        inputCommand(key) {
            this.calculator.command += key;
            console.log("Typing command", this.calculator.command);
            if(this.commands.includes(this.calculator.command)) {
                var command = this.calculator.command;
                console.log("Command entered", this.calculator.command);

                switch(command) {
                    case 'ans':
                        this.expression += this.result;
                        this.display+='Ans';
                        this.calculator.lastkeypressed = 'ans';
                        break;
                    case 'neg':
                        this.display = '';
                        this.expression
                        this.calculator.lastkeypressed = 'del';
                        break;
                }
            }
            if (this.calculator.command.length == 4) {
                this.calculator.command = '';
            }
        },
        backspace() {
            var newstr = this.display;
            var n;
            if(this.numbers.includes(this.calculator.lastkeypressed)) {
                n = this.display.length - 1;
                console.log('last key press is num. \nExpression length is', this.expression.length, '\nn is set to ', n);
            } else {
                n = newstr.lastIndexOf(" ", newstr.length - 2);
                console.log("\n-----------Deleting char at----------", n);
            }
            console.log("N is ", n);
            this.display = newstr.substr(0, n);
            this.expression = this.expression.substr(0, this.expression.length - 1);
            this.calculator.lastkeypressed = this.display.charAt(this.display.length - 1);
            console.log(`\nResetting lastkeypress var. ${this.calculator.lastkeypressed}.\nExpression is: ${this.expression}`);
        }
    },
    created() {
        window.addEventListener('keyup', this.evalKeypress);
        this.display = '0';
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.evalKeypress)
    }
}
</script>

<style>

</style>

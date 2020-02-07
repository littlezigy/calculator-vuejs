<template>
    <div id = 'basicCalc'>
        <div class = 'display'>
            <p v-html = 'display'>{{display}}</p>
        </div>
        <div id = 'buttons'>
			<p @click = 'evalKeypress("c")'>C</p>
			<p @click = 'backspace()' class = 'fas fa-backspace'></p>
			<p @click = "evalKeypress('%')">%</p>
			<p @click = 'press("/")'>&#247;</p>

			<p v-for = 'number in 3' @click = 'evalKeypress(number)'>{{number}}</p>
			<p @click = 'evalKeypress("+")'>+</p>

			<p v-for = 'number in 3' @click = 'evalKeypress(number + 3)'>{{number + 3}}</p>
			<p @click = 'evalKeypress("-")'>-</p>

			<p v-for = 'number in 3' @click = 'evalKeypress(number + 6)'>{{number + 6}}</p>
			<p @click = 'evalKeypress("*")'>&times;</p>

			<p @click = "evalKeypress('neg')">&plusmn;</p>
			<p @click = 'evalKeypress("0")'>0</p>
			<p @click = 'evalKeypress(".")'>.</p>
			<p @click = "evalKeypress('=')">=</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            operators: ['+', '-', '/', '*'],
            commands: ['neg', 'c', '%', 'ans', '='],
            display: "0",
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
            if(this.numbers.includes(parseInt(key))) {
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
            console.log('________Eval keypress function__________');
            let n;
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

            switch(n) {
                case 'p':
                    this.press('+');
                    break;
                case 'x':
                    this.press('*');
                    break;
                case 'C':
                    this.press('c');
                    break;
                case 'Enter':
                    this.press('=');
                    break;
                case 'Ans':
                case 'ans':
                case 'ANS':
                    this.press('ans');
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
                this.display += `${key}`;
                this.expression += `${key}`;
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
                console.log('COMMAND ENTERED. NOW CLEARING', this.calculator.command);
                this.calculator.command = '';

                switch(command) {
                    case '=':
                        console.log("Evaluating string...");
                        this.result = '' + eval(this.expression);
                        this.expression = this.result;
                        this.display = this.result;
                        break;
                    case 'ans':
                        console.log("PRESSED ANS");
                        if(this.result){
                            if(this.display == '0') {
                                console.log("Will add in ans ");
                                this.expression = `(${this.result}) `;
                                this.display = 'Ans';
                                this.calculator.lastkeypressed = 'ans';
                            } else if(this.operators.includes(this.calculator.lastkeypressed)) {
                                this.expression += ` (${this.result}) `;
                                this.display+='Ans';
                                this.calculator.lastkeypressed = 'ans';
                            } else {
                                console.log("Can't add in ans operator.");
                            }
                        }
                        break;
                    case 'c':
                        this.display = '0';
                        this.expression = '';
                        this.calculator.lastkeypressed = 'c';
                        break;
                    case 'neg':
                        console.log('____________NEGATIVE COMMAND___________');
                        console.log(this.display);
                        console.log('FIRST CHARACTER IS BELOW');
                        console.log(this.display.charAt(0));
                        if(this.display.charAt(0) == '-') {
                            this.display = this.display.substring(1, this.display.length);
                            this.expression = this.expression.substring(1, this.expression.length);
                            console.log('FIRST CHAR IS A NEGATIVE');
                        } else {
                            console.log('FIRST CHAR IS NOT A MINUS SYMBOL')
                            this.display = '-' + this.display;
                            this.expression = '-' + this.expression;
                        }
                        break;
                }
            }
            if (this.calculator.command.length >= 4) {
                this.calculator.command = '';
            }
        },
        backspace() {
            var n;
            console.log(`this.display is : "${this.display}"`);
            if(this.numbers.includes(this.calculator.lastkeypressed)) {
                n = this.display.length - 1;
                console.log('last key press is num. \nDisplay length ('+this.display+') is ', this.display.length, '\nExpression length('+this.expression+') is', this.expression.length, '\nn is set to ', n);
            } else {
                n = this.display.lastIndexOf(" ", this.display.length - 2);
                console.log("\n-----------Deleting char at----------", n);
            }
            console.log("N is ", n);
            this.display = this.display.substr(0, n);
            this.expression = this.expression.substring(0, this.expression.length);
            this.calculator.lastkeypressed = this.display.charAt(this.display.length - 1);
            console.log(`\nResetting lastkeypress var. ${this.calculator.lastkeypressed}.\nExpression is: ${this.expression}`);
            if(this.display == "" || this.display == " "|| this.display == "0") {
                this.display = '0';
            }
        }
    },
    created() {
        window.addEventListener('keyup', this.evalKeypress);
    },
    beforeDestroy() {
        window.removeEventListener('keyup', this.evalKeypress)
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
    padding: 1em;
    border: 1px solid rgb(54, 10, 63);
    width: 70%;
	overflow: hidden;
	flex-wrap: wrap;
	text-align: right;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.5em;
}
#buttons {
    display: grid;
	grid-template-columns: repeat(4, 1fr);
	width: 70%;
}
#buttons > * {
    border: 1px solid grey;
    border-radius: 10px;
    cursor: default;
    text-align: center;
    padding: 1em 0.5em;
    margin: 0.5em;
    box-shadow: 2px 2px 4px 1px rgba(128, 128, 128, 0.472);
}
.button:hover{
    background-color: rgb(48, 48, 82);
    color: white;
}
div#buttons > *:active {
    background-color: rgb(19, 19, 47);
    color: white;
    box-shadow: none;
}

@media only screen and (max-width: 580px) {
	div#buttons {
		grid-template-columns: repeat(4, 1fr);
		text-align: center;
		width: 100%;
	}
	div#basicCalc {
		border: none;
		font-weight: bold;
		font-size: 1.3em;
		width: 100%;
		padding: 0;
	}
	div.display {
		width: 100%;
		height: 100%;
		padding:1em;
		border: none;
		border-bottom: 1px solid grey;
		box-sizing: border-box;
	}
	div#buttons > *{
		border: none;
		box-shadow: none;
		-webkit-box-shadow: none;
	}
	
}
</style>

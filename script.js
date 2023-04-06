const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const input_exp = document.querySelector('.input-exp');
const result = document.querySelector('.local-result');
const clear = document.querySelector('.clear');
const edit = document.querySelector('.remove');


let answer = 0;
let localAnswer = 0;

let operand1 = 0;
let operand2 = 0;
let operat = "";

let expression = "";
let length = 0;
let target = "";
let target_index = 0;

let check = 0;

const arr_operators = [""];
const arr_opIndex = [0];
const arr_localAnswer = [0];

const methods = ['+', '-', '*', '/'];

numbers.forEach((number) =>{
    number.addEventListener('click', ()=>{
        if(check==1){
            resetScreen();
        }
        expression += number.textContent;
        input_exp.textContent = expression;

        length = expression.length;

        createArguments();
        localAnswer = getLocalAnswer();
        result.textContent = "" + localAnswer;

    });
});

operators.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        expression += operator.textContent;
        input_exp.textContent = expression;

        length = expression.length;

        operat = operator.textContent;
        target_index = length - 1;

        operand1 = localAnswer;
        operand2 = 0;

        result.textContent = "";

        arr_operators.push(operat);
        arr_opIndex.push(target_index);
        arr_localAnswer.push(localAnswer);
    });
});

equals.addEventListener('click', getGlobalAnswer);

clear.addEventListener('click', ()=>{
    expression = "";
    operand1 = 0;
    operand2 = 0;
    answer = 0;
    operat = "";
    localAnswer = 0;
    result.textContent = "";
    input_exp.textContent = "";
    check = 0;
})

edit.addEventListener('click', ()=>{
    if(methods.includes(expression.charAt(length - 1))){
        let tempLength = arr_operators.length;
        operat = arr_operators[tempLength - 2];
        target_index = arr_opIndex[tempLength - 2];
        operand1 = arr_localAnswer[tempLength - 2];

        arr_localAnswer.pop();
        arr_opIndex.pop();
        arr_operators.pop();
    }

    expression = expression.substring(0, length - 1);
    input_exp.textContent = expression;
    length = length - 1;

    createArguments();
    localAnswer = getLocalAnswer();

    if(methods.includes(expression.charAt(length - 1))){
        result.textContent = "";
    }
    else{
        result.textContent = localAnswer;
    }
});

function createArguments(){

    if(operat == ""){
        operand1 = Number(expression);
    }
    else{
        let temp = expression.substring(target_index + 1, length);
        operand2 = Number(temp);
    }
}

function getLocalAnswer(){

    switch (operat){
        case "+":
            localAnswer = operand1 + operand2;
            break;
        case "-":
            localAnswer = operand1 - operand2;
            break;
        case "*":
            localAnswer = operand1 * operand2;
            break;
        case "/":
            localAnswer = operand1 / operand2;
            break;
        default:
            localAnswer = operand1;
            break;
    }    
    localAnswer = round(localAnswer);
    return localAnswer;
}

function getGlobalAnswer(){
    operand1 = localAnswer;
    operand2 = 0;
    answer = localAnswer;
    expression = "" + answer;
    result.textContent = "";
    input_exp.textContent = expression;
    check = 1;
}

 function round(num){
    return (Math.round(num*1000))/1000;
 }


 function resetScreen(){
    expression = "";
    input_exp.textContent = expression;
    result.textContent = "";
    operat = "";
    operand1 = 0;
    check = 0;
    return 0;
 }


 // to be solved later - edge cases
 // first input is a operator
 // think more
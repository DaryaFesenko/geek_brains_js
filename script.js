
/*  Первое задание
var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 - префиксный инкремент. Увеличивает на единицу
d = b++; alert(d);           // 1 - постфиксный инкремент. сначала значение возвращает, после увеличение
c = (2+ ++a); alert(c);      // 5 - так как переменная а уже равна 2 посе операции инкремента, здесь она увеличивается до 3,
                                    потому и 5 в сумме    
d = (2+ b++); alert(d);      // 4 - аналогично b уже равно 2, здесь постфиксным сначала отдает значение, после суммирует и                                             увеличивает до 3
alert(a);                    // 3 - после 2-х префиксных инкрементов
alert(b);                    // 3 - после 2-ч постфиксных
*/


/* Второе задание
var a = 2;
var x = 1 + (a *= 2);        x = 5
*/


// 3
var a = 3, b = -4;

if (a >= 0 && b >= 0){
    alert(a-b);
}
else if (a < 0 && b < 0){
    alert(a*b);
}
else {
    alert(a+b);
}

//4
a = Math.round(Math.random() * 15);
alert(a);

//5

function sum(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function division(a, b){
    return a / b;
}

//6
function mathOperation(arg1, arg2, operation){
    if (isNan(arg1) || isNaN(arg2)) return "Переданные данные не являются числами";
    
    switch (operation) {
        case "sum":
            return sum(arg1, arg2);
            break;
        case "sub":
            return sub(arg1, arg2);
            break;
        case "multiply":
            return multiply(arg1, arg2);
            break;
        case "division":
            return division(arg1, arg2);
            break;
        default:
            return "Операция не корректна";
            break;
    }
}
        
//7 - false, как и должно быть по логике. Null это ничего, пусто. 0 это число

alert(null == 0);

//8
function power(val, pow){
    var result = val;
    
    if (pow == 0) return 1;
    if (pow == 1) return result;
    
    pow--;
    return power(val, pow) * val;
}


// Первое задание

var celsiy = +prompt("Введите температуру в градусах по Цельсию");

if (isNaN(celsiy)){
    alert("Ошибка! Вы ввели не число!");
}
else {
    var fahrenheit = ToFahrenheit(celsiy);
    alert(celsiy+" градусов по Цельсию = " + fahrenheit + " градусов по Фаренгейту");
}


function ToFahrenheit(celsiy){
    return ((9/5) * celsiy + 32).toFixed(1);
}

//Работа с переменными
var admin = null;
var name = "Василий";

admin = name;

alert(admin);


//4 задание - 1000108 - если есть строка, конкатенация априори


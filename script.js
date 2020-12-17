// 1.
function primeNumbersFrom(from, before){
    let result = [];
    let number = from;
    
    while(number != before){
        
        if (number < 2 || thisSimple(number)){
            result.push(number);
        }
        
        number++;
    }
}

function thisSimple(number){
    for (let i = 2; i < number; i++){
        if (number % i == 0) {
            return false;
        }
    }
    
    return true;
}

console.log(primeNumbersFrom(0, 100));

//2.
//цены товаров
let price = [
    ["milk", 50],
    ["bread", 30],
    ["sausages", 67]
]

// название, кол-во
let basket = [
    ["milk", 2],
    ["bread", 2],
    ["sausages", 6]
];

function countBasketPrice(basket){
    let endPrice = 0;
    
    for (let i = 0; i< basket.length; i++){
        let name = basket[i][0];
        let count = basket[i][1];
        
        let priceProduct = findPriceProduct(name);
        
        if (priceProduct == -1) return "Товар '" + name + "' отсутствует в магазине. Цена не найдена";
        
        endPrice += (priceProduct * count);
    }
    
    return endPrice;
}

function findPriceProduct(nameProduct){
    for (var i = 0; i< price.length; i++){
        if (price[i][0] == nameProduct) return price[i][1];
    }
    
    return -1;
}

console.log(countBasketPrice(basket));

//3.
for (let i = 0; i < 10; console.log(i++)) {}

//4.

for (let i = 'x'; i.length <= 20; i+='x'){
    console.log(i);
}

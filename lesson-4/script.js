
//1.
var numberAsObject = {
    units : 0,
    dozens : 0,
    undreds : 0
}

function toObject(number)
{
    var obj = Object.assign({}, numberAsObject);
    
    if (number < 0 || number > 999){
        console.log("Число должно быть в пределах от 0 до 999")
        return {};
    }
    
    let i = 1;
    while (number != 0){
        var numeral = number % 10;
        
        if (i == 1) obj.units = numeral;
        if (i == 2) obj.dozens = numeral;
        if (i == 3) obj.undreds = numeral;
        
        i++;
        number = Math.trunc(number/10);
    }
    
    return obj;
}

//2.
var productInBasket = {
    name: "",
    price: 0,
    count: 0
}

var basket = {
    products : [],
    
    countBasketPrice(){
        return this.products.reduce((price, product) => price+=product.price*product.count, 0);
    }
}

for (let i = 0; i < 4; i++){
    let product = Object.assign({},productInBasket);
    product.name = "prod" + (i + 1);
    product.count = Math.floor(Math.random() * 10 + 1);
    product.price = Math.floor(Math.random() * 100);
    
    basket.products.push(product);
}

console.log(basket.products)
console.log(basket.countBasketPrice())

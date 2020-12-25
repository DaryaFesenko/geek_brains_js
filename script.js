var basket = {
    basketBlock : null,
    clearButton: null,
    infoBasket: null,
    products: [],
    
    init(){
        this.basketBlock = document.getElementById('basket');
        
        document.getElementById("catalog")
            .addEventListener('click', event => {
                this.addToBasket(event)
            });
        
        
        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', this.clear.bind(this));

        this.infoBasket = document.getElementById('info');
        
        let tableProducts = document.getElementById('products_in_basket');
        let tr_headers = this.createTrToTable(['Название','Кол-во','Цена за шт','Сумма']);
        tableProducts.appendChild(tr_headers);
        
        
        this.showBasket();
    },
    
    createTrToTable(names){
        let tr = document.createElement('tr');
        
        for (var i = 0; i< names.length; i++){
            let th= document.createElement('td');
            th.textContent = names[i];
            tr.appendChild(th); 
        }
        
        return tr;
    },
    
    clear(){
        this.products = [];
        this.showBasket();
    },
    
    showBasket(){
        let tableProducts = document.getElementById('products_in_basket');
        this.clearTable(tableProducts);
        
        for (let i = 0; i < this.products.length; i++){
            
            let name = this.products[i].name;
            let count = this.products[i].count;
            let price = this.products[i].price;
            let allPrice = this.products[i].price * this.products[i].count;
            
            let tr = this.createTrToTable([name,count,price,allPrice]);
            
            tableProducts.appendChild(tr);
        }
        
        this.infoBasket.textContent = this.calculateBasket();
    },
    
    clearTable(table){
        for (let i = table.rows.length-1; i > 0; i--){
            table.removeChild(table.rows[i]);
        }
    },
    
    calculateBasket(){
        let info = "";
        if (this.products.length == 0){
            info = "Корзина пуста";
        }
        else {
            let price = this.products.reduce((price, product) => price+=product.price*product.count, 0);
            
            info = "В корзине: " + this.products.length+" товаров на сумму "+price+" рублей";
        }
        
        return info;
    },
    
    addToBasket(event){
        if (event.target.tagName !== "BUTTON") return;
        
        let name = event.target.dataset.name;

        let product = this.products.find(function(el){return el.name == name});
        
        if (product != undefined){
            product.count++;
        }
        else{
            product = {name: name, count: 1, price: catalog.getPriceByName(name)};
            this.products.push(product);
        }
        
        this.showBasket();
    }
};

var catalog  = {
    catalog: null,
    products :[
        {
            name: 'Молоко',
            price: 23,
            url: 'img/milk.jpg'
        },
        {
            name: 'Хлеб',
            price: 56,
            url: 'img/bread.jpg'
        },
        {
            name: 'Вода',
            price: 11,
            url: 'img/water.jpg'
            
        }
    ],
    
    init(){
        this.catalog = document.getElementById('catalog');
        
        this.showCatalog();
    },
    
    showCatalog(){
        for (let i = 0; i< this.products.length; i++){
            
            let div = document.createElement('ul');
            
            let h_name = document.createElement('li');
            h_name.textContent  = this.products[i].name;
            let h_price = document.createElement('li');
            h_price.textContent = this.products[i].price + " руб.";
            
            let button = document.createElement('button');
            button.textContent = "Купить";
            button.dataset.name = this.products[i].name;
            
            let img = document.createElement('img');
            img.src = this.products[i].url;
            
            div.appendChild(h_name);
            div.appendChild(h_price);
            
            let li_img = document.createElement('li')
            li_img.appendChild(img);
            let li_button = document.createElement('li')
            li_button.appendChild(button);
            
            div.appendChild(li_img);
            div.appendChild(li_button);
           
            
            this.catalog.appendChild(div);
        }
    },
    
    getPriceByName(name){
        let product = this.products.find(function(el){return el.name == name});
        
        if (product == undefined) return;
        
        return product.price;
    }
}


basket.init();
catalog.init();
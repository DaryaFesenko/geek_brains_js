
// Первое
function createChessBoard()
{
    var chess_board = document.getElementById("chess_board");
    let code = 65;
    
    for (var i = 0; i < 9 ;i++){
        let tr = document.createElement('tr');
        
        for (var j = 0; j < 9; j++){
            let td = document.createElement('td');
            
            if (i == 0 ){
                let char = '';
                
                if (j!=0) {
                    char = String.fromCharCode(code);
                    code++;
                }

                td.textContent = char;
                tr.appendChild(td);
                continue;
            }
            
            if (j == 0){
                td.textContent = 9-i;
                tr.appendChild(td);
                continue;
            }
            
            let color = '#ffffff';
            
            if (i%2 == 1) {
                if (j%2 == 0) color = '#000000';
            }
            else {
                if (j%2 == 1) color = '#000000';
            }
            
            td.style.backgroundColor = color;
            
            tr.appendChild(td);
        }
        
        chess_board.appendChild(tr);
    }
}

//Второе
function initialPlacementFigures(){
    let color = '#708090';
    var chess_board = document.getElementById("chess_board");
    
    var trPawns = chess_board.getElementsByTagName('tr')[2];
    var trPawns2 = chess_board.getElementsByTagName('tr')[7];
    
    //Пешки
    pawns(trPawns);
    pawns(trPawns2);
    
    //Остальные фигуры
    var tr = chess_board.getElementsByTagName('tr')[1];
    var tr2 = chess_board.getElementsByTagName('tr')[8];

    rest(tr);
    rest(tr2);
}

function pawns(trPawns){
    for (var i = 1; i < 9; i++){
        var cell = trPawns.getElementsByTagName('td')[i];
        cell.textContent = 'П';
    }
}
    
function rest(tr){
    let text = '';
     for (var i = 1; i< 9; i++){
        let td = tr.getElementsByTagName('td')[i];
        if (i == 1 || i == 8)
            text = 'Л';
         
         if (i == 2 || i == 7)
             text = 'Конь';
         
         if (i == 3 || i == 6)
             text = 'C';
         
         if (i == 4 )
             text = 'K';
         
         if (i == 5)
             text = 'Ф';
         
         td.textContent = text;
    }
}

/*
createChessBoard();
initialPlacementFigures();
*/

//Третье, не поняла про четвертое. Вроде немного и оттуда сделала

var basket = {
    basketBlock : null,
    clearButton: null,
    productsInBlock: [],
    products :[
        {
            name: 'Молоко',
            count: 3,
            price: 23
        },
        {
            name: 'Хлеб',
            count: 5,
            price: 56
        },
        {
            name: 'Вода',
            count: 2,
            price: 11,
            
        }
    ],
    
    init(){
        this.basketBlock = document.getElementById('basket');
        
        this.clearButton = document.createElement('button');
        this.clearButton.style.marginLeft = '100px';
        this.clearButton.style.width = "100px";
        this.clearButton.textContent = "СLEAR";
        this.clearButton.addEventListener('click', this.clear.bind(this));
        
        this.basketBlock.appendChild(this.clearButton);
        
        this.showBasket();
    },
    
    clear(){
        this.productsInBlock.forEach(product => this.basketBlock.removeChild(product));
        this.products = [];
        this.calculateBasket();
    },
    
    showBasket(){
        for (var i = 0; i < this.products.length; i++){
            var div = document.createElement('div');
            div.style.width = '200px';
            div.style.height = '200px';
            div.style.float = 'left';
            div.style.outline = '1px solid black';
            
            let hName = document.createElement('h5');
            hName.textContent = "Название: " + this.products[i].name;
            let hCount = document.createElement('h5');
            hCount.textContent = "Количество: " + this.products[i].count;
            let hPrice = document.createElement('h5');
            hPrice.textContent = "Цена за 1: " + this.products[i].price;
            let hAllPrice = document.createElement('h5');
            hAllPrice.textContent = "Сумма: " + (this.products[i].price * this.products[i].count);

            div.appendChild(hName);
            div.appendChild(hCount);
            div.appendChild(hPrice);
            div.appendChild(hAllPrice);
                        
            this.productsInBlock.push(div);
            this.basketBlock.insertBefore(div, this.clearButton);
        }
        this.calculateBasket();
    },
    
    calculateBasket(){
        let info = "";
        if (this.products.length == 0){
            info = "Корзина пуста";
        }
        else {
            let count = this.products.reduce((count, product) => count+=product.count, 0);
            let price = this.products.reduce((price, product) => price+=product.price*product.count, 0);
            
            info = "В корзине: " + count+" товаров на сумму "+price+" рублей";
        }
        
        let infoHTML = document.getElementsByTagName('h5')[0];
        if (infoHTML == null) infoHTML = document.createElement('h5');
        infoHTML.textContent = info;
        
        this.basketBlock.insertBefore(infoHTML, this.clearButton);
    }
}

basket.init();
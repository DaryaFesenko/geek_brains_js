"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 30,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
}

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';
        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, obstacles) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
        

        obstacles.forEach((point, index) => {
            const obstacleCell = this.cells[`x${point.x}_y${point.y}`];
            obstacleCell.classList.add('obstacle');
            this.usedCells.push(obstacleCell);
        });
    },
};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction, setting) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
        this.colsCount = setting.getColsCount();
        this.rowsCount = setting.getRowsCount();
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextStepHeadPoint()); // [p1, p2, p3] -> [p0, p1, p2]
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone); // [p1, p2, p3, p3] -> [p0, p1, p2, p3]
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch(this.direction) {
            case 'up':
                if (firstPoint.y == 0)
                    return {x: firstPoint.x, y: this.rowsCount - 1};
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                if (firstPoint.x == this.colsCount - 1)
                    return {x: 0, y: firstPoint.y};
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                if (firstPoint.y == this.rowsCount - 1)
                    return {x: firstPoint.x, y: 0};
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                if (firstPoint.x == 0)
                    return {x: this.colsCount - 1, y: firstPoint.y};
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },

    setDirection(direction) {
        this.direction = direction;
    }
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const obstacles = {
    maxTimeExistence: 7,
    nextTime: 0,
    currentObstacle: [],
    
    setCoordinates(obstacle) {
        this.currentObstacle = obstacle;
        
        let currentDate = new Date();
        let seconds = currentDate.getSeconds() + this.maxTimeExistence;
        this.nextTime = new Date(currentDate.setSeconds(seconds));
    },
    
    isСollision(point) {  
        let collision = false;
        this.currentObstacle.forEach(obstacle => {
            if (obstacle.x === point.x && obstacle.y === point.y) {
                collision = true;
                return;
            }
        })
        
        return collision;
    },
    
    getCurrentObstacle(){
        return this.currentObstacle;
    }
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    tickInterval: null,
    score: null,
    obstacles,

    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.log(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());
        
        this.score = document.getElementById('score');
        this.score.textContent = 0;
        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up', this.config);
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.obstacles.setCoordinates(this.getRandomCoordinatesFromObstacles());
        this.score.textContent = 0;
        this.render();
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler();
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.increaseScore();
            
            if (this.isGameWon()) this.finish();
        }
        
        if (obstacles.nextTime < new Date())
            this.obstacles.setCoordinates(this.getRandomCoordinatesFromObstacles());
            
        this.snake.makeStep();
        this.render();
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        });

    },

    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacles.getCurrentObstacle());
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
        }
    },
        
    getRandomCoordinatesFromObstacles() {
        let lenght = Math.floor(Math.random() * 8) + 3;
        let gorisontal = Math.round(Math.random()) == 0;
      
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];
        
        let point = null;
        let obstacle = [];
        
        while (true){
            let obstacle = [];
            let rndPoint;
            
            if (gorisontal){
                rndPoint = {
                    x: Math.floor(Math.random() * (this.config.getColsCount() - lenght)),
                    y: Math.floor(Math.random() * this.config.getRowsCount()),
                };          
            }
            else {
                rndPoint = {
                    x: Math.floor(Math.random() * this.config.getColsCount()),
                    y: Math.floor(Math.random() * (this.config.getRowsCount() - lenght)) ,
                };
            }
            
            for (var i = 0; i < lenght; i++){
                if (gorisontal){
                   obstacle.push({x: rndPoint.x + i, y: rndPoint.y})
                }
                else {
                    obstacle.push({x: rndPoint.x, y: rndPoint.y + i})
                    
                }
            }
            let exist = true;
            
            obstacle.forEach(el => {
                if (exclude.some(exPoint => el.x === exPoint.x && el.y === exPoint.y)) {
                    exist = false;
                }
            })

            if (exist) return obstacle;
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();
        
        return !this.obstacles.isСollision(nextHeadPoint);
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },
    
    increaseScore() {
        this.score.textContent++;
    }
};

game.init({speed: 4});

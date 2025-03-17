let gameCanvas = document.createElement("canvas");
document.querySelector("#game-canvas").appendChild(gameCanvas);
let gameScore = document.getElementById('score');
let dialogContainer = document.getElementById("snakeDisplay");
let CTX = gameCanvas.getContext("2d");




// Variable Definitions

let Width = 500;
let Height = 500; 

// --------- Grid Stuff ------------
const cells = 20;
let cellSize = 0;


// ------------ Game Stuff ------------

let isGameOver = false;
let currScore = 0;
let maxScore = window.localStorage.getItem("maxScore") || undefined;
let requestID;

// ---------- Snake Stuff ------------
let snake;
let food;


// Utility Functions
function updateCanvasSize() {
    let containerWidth = dialogContainer.offsetWidth;

    // Calculate dimensions
    let width = containerWidth * 0.8;
    let height = containerWidth * 0.8;

    // Adjust width and height to the nearest multiple of 20
    gameCanvas.width = Math.floor(width / cells) * cells;
    gameCanvas.height = Math.floor(height / cells) * cells;

    // Update Width and Height variables
    Width = gameCanvas.width;
    Height = gameCanvas.height;

    // Calculate cell size based on new dimensions
    cellSize = Math.floor(Width / cells);
    console.log("Canvas updated:", Width, Height);
}


    function drawGrid() 
    {
        CTX.lineWidth = 1.1;
        CTX.strokeStyle = "#00000012";
        CTX.shadowBlur = 0;
        for (let i = 0; i <= cells; i++) {
          let f = (Width / cells) * i;
          CTX.beginPath();
          CTX.moveTo(f, 0);
          CTX.lineTo(f, Height);
          CTX.stroke();
          CTX.beginPath();
          CTX.moveTo(0, f);
          CTX.lineTo(Width, f);
          CTX.stroke();
          CTX.closePath();
        }
    }

    function checkCollision(_vecOne, _vecTwo)
    {
        return _vecOne.x == _vecTwo.x && _vecOne.y == _vecTwo.y;
    }


    function incrementScore() 
    {
        currScore++; 
        gameScore.innerText = currScore.toString().padStart(2, "0");
    }
      

    class Vector
    {
        constructor(_x,_y)
        {
            this.x = _x;
            this.y = _y;
        }

        add(_vec)
        {
            this.x += _vec.x;
            this.y += _vec.y;
        }

      

    }


   


let Input = 
{
    MoveUp: false,
    MoveRight: false,
    MoveDown: false,
    MoveLeft: false,
    keyDownHandler: null, // Store reference to keydown handler

    processInput() {
        this.keyDownHandler = this.handleKeyDown.bind(this);
        window.addEventListener("keydown", this.keyDownHandler);
    },

    handleKeyDown(inputKey) {
        // Reset all movements first
        this.resetInput();

        // Use a switch to handle key inputs
        switch (inputKey.key) {
            case "ArrowUp":
            case "w":
                if (!this.MoveDown) this.MoveUp = true;
                break;
            case "ArrowDown":
            case "s":
                if (!this.MoveUp) this.MoveDown = true;
                break;
            case "ArrowLeft":
            case "a":
                if (!this.MoveRight) this.MoveLeft = true;
                break;
            case "ArrowRight":
            case "d":
                if (!this.MoveLeft) this.MoveRight = true;
                break;
            default:
                // Do nothing for other keys
                break;
        }

        
    },

    resetInput() {
        this.MoveUp = false;
        this.MoveRight = false;
        this.MoveDown = false;
        this.MoveLeft = false;
    },

    clearInputListeners() {
        // Remove the event listener for input
        if (this.keyDownHandler) {
            window.removeEventListener("keydown", this.keyDownHandler);
            this.keyDownHandler = null;
        }
    }
};

class Food
{



    constructor() 
    {
       
        this.spawn(); // Initialize position and color
        this.color = "rgb(185, 98, 6)";
    }

    draw()
    {
        const { x, y } = this.position;
        CTX.globalCompositeOperation = "lighter";
        CTX.shadowBlur = 20;
        CTX.shadowColor = this.color;
        CTX.fillStyle = this.color;
        CTX.fillRect(x, y, cellSize, cellSize);
        CTX.globalCompositeOperation = "source-over";
        CTX.shadowBlur = 0;
    }

    spawn() {
        // Randomize position
        const randX = Math.floor(Math.random() * cells) * cellSize;
        const randY = Math.floor(Math.random() * cells) * cellSize;

        // Avoid spawning food on the snake's body
        if (snake.tails.some(segment => checkCollision(new Vector(randX, randY), segment))) {
            return this.spawn();
        }
        this.position = new Vector(randX, randY);
      }
}



class Snake
{
    constructor()
    {
        this.position = new Vector(Width/2, Height/2);
        this.direction = new Vector(cellSize,0);

        this.delay = 5;
        
        this.tails = [];
        this.total = 1; 
    }

    draw()
    {
        CTX.fillStyle = "rgb(255, 255, 255)";
        CTX.shadowBlur = 20;
        CTX.shadowColor = "rgba(255, 255, 255, 0.3)";
        CTX.fillRect(this.position.x, this.position.y, cellSize, cellSize);
       


        if(this.total > 1)
        {
            CTX.fillStyle = "rgb(222, 222, 222)";

            this.tails.forEach(({x,y}) =>
            {
                CTX.fillRect(x,y, cellSize, cellSize);
            });
        }

        CTX.shadowBlur = 0;
    } 


    edgesWarp()
    {
        this.position.x = (this.position.x + Width) % Width;
        this.position.y = (this.position.y + Height) % Height;
    }

    move()
    {
        const dir = cellSize;

        if(Input.MoveUp && this.direction.y===0)
        {
            this.direction = new Vector(0, -dir);
           
        }

        if(Input.MoveDown && this.direction.y===0)
        {
            this.direction = new Vector(0, dir);
            
        }
        

        if(Input.MoveLeft && this.direction.x===0)
        {
            this.direction = new Vector(-dir, 0);
            
        }

        if(Input.MoveRight && this.direction.x===0)
        {
            this.direction = new  Vector(dir, 0);
           
        }

       
    }

    checkSelfCollison()
    {
        if (this.tails.some(segment => checkCollision(this.position, segment))) 
        {
            isGameOver = true; 
        }
    }

    checkFoodColiision()
    {
        if(checkCollision(this.position, food.position))
        {
            incrementScore();
            food.spawn();
            this.total++;
        }
    }

    update()
    {
        this.edgesWarp();
        this.draw();
       
       

        if(this.delay-- === 0)
        {
            this.checkFoodColiision();
        
            this.move();
            this.tails.unshift(new Vector(this.position.x, this.position.y));

            if (this.tails.length > this.total)
            {
                this.tails.pop(); // Remove extra segments
            }

       
            this.position.add(this.direction);
           
            // Reset movement delay
            this.delay = 5;

            // Check for self-collision
            if (this.total > 3)
            { 
                this.checkSelfCollison();
            }

        }
      
      
    }


}




export function startGame()
{
    updateCanvasSize();

    CTX.imageSmoothingEnabled = false;
    Input.processInput();

    cellSize = Width / cells;

    snake = new Snake();
    food = new Food();

    //Start the GameLoop
    gameLoop();
    
}

export function quitGame()
{
     
   // Stop the game loop
   clearTimeout(requestID);

   // Reset all game-related variables
   isGameOver = false;
   currScore = 0;
   if (gameScore) gameScore.innerText = "00";

   // Clear all event listeners related to input
   Input.clearInputListeners();

   // Clear the canvas
   clear();
}


export function restartGame()
{
    quitGame();
    startGame();

}




function clear() {
    CTX.clearRect(0, 0, Width, Height);
  }
  

function gameLoop()
{
    clear();

    if(isGameOver == false)
    {
       requestID = setTimeout(gameLoop, 1000 / 60);

       drawGrid();
       snake.update();
       food.draw();
   
    }
      
    else 
    {
       // Clear canvas and display Game Over screen
       clear();
       gameOver();
    }

}


function gameOver() {
    // Update max score if needed
    maxScore = Math.max(currScore, maxScore || 0);
  
    // Save max score to local storage
    window.localStorage.setItem("maxScore", maxScore);
  
    // Display Game Over text
    CTX.fillStyle = "#4cffd7";
    CTX.textAlign = "center";
    CTX.font = "bold 6vw Jersey15, sans-serif";
    CTX.fillText("GAME OVER", Width / 2, Height / 4);
    CTX.font = "4vw Jersey15, sans-serif";
    CTX.fillText(`SCORE   ${currScore}`, Width / 2, Height / 4 + Height*0.2);
    CTX.fillText(`MAX SCORE   ${maxScore}`, Width / 2, Height / 4 + Height*0.3);
}


//window.addEventListener("resize", updateCanvasSize);


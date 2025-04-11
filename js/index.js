let board=document.querySelector(".board");
let score=document.querySelector(".score");
let dir={x:0,y:-1};
let prevTime=0;
let snakeArr=[];
let food={x:6,y:7};
let currAxis=0;
let gameStart=0;
let count=0;

function main(ctime){
    if(gameStart==0){
        return;
    }
    let status=0;
    if(count==324){
        alert("You have eaten all the food. You win!");
        status=1;
    }
    if(status==1) startGame();
    window.requestAnimationFrame(main);
    if(ctime-prevTime<100){
        return;
    }
    checkGameOver();
    changeSnakePos();
    displaySnake();
    prevTime=ctime;
}

function checkGameOver(){
    let status=0;
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y){
            alert(`Game Over! Your total score is : ${count}`);
            status=1;
            break;
        }
    }
    if(status==1) startGame();
}

function isCollide(newHead){
    if(newHead.x<=0 || newHead.x>18 || newHead.y<=0 || newHead.y>18){
        return true;
    }
    return false;
}

function isFoodEaten(){
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        snakeArr.push(food);
        if(count!=323){
            food.x=Math.floor(Math.random()*18)+1;
            food.y=Math.floor(Math.random()*18)+1;    
        }else{
            food.x=-1;
            food.y=-1;
        }
        count++;
        score.innerHTML=`Your score is : ${count}`;
        console.log("Food eaten");
    }
}

function changeSnakePos(){
    let currHead=snakeArr[0];
    let lastEle=snakeArr.pop();
    let newHead={x:currHead.x+dir.x,y:currHead.y+dir.y};
    let status=0;
    if(isCollide(newHead)){
        alert(`Game Over! Your total score is : ${count}`);
        status=1;
    }
    if(status==1){
        startGame();
    }
    else{
        snakeArr.unshift(newHead);
        isFoodEaten();    
    }
}

function displayFood(){
    let foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function displaySnake(){
    board.innerHTML="";    
    let snakeElement=document.createElement("div");
    snakeArr.forEach((e,index)=>{
        let snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add("head");
        }else{
            snakeElement.classList.add("body");
        }
        board.appendChild(snakeElement);
    })
    displayFood();
}

window.addEventListener("keydown",(e)=>{
    if(gameStart==0){
        gameStart=1;
        score.innerHTML=`Your score is : 0`;
        window.requestAnimationFrame(main);
    }else{
        let newAxis=currAxis;
        if(e.key=="ArrowUp" && currAxis!=0){
            console.log("a");
            dir.x=0;
            dir.y=-1;
            newAxis=0;
        }else if(e.key=="ArrowDown" && currAxis!=0){
            console.log("b");
            dir.x=0;
            dir.y=1;
            newAxis=0;
        }else if(e.key=="ArrowLeft" && currAxis!=1){
            console.log("c");
            dir.x=-1;
            dir.y=0;
            newAxis=1;
        }else if(e.key=="ArrowRight" && currAxis!=1){
            console.log("d");
            dir.x=1;
            dir.y=0;
            newAxis=1;
        }
        currAxis=newAxis;
        console.log("end");
    }
})
function startGame(){
    gameStart=0;
    snakeArr=[{x:9,y:9},{x:9,y:10}];
    dir={x:0,y:-1};
    food={};
    food.x=Math.floor(Math.random()*18)+1;
    food.y=Math.floor(Math.random()*18)+1;    
    currAxis=0;
    count=0;
    score.innerHTML=`Press any key to start the game`;
    displaySnake();
}
startGame();
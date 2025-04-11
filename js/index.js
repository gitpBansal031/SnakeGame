let dir={x:0,y:0};
let prev=0;
let board=document.querySelector(".board");
let snakeArr=[{x:13,y:14},{x:13,y:15},{x:13,y:16}];
let food={x:6,y:7};

function main(ctime){
    displaySnake();
}
function displaySnake(){
    board.innerHtml="";
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
}

window.addEventListener("keydown",(e)=>{
    if(e.key=="ArrowUp"){
        dir.x=0;
        dir.y=-1;
    }else if(e.key=="ArrowDown"){
        dir.x=0;
        dir.y=1;
    }else if(e.key=="ArrowLeft"){
        dir.x=-1;
        dir.y=0;
    }else if(e.key=="ArrowRight"){
        dir.x=1;
        dir.y=0;
    }
    window.requestAnimationFrame(main);
})

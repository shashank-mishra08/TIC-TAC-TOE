const box = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



// 1 let's create a function to initialise the game;
function initGame(){
       currentPlayer = 'X';
       gameGrid =  ["","","","","","","","",""];
       //6 ui pr v empty karna hoga har box ko
       box.forEach((box,index)=>{
        box.innerText = ""; 
        
        //one more thing is missing i.e color ko v hatana hai, initialise box with css property again
        box.classList = `box box${index+1}`;

       })

       newGamebtn.classList.remove("active");
       gameInfo.innerText = ` Current Player-${currentPlayer}`;
       
}


 initGame();
 // 4 swap turn
    function swapTurn(){
        if(currentPlayer==='X'){
            currentPlayer='0';

        }
        else{
            currentPlayer = 'X';
        }
        // ui update
        gameInfo.innerText = ` Current Player-${currentPlayer}`;  
    }




    //5 
    function checkGameover(){

        let answer = "";
        winningPositions.forEach((position)=>{
            // all three boxes should be non empty and exactly same in value
            if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!== "") 
                && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
                    
                    // check if winner is x
                    if(gameGrid[position]=="X"){
                        answer = "X";
                    }
                    else
                    answer = "O";
                // disable pointer event
                box.forEach((box)=>{
                    box.style.pointerEvents = "none"; 
                })
                // now we know x or O is winner 
                box[position[0]].classList.add("win");
                box[position[1]].classList.add("win");
                box[position[2]].classList.add("win");
            }

        });
        // it means we have a winner
        if(answer !==""){
            gameInfo.innerText = `winner player -${answer}`; 
            newGamebtn.classList.add("active"); 
            return;
        }
        // let's check whether ther is tie
        let fillCount =0;
        gameGrid.forEach((box)=>{
            if(box !=="")
                fillCount++;
        });
        if(fillCount===9){
            gameInfo.innerText = 'game tied !'
            newGamebtn.classList.add("active");
        }

    }



 // 3 
  function handleClick(index){
    if(gameGrid[index]==="")
        box[index].innerHTML =currentPlayer;
    gameGrid[index]=currentPlayer; // ye hmne jo grid bana rakhi hai usme change karta hai, this is for inner logic;
    // ab hame turn v to swap karna hai;
    swapTurn();
    // check koi jeet to nahi gaya
    checkGameover()
}



// 2
box.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index); 
    })

});




newGamebtn.addEventListener('click',initGame);


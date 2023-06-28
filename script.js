// game constants & variables
const bgMusic = new Audio("Tunes/bgmusic.mp3")
const eatSound = new Audio('Tunes/eating.mp3')
const movingSound = new Audio('Tunes/move.mp3')
const gameOver = new Audio('Tunes/gameover.mp3')

let speed= 15;
let score = 0;
let lastPaintTime = 0;

let inputDir = {x:0,y:0}
let food = {x:15,y:11}
let snakeArr = [{x: 7, y:12}]


//game loop function
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime
    gameEngine()
    
}

function isCollide(snake){
    for(let i = 1; i< snakeArr.length; i++){
       
        // if snake collides into its own body
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
           return true;
        }

        
    }
    // if snake collides with wall
    if(snake[0].x >= 18 || snake[0].y>=18 || snake[0].x <= 0 || snake[0].y<=0){
       return true;
    }
    return false;
}

function gameEngine(){
    //updating the snake array and food
    if(isCollide(snakeArr)){
        gameOver.play()
        bgMusic.pause()
        inputDir={x:0,y:0}
        alert(" Game over , press yes to play again")
        snakeArr=[{ x:7, y: 12}]
        bgMusic.play()
        score = 0
    }

    // if you have eaten the food increment the score and regenerate the food
   if(snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    eatSound.play()
    score+=1
    if(score>hiscore){
        hiscore = score
        localStorage.setItem("hiscore",JSON.stringify(hiscore))
        hiscoreBox.innerHTML= "Hiscore : "+ hiscore
    }
    scoreBox.innerHTML= "Score: " + score
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
    // snakeArr.unshift({x:food.x, y:food.y})
    let a = 2
    let b = 16
    food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
}


   //logic to move the snake
   // this will only run if the length of snake array is >= 2
   
   for(let i = snakeArr.length - 2 ; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]} // the cooridinate of the i'th element will become the new coordinates of the i+1'th element & the new 0'the coordinates  will generated below lines 
    
   }

   //this will always run
   //this the new  position of the 0'th element of snake Array
   snakeArr[0].x += inputDir.x
   snakeArr[0].y += inputDir.y


//display snake
   board.innerHTML = ''
   snakeArr.forEach((e,index)=>{
    snakeDiv = document.createElement('div') 
    snakeDiv.style.gridRowStart = e.y 
    snakeDiv.style.gridColumnStart = e.x 
    if(index===0){
        snakeDiv.classList.add('head')

    }
    else{
        snakeDiv.classList.add('snake')
    }
    board.appendChild(snakeDiv)
   })
   
 //display food 
  foodDiv = document.createElement('div')
  foodDiv.style.gridRowStart = food.y 
  foodDiv.style.gridColumnStart = food.x
  foodDiv.classList.add('food')
  board.appendChild(foodDiv)

}

// Game starts here
  bgMusic.play()
  let hiscore = localStorage.getItem('hiscore')
  if(hiscore===null){
    let hiscoreval = 0
     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
    }
    else{
      hiscoreBox.innerHTML= "Hiscore : " + hiscore

  }



window.requestAnimationFrame(main);


// keyDown to start the game
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}
    movingSound.play()
    switch (e.key){
        case "ArrowUp" :
            console.log('arrow up')
            inputDir.x = 0
            inputDir.y = -1
            break;
        case "ArrowDown" :
            console.log('arrow down')
            inputDir.x = 0
            inputDir.y = 1
            break;
        case "ArrowLeft" :
            console.log('arrow left')
            inputDir.x = -1
            inputDir.y = 0
            break;
        case "ArrowRight" :
            console.log('arrow right')
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            break;    
            
    }
    
})

// let playSound = document.getElementById('btn')
// // let playing = 0
// // console.log(playSound)
// playSound.addEventListener('click',playPause)
// function playPause(){
//     if(bgMusic.paused){
//         bgMusic.play()
//         // playing++
        
//     }
//     else{
//         bgMusic.pause()
//         // playing--
//     }
// }


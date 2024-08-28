const boxes = document.querySelectorAll(".box")
const statusword = document.querySelector("#status")
const restart = document.querySelector("button")
let x = "<img src='./media/x.png'/>"
let o = "<img src='./media/o1.png'/>"


let win =[
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
]

let empty = ["","","","","","","","",""]
let running = false
let currentPlayer = x
let player ="x"
start()

function start(){
   boxes.forEach((box)=>{
    box.addEventListener("click",boxClick)})
    statusword.textContent = `${player} your turn`
    restart.addEventListener("click",reassign)
    running = true

}

function boxClick(){
    const index = this.dataset.index
    if(empty[index]!="" || !running){
        return
    }
    updateBox(this,index)
    checkWinner()
    
}
function updateBox(box,index){
    empty[index]=player
    box.innerHTML=currentPlayer
}
function secondPlayer(){
    player = (player=="x")?"o":"x"
    currentPlayer = (currentPlayer==x)?o:x
    statusword.textContent=`${player} your turn`
}
function checkWinner(box,index){
  let iswon =false
  for(i=0;i<win.length;i++){
    let spread = win[i]
    const box0 = empty[spread[0]] 
    const box1 = empty[spread[1]]
    const box2 = empty[spread[2]] 
    
    if(box0=="" || box1 =="" || box2 ==""){
        continue
    }
    if(box0==box1 && box1==box2){
        iswon=true
        boxes[spread[0]].classList.add("winning")
        boxes[spread[1]].classList.add("winning")
        boxes[spread[2]].classList.add("winning")
    }
  }
    if(iswon){
        statusword.innerText=`${player} won`
        running = false
    }
    else if(!empty.includes("")){
        statusword.textContent="game draw"
        running = false
    }
    else{
        secondPlayer()
    }
    


}
function reassign(){
    
    empty = ["","","","","","","","",""]
    running = true
    currentPlayer = x
    player ="x"
    statusword.innerText=`${player} your turn`
    boxes.forEach(box=>{
        box.innerHTML=""
        box.classList.remove("winning")

 })
}

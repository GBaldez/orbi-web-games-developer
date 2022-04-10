const dino = document.querySelector('.dino');
const cactus = document.querySelector('.cactus');

let isJumping = false;
let isGameOver = false;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  if(dispatchEvent.classList!="jump"){
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 300);
  }
}
//take the position of the cactus and the dino and compare them to see if the dino is touching the cactus.
let checkAlive = setInterval(function(){  
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));  
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if(cactusLeft>0 && cactusLeft<60 && dinoTop>=143){  
    dino.style.animationPlayState = 'paused';  
    cactus.style.animationPlayState = 'paused';  
    alert("Ouch! Game Over :(");  
    window.location.reload();  
  }  
},10);  

document.addEventListener('keydown', handleKeyUp);

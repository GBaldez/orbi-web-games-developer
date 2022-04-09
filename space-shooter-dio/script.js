const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;

//movimento e tiro da nave
//event.key pega o botão do teclado que foi pressionado.
//a propriedade key retorna uma string com o identificador da tecla que foi apertada.
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault(); //QUAL AÇÃO ESTÁ SENDO CANCELADA?
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de subir
//getComputedStyle devolve o código css, getPropertyValue retorna uma string com o valor da propriedade indicada como parâmetro.
//se o valor for igual a 0px então apenas retorna pois a imagem já está no topo da tela se não a cada clique diminui-se 50px ao valor da propriedade top que foi atribuída a variável topPosition fazendo com que a imagem suba.
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        //let position = +topPosition; transformando string em número
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

//função de descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

//funcionalidade de tiro
//adiciona o elemento com a imagem do tiro no jogo
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}


function createLaserElement() {
    //pegando a posição do personagem para ser utilizada na inserção da imagem do laser
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    //criando o elemento e indicando o endereço da imagem, adicionando uma classe ao elemento e definindo sua posição na tela.
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { //comparando se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

//função para criar inimigos aleatórios
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função para movimentar os inimigos
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

//função para  colisão
function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//inicio do jogo
startButton.addEventListener('click', (event) => {
    playGame();
})

function playGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

//função de game over
function gameOver() {
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('game over!');
        yourShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}
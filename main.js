const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false; 
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;

let gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#deaa88");
gradient.addColorStop("0.6", "#fff");
gradient.addColorStop("0.9", "#deaa88");

//Repeating backgrounds

const backgroundLayer1 = new Image();
backgroundLayer1.src = "assets/layer-1-sky.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "assets/layer-2-mountain.png";
class Layer {
    constructor (image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height; 
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width){
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);

const gameBackground = [layer1, layer2];

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(10, canvas.height, 50, 50);
    gameBackground.forEach(object =>{
        object.update();
        object.draw();
    });
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    //score
    ctx.fillStyle = gradient                            ;
    ctx.font = "40px Verdana";
    ctx.strokeText(score, 500, 70);
    ctx.fillText(score, 500, 70);
    handleCollision();
    if (handleCollision()) return;
    requestAnimationFrame(animate);
    angle+=0.15;
    hue++;
    frame++;
}
animate();

window.addEventListener("keydown", function(e){
    if (e.code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function(e){
    if (e.code === "Space") spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = "assets/bang.png";
const bangSound = document.createElement("audio");
bangSound.src = "stop.flac";
function handleCollision(){
    for (let i=0; i<obstaclesArray.length; i++){
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < obstaclesArray[i].top && bird.y + bird.height > 0)||
            ((bird.y > canvas.height - obstaclesArray[i].bottom &&
            bird.y + bird.height < canvas.height)))){
                //collision detected
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                bangSound.play();
                //game over text
                ctx.fillStyle = "white";
                ctx.font = "50px Verdana";
                let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                gradient.addColorStop("0", " magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");
                ctx.fillStyle = gradient;
                ctx.fillText("GAME OVER!", canvas.width/4, (canvas.height/2) + 30);
                return true;

            }
    }
}




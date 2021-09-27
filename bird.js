let birdSprite = new Image();
birdSprite.src = "assets/flappybird.png"
class Bird {
    constructor(){
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.originalWidth = 260;
        this.originalHeight = 148;
        this.width = this.originalWidth/4;
        this.height = this.originalHeight/4 ;
        this.frameX = 0;
        this.weight = 1; //force that is pulling the bird down
    }
    update(){
        let curve = Math.sin(angle) * 20; //for bird to sway slighly when idle
        //make sure that the bird is always in the canvas
        if (this.y > canvas.height - this.height*3 + curve){
            this.y = canvas.height - this.height*3 + curve;
            this.vy = 0;
        } else { 
            this.vy +=this.weight;
            this.vy *=0.9;
            this.y += this.vy;
        }
        //prevent bird from going above the canvas
        if (this.y < this.height){
            this.y = this.height;
            this.vy = 0; //make the bird fall instantly once the spacebar is released
        }
        if (spacePressed && this.y> this.height*3) this.flap();
    }
    draw(){          
        ctx.drawImage(birdSprite, 
            this.frameX *this.originalWidth, 0, this.originalWidth, this.originalHeight,
            this.x-5, this.y, this.width*1.3, this.height*1.1);
    }
    flap(){
        this.vy -= 2;
        if (this.frameX >= 10) this.frameX = 0;
        else if (frame%2 === 0) this.frameX++;                                  
    }
}
const bird = new Bird();
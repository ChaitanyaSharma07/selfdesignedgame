class Error {
    constructor(x, y, width, height) {
        var options = {
            isStatic: false,
            frictionAir: 0.03
 
        }

        this.width = width;
        this.height = height;
        this.Visibility = 255;
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image1 = loadImage("errorimage1.png");
        this.image2 = loadImage("errorimage2.png");
        this.randImage = Math.round(random(1, 2));
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        var rand = this.randImage;

        console.log(this.body.speed);
        console.log(this.Visibility);
        
        if (this.body.speed > 10.5 && this.Visibility > 0) {
            push();

            this.Visibility -= 5;
            tint(255, this.Visibility);
            World.remove(world, this.body);
            image(this.image1, this.body.position.x, this.body.position.y, 80, 80);
            
            pop();

        } else {  
            switch(rand) {
                case 1:
                    push();
                    translate(pos.x, pos.y);
                    rotate(angle);
                    imageMode(CENTER);
                    image(this.image1, 0, 0, 80, 80);
                    rectMode(CENTER);
                    rect(0, 0, this.width, this.height);
                    pop();
                    break;
                case 2:
                    push();
                    translate(pos.x, pos.y);
                    rotate(angle);
                    imageMode(CENTER);
                    image(this.image2, 0, 0, 80, 80);
  
                    rectMode(CENTER);
                    rect(0, 0, this.width, this.height);
                    pop();
                }

           
        }


    }

    update() {
        if (this.body.position.y > 800 && gameState == "play") {
            Matter.Body.setPosition(this.body, {x: Math.round(random(100, 1100)), y: Math.round(random(0, 1))})
        }
    }

    

    }

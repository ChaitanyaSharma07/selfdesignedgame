class Bug {
    constructor(x, y, width, height) {
        var options = {
            isStatic: false,
            friction: 0.1
        }

        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image1 = loadImage("buggreen.png");
        this.image2 = loadImage("bugred.png");
        this.randImage = Math.round(random(1, 2));
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;

        switch(this.randImage) {
            case 1:
                push();
                translate(pos.x, pos.y);
                rotate(angle)
                image(this.image1, 0, 0, 50, 50);
                pop();
                break;
            case 2:
                push();
                translate(pos.x, pos.y);
                rotate(angle)
                image(this.image2, 0, 0, 50, 50);
                pop();
        }
            
    }

    
    update() {
        if (this.body.position.y > 800 && gameState == "play") {
            Matter.Body.setPosition(this.body, {x: Math.round(random(100, 1100)), y: Math.round(random(0, 1))})
        }
    }
}
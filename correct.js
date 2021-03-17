class Correct {
    constructor(x, y, width, height) {
        var options = {
            isStatic: false
        }
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, width, height, options);
        this.image = loadImage("correctimage.png");
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle)
        image(this.image, 0, 0, 40, 40);

        pop();
    }
}
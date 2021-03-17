/*class Sling {
    constructor(bodyA, pointB) {
        var options = {
            bodyA:bodyA,
            pointB:pointB,
            length:10,
            stiffness:0.4
        }
     
      
        //this.bodyA = this.sling.bodyA;
        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    fly() {
        this.sling.bodyA = null;
    }

    attach() {
        this.sling.bodyA = bodyA;

    }

    display() {
        var pointB = this.pointB;


        if (this.sling.bodyA) {
            stroke("yellow");
            strokeWeight(7);
            console.log(pointB.x+ "pointb");
            line(this.sling.bodyA.position.x, this.sling.bodyA.position.y, pointB.x, pointB.y);
            line(this.sling.bodyA.position.x, this.sling.bodyA.position.y, pointB.x, pointB.y);
       }

      

    }
}*/


class Sling{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.pointB = pointB
        this.sling = Constraint.create(options);
        
        this.image = loadImage("slingImage.png");
        World.add(world, this.sling);
    }
    attach(body){
        this.sling.bodyA = body;
    }
    
    fly() {
        this.sling.bodyA = null;
    }

    display(){
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            push();
            stroke("blue")
            strokeWeight(3);
            imageMode(CENTER);
            image(this.image, 125, 700, 50, 150);
            line(pointA.x + 10, pointA.y, pointB.x - 10, pointB.y);
            line(pointA.x + 10, pointA.y, pointB.x - 50, pointB.y)
         
            pop();
        }
    }
    
}
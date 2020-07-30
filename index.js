let gameStart = false
let onlyOnceFlag = false
let otherOnlyOnce = false
let newFlag = false
let decText = false
let twentyNinteenText = false
let rbmPlaying = false
let start = false
let gameState = false
let clockScore = 6
let startTime = false;
let am = true
let isTwentyTwenty = false;
let cnv

let enemies = []
let enemiesToDelte = []
let hero

function preload(){
  song = loadSound('assets/rbm.mp3');
  happyImg = loadImage('assets/img/happy.png');
}

function setup() {

  songMK = loadSound('assets/mk.mp3');
  sadImg = loadImage('assets/img/concern.png');

  cnv = createCanvas(window.innerWidth, window.innerHeight);

  setInterval(() => {
    if (startTime == true){
      clockScore += 1
    }
  }, 5210)

   for (let x = 0; x < 500; x+=40){
     enemies.push(new Bubble({x: window.innerWidth/2, y: window.innerHeight/2}, 10, sadImg, -4.71 + x, 5));
   }


  setIntervalX( () => {
    for (let x = 0; x < 30; x++){
      enemies.push(new Bubble({x: window.innerWidth, y: 50 }, 30, sadImg, 0+x, 5));
    }
  }, 1500, 3);

  setIntervalX( () => {
    for (let x = 0; x < 30; x++){
      enemies.push(new Bubble({x: 0 + x, y: 50 }, 30, sadImg, 0+x, 5));
    }
  }, 1500, 3);

   hero = new Hero({x: (window.innerWidth/2), y:window.innerHeight-200}, 30, happyImg);

  //  trackers = [];
  //  for (let x = 0; x < 5; x+=1){
  //  trackers.push(new Tracker({x: window.innerWidth/2, y: window.innerHeight/2}, 10, sadImg, -4.71 + x, 5));
  //  enemies.push(trackers[x]);
  //  }
 
    setInterval(() => {
      for (let x = 0; x < 500; x+=40){
        enemies.push(new Bubble({x: window.innerWidth/2, y: window.innerHeight/2}, 10, sadImg, -4.71 + (x), 5 + x/1000));}
        enemies.push(new Tracker({x: window.innerWidth/2, y: window.innerHeight/2}, 10, sadImg, -4.71, 4));
      //enemies.forEach( (item) => {item.tracker(hero)
     // })
   }, 500)
   setInterval(() => {
    enemies.forEach( (item) => {if (item.is_tracker()) {
      item.track(hero) }
    })
 }, 100)

}

function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

function draw() {


  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont("Futura");

  textSize(window.innerWidth * .1);
  text('Tap to begin', window.innerWidth/2, window.innerHeight/2);

  cnv.mousePressed(canvasPressed);

  if (rbmPlaying) {
    background(0);
    gameStart = true;
  }


  if (gameStart == true) {
/*
    if (decText == false) {
      setTimeout(() => {
        decText = true;
      }, 5000)
    }

    if (decText == true) {
      background(0);
      textSize(window.innerWidth * .25);
      text("Dec. 31", window.innerWidth/2, window.innerHeight/2);
    }

    if (twentyNinteenText == false) {
      setTimeout(() => {
        twentyNinteenText = true;
      }, 7100)
    }

    if (twentyNinteenText == true) {
      background(0);
      textSize(window.innerWidth * .36);
      text("2019", window.innerWidth/2, window.innerHeight/2);
    }

    if (start == false) {
      setTimeout(() => {
        start = true;
      }, 9500)
    }

    if (start == true) {
      background(0);
      textSize(window.innerWidth * .2);
      text("COLLECT", window.innerWidth/2, window.innerHeight/2);
    }

    if (gameState == false) {
      setTimeout(() => {
        gameState = true;
      }, 14800)
    }
*/
  //  if (gameState == true) {
      gameStateF();
   //}

  }
}

function gameStateF() {

    let bgColor = [0,0,0];
    let delay = 2444;

    startTime = true;

    background(...bgColor);

    textSize(55);

    if (clockScore == 12) {
      am = false;
      if (!otherOnlyOnce){
        otherOnlyOnce = true;
        mountainKing();
      }

    }

    if (am) {
      text(clockScore+":00 A.M.", (window.innerWidth/2), 50);
    }

    if (!am  && clockScore < 9 || clockScore == 12) {
      text(clockScore+":00 P.M.", (window.innerWidth/2), 50);
    }

    if (!am && clockScore > 8 && clockScore != 12) {
      text(clockScore+":00 P.M.", (window.innerWidth/2) + Math.floor(Math.random()*2), 50);
    }

    textSize(45);


    text("2019", (window.innerWidth/2), 123);
    textSize(30);
    text("Score: "+hero.health, (window.innerWidth/2), 185);


    if (clockScore > 12 && onlyOnceFlag == false) {
      clockScore = 1;
      newFlag = true;
      onlyOnceFlag = true;
    }

    if (clockScore >= 12 && newFlag) {
      background(0);
      textSize(window.innerWidth * .33);
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
      background(0);
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
      background(0);
      text("2020", window.innerWidth/2 + Math.floor(Math.random()*30), window.innerHeight/2  + Math.floor(Math.random()*30));
    }


    updateGameState();




}

function canvasPressed() {
  if (rbmPlaying == false) {
    song.play();
    rbmPlaying = true;
  }
}

function mountainKing() {
  songMK.play();
}

function updateGameState() {

hero.changeSkin(sadImg)

  enemies.forEach( (enemy, index, arr) => {



//    enemy.update({x:enemy.getX()+1, y:enemy.getY()+1});
    enemy.move()

    if (enemy.outOfBounds() == true) {
      arr.splice(index,1);
    } else {
      enemy.render();
    }


    if (hero.intersectingWithCircle(enemy) && enemy.outOfBounds() == false) {
      arr.splice(index,1);
      hero.addHealth(1);
      return
    }
  })



  hero.enableControl();
  hero.render();
}

class Bubble {

  constructor(cords = {x: window.innerWidth, y: window.innerWidth}, r, imgSkin = null, theta = 0, speed = 1){
    this.x = cords.x;
    this.y = cords.y;
    this.r = r;

    this.angle = theta;
    this.speed = speed;

    this.imageSkin = imgSkin;
  }

  getCords() {
    return {
      x: this.x,
      y: this.y
    }
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getRadius() {
    return this.r;
  }

  outOfBounds() {

    if (this.x < -30){
      return true
    }

    if (this.x > window.innerWidth + 30) {
      return true
    }

    if (this.y < -30) {
      return true
    }

    if (this.y > window.innerHeight + 30){
      return true
    }

    return false

  }

  update(cords) {
    this.x = cords.x;
    this.y = cords.y;
  }

  move() {

    this.x = this.getX() + (Math.cos(this.angle) * this.speed)
    this.y = this.getY() + (Math.sin(this.angle) * this.speed)
  }

  changeSkin(img) {
    this.imageSkin = img

  }

  render() {

    ellipse(this.x, this.y, this.r*2, this.r*2)

    if (this.imageSkin) {
      imageMode(CENTER)
      image(this.imageSkin, this.getX(), this.getY());
    }

  }

  intersectingWithCircle(Circle) {
    if (dist(this.x, this.y, Circle.getX(), Circle.getY()) > (this.r + Circle.getRadius()) ) {
      return false
    }
    console.log("true")
    return true
  }
  is_tracker() {
    return false
  }



}
class Tracker extends Bubble {
constructor(cords = {x: window.innerWidth, y: window.innerWidth}, r, imgSkin = null, theta = 0, speed = 1){
  super(cords, r, imgSkin, theta, speed )
  this.x = cords.x;
  this.y = cords.y;
  this.r = r;

  this.angle = theta;
  this.speed = speed;

  this.imageSkin = imgSkin;
}
track(hero) {
  let cords = hero.getCords()
  let hero_x = cords.x
  let hero_y = cords.y
  this.angle = Math.atan2(hero_y - this.y, hero_x - this.x);
}
is_tracker() {
  return true
}
}


class Hero extends Bubble {

  constructor(cords = {x: window.innerWidth, y: window.innerWidth}, r, imgSkin = null, theta = 0, speed = 1) {
    super(cords, r, imgSkin)
    this.health = 0
    this.history = []
    this.count = 0
  }

  update(cords) {
    if (cords.x < 0){
      cords.x = 0
    }

    if (cords.x > window.innerWidth) {
      cords.x = window.innerWidth
    }

    if (cords.y < 0) {
      cords.y = 0
    }

    if (cords.y > window.innerHeight){
      cords.y = window.innerHeight
    }

    this.x = cords.x
    this.y = cords.y

    this.count += 1

    if (this.count % 4 == 0){
      this.history.push({x: this.x, y: this.y, opacity:1})
    }

    if(this.history.length > 7){
      this.history.shift()
    }
  }

  addHealth(health) {
    this.health += health;
  }

  doDamage(dmg) {
    this.health -= dmg;
  }

  enableControl() {

    if (keyIsDown(LEFT_ARROW)) {
      this.update({x:this.getCords().x - 6.9, y:this.getCords().y})
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.update({x:this.getCords().x + 6.9, y:this.getCords().y})
    }

    if (keyIsDown(UP_ARROW)) {
      this.update({x:this.getCords().x, y:this.getCords().y - 6.9})
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.update({x:this.getCords().x, y:this.getCords().y + 6.9})
    }

  }

  render() {
    //background ellipse
    ellipse(this.x, this.y, this.r*2, this.r*2)

    if (this.imageSkin) {
      imageMode(CENTER)

      //the trail
      this.history.forEach( (point, index) => {
        if (this.history[index].opacity > 0){
          this.history[index].opacity -= .05;
        }
        drawingContext.globalAlpha = (this.history[index].opacity > 0) ? this.history[index].opacity : 0;
        image(this.imageSkin, point.x, point.y);
        drawingContext.globalAlpha = 1
      })

      //avatar pic
      image(this.imageSkin, this.getX(), this.getY());

    }

  }

}

let gameStart = false
let onlyOnceFlag = false
let otherOnlyOnce = false
let newFlag = false
let decText = false
let twentyNinteenText = false
let rbmPlaying = false
let start = false
let gameState = false
let clockScore = 5
let startTime = false;
let am = true
let isTwentyTwenty = false;
let cnv

let onlyOnceOne = false
let onlyOnceTwo = false
let onlyOnceThree = false
let onlyOnceFour = false
let onlyOnceFive = false
let onlyOnceSix = false
let onlyOnceSeven = false

let damageState = false

let onlyOnce2020 = false
let onlyOnce20202 = false
let onlyOnce20203 = false
let onlyOnce20204 = false

let enemies = []
let enemiesToDelte = []
let hero

let isMobile = false

let screenWidth = 0
let screenHeight = 0


//anti-IOS scroll code
function preventBehavior(e) {
    e.preventDefault();
};
document.addEventListener("touchmove", preventBehavior, {passive: false});
//end

function preload(){
  song = loadSound('assets/rbm.mp3');
  happyImg = loadImage('assets/img/happy.png');
  skypeImg = loadImage('assets/img/skype.png');
}

function setup() {

  screenWidth = window.innerWidth
  screenHeight = window.innerHeight

  //mobile check
  if ((screenWidth < 780)){
    isMobile = true
   }

  //loading assets
  songMK = loadSound('assets/mk.mp3');
  sadImg = loadImage('assets/img/concern.png');
  friendsImg = loadImage('assets/img/friends.png');
  pineappleImg = loadImage('assets/img/pineapple.png');
  pedestrianIMG = loadImage('assets/img/pedestrian.png')
  haircutIMG = loadImage('assets/img/haircut.png')
  zoomImg = loadImage('assets/img/zoom.png')
  restaurantIMG = loadImage('assets/img/restaurant.png')
  sleepIMG = loadImage('assets/img/sleep.png')
  //end

  cnv = createCanvas(screenWidth, screenHeight);

  //the global clock, all time based events are tied to the tick of clockScore
  //incremented every 5.21 seconds
  setInterval(() => {
    if (startTime == true){
      clockScore += 1
    }
  }, 5210)

   hero = new Hero({x: (screenWidth/2), y:screenHeight-200}, 30, happyImg);
}

//utility function, provides a param to limit the number of setInterval repetitions
function setIntervalX(callback, delay, repetitions) {
    let x = 0;
    let intervalID = window.setInterval(function () {
       callback();
       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
    return true
}

function draw() {

  //************** INTRO SEQUENCE **************

  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont("Futura");

  textSize(screenWidth * .1);
  text('Tap to begin', screenWidth/2, screenHeight/2);

  cnv.mousePressed(canvasPressed);

  if (rbmPlaying) {
    background(0);
    gameStart = true;
  }

  if (gameStart == true) {

    if (decText == false) {
      setTimeout(() => {
        decText = true;
      }, 5000)
    }

    if (decText == true) {
      background(0);
      textSize(screenWidth * .1);
      text("YOU'RE BACK IN", screenWidth/2, screenHeight/2);
    }

    if (twentyNinteenText == false) {
      setTimeout(() => {
        twentyNinteenText = true;
      }, 7100)
    }

    if (twentyNinteenText == true) {
      background(0);
      textSize(screenWidth * .36);
      text("2019", screenWidth/2, screenHeight/2);
    }

    if (start == false) {
      setTimeout(() => {
        start = true;
      }, 9500)
    }

    if (start == true) {
      background(0);
      textSize(screenWidth * .2);
      text("REJOICE", screenWidth/2, screenHeight/2);
    }

    if (gameState == false) {
      setTimeout(() => {
        gameState = true;
      }, 14800)
    }

    if (gameState == true) {
      gameStateF();
   }

   //************** END INTRO SEQUENCE **************

  }
}

function gameStateF() {

    //************** GAMEPLAY **************

    let bgColor = [0,0,0];
    let delay = 2444;

    startTime = true;

    background(...bgColor);

    textSize(55);

    if ((clockScore == 6 || clockScore == 7) && am == true) {
      textSize(screenWidth * .07);

      if (isMobile) {
        textSize(screenWidth * .15);
      }

      text("NO ZOOM!", screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (clockScore == 7 && onlyOnceOne == false) {

      onlyOnceOne = true

      setIntervalX( () => {
        for (let x = 0; x < 30; x++){
          enemies.push(new Bubble({x: screenWidth - 50, y: screenHeight - 50 }, 30, skypeImg, (1/3.14)+x, 6));
        }
      }, 500, 5);

      setIntervalX( () => {
        for (let x = 0; x < 30; x++){
          enemies.push(new Bubble({x: 50, y: screenHeight - 50 }, 30, skypeImg, (1/3.14)+x, 6));
        }
      }, 500, 5);

      setIntervalX( () => {
        for (let x = 0; x < 50; x++){
          enemies.push(new Bubble({x: screenWidth / 2, y: screenHeight}, 30, skypeImg, (1/3.14)+x, 13));
        }
      }, 800, 3);
    }

    if ((clockScore == 8 || clockScore == 9 || clockScore == 10) && (am == true)) {
      textSize(screenWidth * .07);

      if (isMobile) {
        textSize(screenWidth * .15);
      }

      text('SEE FRIENDS!', screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (clockScore == 8 && onlyOnceTwo == false) {

      onlyOnceTwo = true

      setIntervalX(() => {
          for (let x = 0; x < 500; x+=40){
            enemies.push(new Bubble({x: screenWidth/2, y: screenHeight/2}, 10, friendsImg, -4.71 + (x), 5 + x/1000));}
            enemies.push(new Tracker({x: screenWidth/2, y: screenHeight/2}, 10, friendsImg, -4.71, 4));
       }, 1300, 10)

      setIntervalX( () => {
        for (let x = 0; x < 50; x++){
          enemies.push(new Bubble({x: screenWidth / 2, y: screenHeight}, 30, friendsImg, (1/3.14)+x, 4));
        }
      }, 1000, 7);

      setIntervalX( () => {
        for (let x = 0; x < 50; x++){
          enemies.push(new Bubble({x: screenWidth / 2, y: screenHeight}, 30, friendsImg, (1/3.14)+x, 13));
        }
      }, 200, 9);


      setIntervalX( () => {
        for (let x = 0; x < 500; x+=50){
          enemies.push(new Bubble({x: x*2, y: screenHeight}, 30, happyImg, (1/3.14)+x, 13));
        }
      }, 800, 12);

    }

    if (clockScore == 12) {
      am = false;
      if (!otherOnlyOnce){
        otherOnlyOnce = true;
        mountainKing();
      }
    }

    if ((clockScore == 11 && am == true) || (clockScore == 12 && am == false) || (clockScore == 1 && am == false)) {
      textSize(screenWidth * .03);

      if (isMobile) {
        textSize(screenWidth * .055);
      }

      text('GO TO SUPERMARKET\nCHOOSE OWN PINEAPPLE\nNO ROTTEN INSTACART PINEAPPLE', screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (((clockScore == 12 && am == false) || clockScore == 1) && onlyOnceThree == false) {

      onlyOnceThree = true

      setIntervalX( () => {
        for (let x = 0; x < 30; x++){
          enemies.push(new Bubble({x: screenWidth - 50 - (Math.random() * 150), y: screenHeight - 50 }, 30, pineappleImg, (1/3.14)+x, 8));
        }
      }, 500, 14);

    }

    if ( (clockScore == 2 && am == false) ) {
      textSize(screenWidth * .03);

      if (isMobile) {
        textSize(screenWidth * .08);
      }

      text('PEDESTRIANS ARE NOT\nTHREATS TO YOUR LIFE', screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (((clockScore == 3 && am == false) || (clockScore == 4 && am == false)) && onlyOnceFour == false) {


      onlyOnceFour = true
      let x = 1
      setIntervalX( () => {
        x += 1
        enemies.push(new Tracker({x:10, y:screenHeight/2}, 30, pedestrianIMG, 0, (5+x)/2))
        enemies.push(new Tracker({x:screenWidth -10, y:screenHeight/2}, 30, pedestrianIMG, -1, (5+x)/2))
        enemies.push(new Tracker({x:screenWidth/2, y:10}, 30, pedestrianIMG, -4.712, (5+x)/2))
        enemies.push(new Tracker({x:screenWidth/2, y:screenHeight - 10}, 30, pedestrianIMG, -1, (5 + x)/2))
      }, 300, 18);

    }
    if ((clockScore == 5 && am == false)) {
      textSize(screenWidth * .03);

      if (isMobile) {
        textSize(screenWidth * .07);
      }

      text('NO BACK-ALLEY HAIRCUTS', screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (((clockScore == 5 && am == false) || (clockScore == 6 && am == false)) && onlyOnceFive == false) {
      onlyOnceFive = true
      setIntervalX( () => {
        for (let x = 0; x < 30; x++){
          enemies.push(new Bubble({x: screenWidth - 50 - (Math.random() * 150), y: screenHeight - 50 }, 30, haircutIMG, (1/3.14)+x, 4));
        }
      }, 600, 8);
    }

    if ( (clockScore == 7 && am == false) ) {
      textSize(screenWidth * .03);

      if (isMobile) {
        textSize(screenWidth * .06);
      }

      text("INDOOR RESTAURANT SITTING:\nA LUXURY", screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (((clockScore == 8 && am == false) || (clockScore == 9 && am == false)) && onlyOnceSix == false) {
      onlyOnceSix = true
      let x = 0
      let i = screenWidth/25
      setIntervalX( () => {
        x += i
        enemies.push(new Bubble({x: x, y: 10 }, 30, restaurantIMG, -4.712, 5));

      }, 100, 25);
      let x_dup = 0
      setIntervalX( () => {
        x_dup += i
        enemies.push(new Bubble({x: screenWidth - x_dup, y: 10 }, 30, restaurantIMG, -4.712, 5));

      }, 100, 25);
    }

    if ( (clockScore == 9 && am == false) ) {
      textSize(screenWidth * .03);

      if (isMobile) {
        textSize(screenWidth * .05);
      }

      text("REST WELL TO BEAT YOUR COWORKERS\nTO THE OFFICE", screenWidth/2, screenHeight/2);
      textSize(55);
    }

    if (((clockScore == 10 && am == false) && onlyOnceSeven == false)) {
      onlyOnceSeven = true
      let x = 0
      let y = 0
      setIntervalX( () => {
        for(let i = 0; i < 10; i++) {
          x = Math.random() * screenWidth
          y = Math.random() * screenHeight
          enemies.push(new Tracker({x: x, y: y}, 30, sleepIMG, 0, 5))
        }
      }, 1000, 5);
    }

    if (hero.health < 0) {
      textSize(screenWidth * .1);
      text("NO ONE WINS 2020", screenWidth/2, screenHeight/2);
      textSize(55);
    }


    if (am) {
      text(clockScore+":00 A.M.", (screenWidth/2), 50);
    }

    if (!am  && clockScore < 9 || clockScore == 12) {
      text(clockScore+":00 P.M.", (screenWidth/2), 50);
    }

    if (!am && clockScore > 8 && clockScore != 12) {
      text(clockScore+":00 P.M.", (screenWidth/2) + Math.floor(Math.random()*2), 50);
    }

    textSize(45);


    text("2019", (screenWidth/2), 123);
    textSize(30);
    text("Score: "+hero.health, (screenWidth/2), 185);


    if (clockScore > 12 && onlyOnceFlag == false) {
      clockScore = 1;
      newFlag = true;
      onlyOnceFlag = true;
    }

    if (clockScore >= 12 && newFlag) {
      background(0);
      textSize(screenWidth * .33);
      text("2020", screenWidth/2 + Math.floor(Math.random()*30), screenHeight/2  + Math.floor(Math.random()*30));
      background(0);
      text("2020", screenWidth/2 + Math.floor(Math.random()*30), screenHeight/2  + Math.floor(Math.random()*30));
      background(0);
      text("2020", screenWidth/2 + Math.floor(Math.random()*30), screenHeight/2  + Math.floor(Math.random()*30));

      textSize(74);

      if(isMobile){
        textSize(screenWidth * .07);
      }

      text("NOW AVOID EVERYTHING", (screenWidth/2), 60);
      textSize(50);
      text("HP: "+hero.health, (screenWidth/2), 140);

      if (clockScore == 13) {
        damageState = true;
        hero.changeSkin(sadImg)

        if (onlyOnce2020 == false){
          onlyOnce2020 = true

          setIntervalX( () => {
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .1}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .3}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .5}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .7}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .9}, 30, zoomImg, -3.14, 9));
          }, 900, 100);

          setIntervalX( () => {
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .2}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .4}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .6}, 30, zoomImg, -3.14, 9));
            enemies.push(new Bubble({x: screenWidth - 10, y: screenHeight * .8}, 30, zoomImg, -3.14, 9));
          }, 1350, 100);

         }
      }

      if (clockScore == 15 && onlyOnce20202 == false) {

        onlyOnce20202 = true

        setIntervalX( () => {
          enemies.push(new Bubble({x: screenWidth * .1, y: 10}, 30, zoomImg, -4.712, 9));
          enemies.push(new Bubble({x: screenWidth * .3, y: 10}, 30, zoomImg, -4.712, 9));
          enemies.push(new Bubble({x: screenWidth * .5, y: 10}, 30, zoomImg, -4.712, 9));
          enemies.push(new Bubble({x: screenWidth * .7, y: 10}, 30, zoomImg, -4.712, 9));
          enemies.push(new Bubble({x: screenWidth * .9, y: 10}, 30, zoomImg, -4.712, 9));
        }, 200, 100);

      }
      if (clockScore == 20 && onlyOnce20203 == false) {
        onlyOnce20203 = true

        setIntervalX( () => {
          for (let x = 0; x < 70; x++){
            enemies.push(new Bubble({x: screenWidth - 50, y: screenHeight - 50 }, 30, zoomImg, (1/3.14)+x, 15));
          }
          }, 500, 5);

          setIntervalX( () => {
            for (let x = 0; x < 70; x++){
               enemies.push(new Bubble({x: 50, y: screenHeight - 50 }, 30, friendsImg, (1/3.14)+x, 15));
          }
          }, 500, 5);

          setIntervalX( () => {
              for (let x = 0; x < 70; x++){
                enemies.push(new Tracker({x: screenWidth/2, y: 50 }, 30, pineappleImg, (1/3.14)+x, 15));
            }
          }, 500, 5);

      }


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

function finalText(){
  textSize(50);
  text("NO ONE WINS 2020", (screenWidth/2), screenHeight/2);
}

function updateGameState() {

  enemies.forEach( (enemy, index, arr) => {

    if (enemy.is_tracker()) {
      enemy.track(hero)
    }

    enemy.move()

    if (enemy.outOfBounds() == true) {
      arr.splice(index,1);
    } else {
      enemy.render();
    }

    if (hero.intersectingWithCircle(enemy) && enemy.outOfBounds() == false) {
      arr.splice(index,1);

      if (damageState == false) {
        hero.addHealth(1);
      } else {

        if (!isMobile) {
          hero.doDamage(5);
        } else {
          hero.doDamage(2);
        }

      }


    }
  })

  hero.enableControl();
  hero.render();
}




class Bubble {

  constructor(cords = {x: screenWidth, y: screenWidth}, r, imgSkin = null, theta = 0, speed = 1){
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

    if (this.x > screenWidth + 30) {
      return true
    }

    if (this.y < -30) {
      return true
    }

    if (this.y > screenHeight + 30){
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
    return true
  }

  is_tracker() {
    return false
  }



}


class Tracker extends Bubble {
constructor(cords = {x: screenWidth, y: screenWidth}, r, imgSkin = null, theta = 0, speed = 1){
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

  constructor(cords = {x: screenWidth, y: screenWidth}, r, imgSkin = null, theta = 0, speed = 1) {
    super(cords, r, imgSkin)
    this.health = 0
    this.history = []
    this.count = 0

    this.neX = 0
    this.neY = 0


  }

  update(cords) {
    if (cords.x < 0){
      cords.x = 0
    }

    if (cords.x > screenWidth) {
      cords.x = screenWidth
    }

    if (cords.y < 0) {
      cords.y = 0
    }

    if (cords.y > screenHeight){
      cords.y = screenHeight
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

    if (isMobile) {
      this.speed = 14;
      this.angle = Math.atan2(mouseY - this.getY(), mouseX - this.getX());


      //prevents stuttering hero
      //only update location if mouse has moved more than 7 units
      if ( ((this.getX() >= (mouseX-7))
      && (this.getX() <= (mouseX+7) ))
      && (this.getY() >= (mouseY-7))
      && (this.getY() <= (mouseY+7) )) {
      } else {
        this.neX = this.getX() + (Math.cos(this.angle) * this.speed)
        this.neY = this.getY() + (Math.sin(this.angle) * this.speed)
        this.update({x: this.neX, y: this.neY})
      }


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

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backgroundImg = document.createElement("img");
backgroundImg.src =
  "https://t3.ftcdn.net/jpg/00/88/98/18/360_F_88981880_YjJManMJ6hJmKr5CZteFJAkEzXIh8mxW.jpg";

const heroImg = document.createElement("img");
heroImg.src = "https://avatars.githubusercontent.com/u/65408106?s=280&v=4";

const starImg = document.createElement("img");
starImg.src =
  "https://blog.knife-depot.com/wp-content/uploads/2020/03/shuriken-676x676.png";
let arrayenemy = [
  "https://upload.wikimedia.org/wikipedia/commons/d/d7/Ninja-ide-logo.png",
  "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/0a/8cd7f1b14344618b75142593bc7af8/JavaCupLogo800x800.png?auto=format%2Ccompress&dpr=1",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png",
  "https://static.wikia.nocookie.net/wikies/images/4/43/Logo-csharp.png/revision/latest?cb=20180617092325&path-prefix=ru",
];

const rabbitImg = document.createElement("img");
 function selectSrc(){
    rabbitImg.src=arrayenemy[Math.floor( Math.random()*3)]
  }
selectSrc()

//   "https://preview.redd.it/4e15s7ljf2o41.png?width=256&format=png&auto=webp&s=99b4d97d6c2eeacbb218fc6e31773bd3aecc385c";

const stabAudio = document.createElement("audio");
stabAudio.src = "https://soundbible.com//mp3/Stab-SoundBible.com-766875573.mp3";
const audio = document.createElement("audio");
audio.src =
  "http://www.slspencer.com/Sounds/Star Trek Sounds/sounds/PhotonTorp.mp3";

let data = {
  hero: {
    xDelta: 0,
    yDelta: 0,
    x: 10,
    y: 260,
    width: 100,
    height: 100,
  },
  bullets: [],
  rabbits: [],
};
function intersect(rect1, rect2) {
  const x = Math.max(rect1.x, rect2.x),
    num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
    y = Math.max(rect1.y, rect2.y),
    num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
  return num1 >= x && num2 >= y;
}
function update() {
  data.hero.x += data.hero.xDelta;
  data.hero.y += data.hero.yDelta;

  data.bullets.forEach(function (bullet) {
    data.rabbits.forEach(function (rabbit) {
      if (intersect(rabbit, bullet)) {
         selectSrc()
        stabAudio.currentTime = 0;
        stabAudio.play();
        bullet.deleteMe = true;
        rabbit.deleteMe = true;
      }
    });
  });
  data.bullets = data.bullets.filter(function (bullet) {
    return bullet.deleteMe !== true;
  });

  data.rabbits = data.rabbits.filter(function (rabbit) {
    return rabbit.deleteMe !== true;
  });
  data.bullets.forEach(function (bullet) {
    bullet.x += bullet.xDelta;
  });

  data.bullets = data.bullets.filter(function (bullet) {
    if (bullet.x > canvas.width) {
      return false;
    }
    return true;
  });
  data.rabbits.forEach(function (rabit) {
    rabit.x += rabit.xDelta;
  });
  if (data.rabbits.length === 0) {
    data.rabbits.push({
      xDelta: (Math.random() + 0.5) * -2,
      x: canvas.width - 100,
      y: data.hero.y,
      width: 100,
      height: 100,
    });
  }
}

function draw() {
  context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  context.drawImage(
    heroImg,
    data.hero.x,
    data.hero.y,
    data.hero.width,
    data.hero.height
  );

  data.bullets.forEach(function (bullet) {
    context.drawImage(starImg, bullet.x, bullet.y, bullet.width, bullet.height);
  });
  data.rabbits.forEach(function (rabbit) {
    context.drawImage(
      rabbitImg,
      rabbit.x,
      rabbit.y,
      rabbit.width,
      rabbit.height
    );
  });
}

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();

document.addEventListener("keydown", function (evt) {
  if (evt.code === "ArrowRight") {
    data.hero.xDelta = 2;
  } else if (evt.code === "ArrowLeft") {
    data.hero.xDelta = -2;
  } else {
    audio.currentTime = 0;
    audio.play();
    data.bullets.push({
      xDelta: 10,
      x: data.hero.x + data.hero.width,
      y: data.hero.y + data.hero.height / 2.5,
      width: 20,
      height: 20,
    });
  }
});
document.addEventListener("keyup", function (evt) {
  data.hero.xDelta = 0;
});




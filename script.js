const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let imgArr = [];
let layerArr = [];
let speed = 5;

let direction = 1;

class Layer {
    constructor(image, layerSpeed) {
        this.image = image;
        this.width = image.width;
        this.layerSpeed = layerSpeed;
        this.x = 0;
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.x,
            0,
            canvas.width,
            this.image.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        ctx.drawImage(
            this.image,
            this.x - direction * this.width,
            0,
            canvas.width,
            this.image.height,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }
    update() {
        this.x += direction * speed * this.layerSpeed;
        if (direction == -1) {
            if (this.x < direction * this.width)
                this.x = direction * speed * this.layerSpeed;
        } else {
            if (this.x > this.width) this.x = speed * this.layerSpeed;
        }
    }
}
function init() {
    imgArr = [];
    layerArr = [];
    for (i = 1; i <= 5; i++) {
        let img = new Image();
        img.src = `layer-${i}.png`;
        imgArr.push(img);
    }
    let j = 0.2;
    for (let i = 0; i < 5; i++) {
        let layer = new Layer(imgArr[i], j);
        j += 0.2;
        layerArr.push(layer);
    }
}
init();
const dog = new Image();
dog.src = "layer-6.png";

let frameWidth = Math.floor(dog.width / 12) + 1;
let frameHeight = dog.height;
let rowNum = 1;
let frameCount = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 5; i++) {
        layerArr[i].draw();
        layerArr[i].update();
    }

    ctx.drawImage(
        dog,
        rowNum * frameWidth,
        0,
        frameWidth,
        frameHeight,
        10,
        0,
        150,
        canvas.height
    );
    frameCount++;
    if (frameCount % 5 == 0) rowNum++;
    if (frameCount == 59) frameCount == 0;
    if (rowNum > 8) rowNum = 0;
    requestAnimationFrame(animate);
}
animate();
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
}
window.addEventListener("resize", () => {
    resize();
});
setTimeout(() => {
    resize();
}, 20);
window.addEventListener("keydown", (e) => {
    if (e.code == "NumpadSubtract") {
        speed -= 0.5;
    } else if (e.code == "NumpadAdd") {
        speed += 0.5;
    }
    if (speed < 0) speed = 0;
});

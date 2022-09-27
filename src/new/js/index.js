function preload() {
    font = loadFont('assets/font.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    button(10,10,"helloworld",40,1);
}
function preload() {
    font = loadFont('assets/font.ttf');
    fontsize = 40;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    stroke(255);
    strokeWeight(4);
    
    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);

    fill(255);
    text('Path Finding Visualizer', windowWidth/2, windowHeight/2,);

    noFill();
    bezier(0, windowHeight/2, mouseX, mouseY, mouseX, mouseY, windowWidth, windowHeight/2);
}
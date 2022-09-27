function button(x, y, message, fontsize, callback) {

    hitbox = font.textBounds(message, x, y, fontsize);
    extraWidth = (hitbox.w/100)*20;
    extraHeight = (hitbox.h/100)*80;
    
    width = hitbox.w + extraWidth;
    height = hitbox.h + extraHeight;

    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);

    fill(255);
    stroke(255);
    strokeWeight(2);
    text(message, x+width/2, y+height/2 - 10 );
    
    noFill();
    rect(x, y, width, height);
}
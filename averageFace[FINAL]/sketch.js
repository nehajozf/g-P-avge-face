/*
Instructions - 

The left grid picture is the image given to us.

In the right grid, we calculate the average face from the images given by hovering or moving the mouse left and right.

When we press spacebar, we can see random face images.

*/


var imgs = [];

var avgImg;

var numOfImages = 30;

var mouseValue = 1;

var imageLoaded;

var imgIndex = 0;

var loadedInCounter;


//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    
    //Step 1 - 
    
    loadedInCounter = 0;
    for(var i = 0; i < numOfImages; ++i) {
        
        var filename = "assets/" + i + ".jpg";
        
        img = loadImage(filename, imageLoaded); 
        
        imgs.push(img);
    }
}


function imageLoaded() {
    
    loadedInCounter++;
}

//////////////////////////////////////////////////////////
function setup() {
    
    //Step 2 - 
    createCanvas(imgs[0].width * 2, imgs[0].height);
    
    pixelDensity(1);
    
    //Step 3 - 
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}

function draw() {
    background(125);
    
    // For image on the left
    image(imgs[imgIndex], 0, 0);
    
    
    
    if(loadedInCounter == numOfImages) {
        
        //Step 4 - 
        for(var i=0; i<imgs.length; i++) {
            
            imgs[i].loadPixels();
        }
        
        
        avgImg.loadPixels();
        
        mouseValue = map(mouseX, 0, width, 0, 1);
        
        
        //Step 5 - 
        for(var x=0; x<avgImg.width; x++) {
            
            for(var y=0; y<avgImg.height; y++){
                
                var pixelIndex = ((avgImg.width * y) + x) * 4;
                
                //Step 6 - 
                var sumR = 0;
                var sumG = 0;
                var sumB = 0;

                for(var i=0; i<imgs.length; i++){
                    
                    var img = imgs[i];
                    
                    sumR += img.pixels[pixelIndex+0];
                    
                    sumG += img.pixels[pixelIndex+1];
                    
                    sumB += img.pixels[pixelIndex+2];
                    
                }

                avgImg.pixels[pixelIndex+0] = sumR/imgs.length;
                
                avgImg.pixels[pixelIndex+1] = sumG/imgs.length;
                
                avgImg.pixels[pixelIndex+2] = sumB/imgs.length;
                
                avgImg.pixels[pixelIndex+3] = 255;
                
                
                // Step 7 : Ideas for further implementation - 
                var lerp_Red = lerp(imgs[imgIndex].pixels[pixelIndex+0], avgImg.pixels[pixelIndex+0], mouseValue);
                
                var lerp_Green = lerp(imgs[imgIndex].pixels[pixelIndex+1], avgImg.pixels[pixelIndex+1], mouseValue);
                
                var lerp_Blue = lerp(imgs[imgIndex].pixels[pixelIndex+2], avgImg.pixels[pixelIndex+2], mouseValue);

                avgImg.pixels[pixelIndex+0] = lerp_Red;
                
                avgImg.pixels[pixelIndex+1] = lerp_Green;
                
                avgImg.pixels[pixelIndex+2] = lerp_Blue;
                
                avgImg.pixels[pixelIndex+3] = 255;
                
            }
        }
        
        avgImg.updatePixels();
    }
    
    // For image on the right 
    image(avgImg, imgs[0].width, 0);
    noLoop();
    

    
   
    textSize(29);
    fill(255,255,0);
    text('Press spacebar to view random image.', 21, 52);
    text('Move mouse right or left to view effect', 513, 500);
    //text(' to view effect', 515, 500);
    
    
    
    
     
    
}


//Step 7 : Ideas for further implementation
function keyPressed() {
    
    // Press right arrow to move to next image
    if (keyCode === RIGHT_ARROW) {
        imgIndex++;
        if(imgIndex > 30){
            imgIndex = 1;
        }
        redraw();
    }
    
   
    //Press left arrow to move to previous image
    if (keyCode === LEFT_ARROW) {
        imgIndex--;
        if(imgIndex < 1){
            imgIndex = 30;
        }
        redraw();
    } 
    
      
    // Press spacebar for random image
    if (key === ' '){
        imgIndex = int(random(0, 30));
        redraw();
    }
    
    return false; 
    
    
    
    
    
    
}


//Step 7 : Ideas for further implementation
function mouseMoved() {
    
    mouseValue = map(mouseX, 0, width, 1, 1);
    redraw();
}

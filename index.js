const Jimp = require('jimp');
const fs = require('fs');


const imageURL = 'image.jpg';


// Image is 600 x 400.
// Blocks are 30 x 20

// 20 blocks across, 20 blocks down.

Jimp.read("input/" + imageURL).then(function (image) {

    let avgRGBInEachBlock = [];

    // For 400 blocks (20 across, 20 down) calculate average rgb values and put them in an array
    for (let col = 0; col<20; col++){
        for (let row = 0; row<20; row++){

            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;
            image.scan(30*row, 20*col, 30, 20, function(x, y, idx){
                totalRed += this.bitmap.data[idx + 0];
                totalGreen += this.bitmap.data[idx + 1];
                totalBlue += this.bitmap.data[idx + 2];
                
            })
            let avgRGB = [Math.round(totalRed/600), Math.round(totalGreen/600), Math.round(totalBlue/600)];
            avgRGBInEachBlock.push(avgRGB);
        }
    }

    // Write out array of average colours into json file
    fs.writeFile('BlockColours.json', JSON.stringify(avgRGBInEachBlock), err => console.log(err));


}).catch(function (err) {
    console.error(err);
});


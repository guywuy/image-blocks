const Jimp = require('jimp');
const fs = require('fs');
const Average = require('image-average-color');

// For all files in source Images Directory, resize them, and also analyse the small images for the average colour.

const inputImagesPath = './srcImages';
const outputImagesPath = './ImageThumbs';

const averageColoursArray = [];

//Return each file in a directory (as array of items)
fs.readdir(inputImagesPath, function(err, items) {
    if (err) throw err;
    
	for (item in items) {

        let fileName = items[item];
		let file = inputImagesPath + '/' + fileName;
        let outFile = outputImagesPath + '/' + fileName;
        
		
        Jimp.read(file).then(function (image) {
            if (err) throw err;

            image.cover(60, 40)            // resize
                .quality(60)                 // set JPEG quality
                .write(outFile, function(){
                    
                    Average(outFile, (err, color) => {
                        if (err) throw err;
                        
                        averageColoursArray.push({
                            'name': fileName,
                            'red' : color[0],
                            'green' : color[1],
                            'blue' : color[2],
                            'total' : color[0] + color[1] + color[2]
                        })

                
                        if (items.length==averageColoursArray.length) {
                            console.log('Calling writeArrayToFile');
                            writeArrayToFile('ThumbnailData.json', averageColoursArray)
                        }
                    });
                }); // save and afterwards get average colour

        }).catch(function (err) {
            console.error(err);
        });
    }

});


function writeArrayToFile(jsonFileName, arrayName){
    // Write out fileNames
    fs.writeFile(jsonFileName, JSON.stringify(arrayName), err => console.log(err));
}
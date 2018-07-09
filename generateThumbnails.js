const Jimp = require('jimp');
const fs = require('fs');

const inputImagesPath = './srcImages';
const outputImagesPath = './ImageThumbs';

//Return each file in a directory (as array of items)
fs.readdir(inputImagesPath, function(err, items) {
    if (err) throw err;

    console.log(items);
    
	for (item in items) {

        let fileName = items[item];
		let file = inputImagesPath + '/' + fileName;
		let outFile = outputImagesPath + '/' + fileName;
		
        Jimp.read(file).then(function (image) {
            if (err) throw err;

            image.cover(60, 40)            // resize
                 .quality(60)                 // set JPEG quality
                 .write(outFile); // save

        }).catch(function (err) {
            console.error(err);
        });
    }

});
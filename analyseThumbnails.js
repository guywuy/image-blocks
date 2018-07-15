const Average = require('image-average-color');
const fs = require('fs');

const outputList = [];

const imagesPath = './img/ImageThumbs';

//Return each file in a directory (as array of items)
fs.readdir(imagesPath, function(err, items) {
    if (err) throw err;
    
    var progress = items.length;

	items.forEach(item => {    
        
        let fileName = item;
		let file = imagesPath + '/' + fileName;
        
        Average(file, (err, color) => {
            if (err) throw err;
            
            outputList.push({
                'name': fileName,
                'red' : color[0],
                'green' : color[1],
                'blue' : color[2],
                'total' : color[0] + color[1] + color[2]
            })

            progress --;

            if (progress==0) {
                // Sort array of objects by total rgb value
                var sortedByTotal = outputList.slice(0);
                sortedByTotal.sort(function(a,b) {
                    return a.total - b.total;
                });
               
                // Write out fileNames
                fs.writeFile('ThumbnailFileData.json', JSON.stringify(sortedByTotal), err => console.log(err));
            }
        });
    });
	
});


const thumbnailData = require('./ThumbnailFileData.json');
const getClosestThumbnail = require('./getClosestThumbnail.js');
const colorBlocks = require('./BlockColours.json');
const fs = require('fs');

let output = [];

colorBlocks.forEach(element => {
    output.push(getClosestThumbnail(element, thumbnailData));
});

fs.writeFile('FileNamesToUse.json', JSON.stringify(output), err => console.log(err));



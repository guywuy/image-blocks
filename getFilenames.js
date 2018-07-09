const getClosestThumbnail = require('./compare.js');
const colorBlocks = require('./BlockColours.json');
const fs = require('fs');

let output = [];

colorBlocks.forEach(element => {
    output.push(getClosestThumbnail(element));
    // console.log(element, getClosestThumbnail(element));
});

fs.writeFile('FIleNamesToUse.json', JSON.stringify(output), err => console.log(err));



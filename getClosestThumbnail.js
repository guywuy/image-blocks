const Chroma = require('chroma-js');


// Take an input rgb array, return the closest colour matching filename
function getClosestThumbnail(targetColour, thumbnails){

    
    // Chroma Color can take an array of rgb values
    let referenceColour = Chroma(targetColour);
    
    let closest = 999;
    let winner = '';
    
    thumbnails.forEach(element => {
        
        let color = Chroma([element.red, element.green, element.blue]);
        let delta = Chroma.deltaE(referenceColour, color);
        if (delta < closest) {
            closest = delta;
            winner = element.name;
        }
    });

    return winner;
}

module.exports = getClosestThumbnail;
importScripts("lib/jimp.min.js");

if (!self.Jimp && !window.Jimp) {
    throw new Error("Could not load jimp.min.js in jimp-worker.js");
}

// Do some image processing in Jimp. Syntax exactly the same as
// https://github.com/oliver-moran/jimp
// Reading and writing functions are replaced for browser context.
// See readme at https://github.com/strandedcity/jimp
self.addEventListener('message', function(e) {
    // Some browsers allow passing of file objects directly from inputs, which would
    // enable doing the file I/O on the worker thread. Browser support is patchy however,
    // so the most compatible strategy is to read the file on the main thread asynchronously,
    // then pass the data here. File I/O is asynchronous on the main thread, and represents
    // a generally small part of the total image-processing task.
    //
    // See https://developer.mozilla.org/en-US/docs/Web/API/Transferable for support of transferables
    // Note that passing an array of Transferables makes the worker incompatible with IE10.

    function getBlockData(imageBuffer){

        Jimp.read(imageBuffer.buffer).then(function(image){
            let avgRGBInEachBlock = [];
            console.log('reading resized image data')

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

            // Return data uri to the main thread.
            self.postMessage({
                type: "ARRAY",
                data:  avgRGBInEachBlock,
            });

            // Good idea to close the worker when you're done
            self.close();

        })
    }

    Jimp.read(e.data).then(function(image){
        
        var originalMime = image._originalMime,
            targetMimeType = originalMime || Jimp.MIME_JPEG;

            console.log(targetMimeType);

            image.cover(600, 400)            // resize
            .quality(60)                 // set JPEG quality
            .getBuffer(targetMimeType,function(mime, data){
                // console.log(data);
                getBlockData(data);
                   
            });
    }).catch(function(err){
        // Prevent the error from getting swallowed in the promise
        setTimeout(function() { throw err; },0);
    });

}, false);

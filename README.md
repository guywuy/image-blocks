# Image as thumbnails -
Able to accept an image, and replace it with an array of smaller images, that give a similar overall picture.

- Resize the image e.g. to 600px x 400px.
- Split into small blocks (e.g. 30px x 20px).
- For each block, determine the average colour.
- For each block, determine which image from a preexisting bank of images has the perceptually closest average colour.
- Return an array of filenames, to place images.

https://github.com/oliver-moran/jimp#low-level-manipulation
Check whether bitwise operators would be useful.



---
## Choice - client side or server side.
### Client side - 
resize selected image client side using JIMP (to buffer? or to file stored locally temporarily?), split into blocks using same, and get filenames using thumbnail data sent along with original HTML file.

### Server side - 
Allow file upload, resize and analyse on server, sent HTML response with templated filenames included.



## To do: 
- Choose a route above! Client side seems preferable...
- Enable any file to be source - via upload.
- Add ability to work with different block sizes.
- Final image display should have each image link to source image for viewing high res version
- Make file resize function which returns a promise, so we can chain next events (getFilenames) to when it completes.
- Better to send filenames in HTML (calculated on server and sent via template) rather than fetching in clientside script.


### Current process:
- Step One - Generate and analyse thumbnails from source images - Manual, do once - `node processSourceImages`
- Step Two - Split image into blocks and get matching filenames, display result - Make automatic.

For now for step two - put source images in 'input' folder. Run `node resizeImagesTo600x400`. Change desired filename in `index.js`. Run `node index`. Run `node getFilenames`.
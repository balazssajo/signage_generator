const express = require('express');
const { createCanvas, loadImage } = require('canvas'); // Import node-canvas
const app = express();
const port = 3000;
const qr_url = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=";


app.get('/event', async (req, res) => {
  const title = req.query.title;
  const image_link = req.query.imageLink;
  const description = req.query.description;
  const eventLink = req.query.eventLink;
  const qrCodeURL = qr_url + eventLink;


  
  const image = await loadImage(image_link);


  const rgb = await averageColorFromImage(image);

 async function isColorLight(r, g, b) {

    const luminance = 0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255;
  

    const threshold = 0.5;
  

    return luminance > threshold;
  }


var complementaryColor;
  
  var background_color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  if (isColorLight(rgb.r, rgb.g, rgb.b)){
    complementaryColor = {
      r: 205 - rgb.r,
      g: 205 - rgb.g,
      b: 205 - rgb.b,
    };
  }
    else{
      complementaryColor = {
        r: 295 - rgb.r,
        g: 295 - rgb.g,
        b: 295 - rgb.b,
      };
    }
  
  var text_color = `rgb(${complementaryColor.r}, ${complementaryColor.g}, ${complementaryColor.b})`;


    const htmlResponse = `
    <!DOCTYPE html>
<html lang='en'>
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta charset='UTF-8'>
        <title>${title}</title>
        <style>
            body{
    flex-basis: 0;
    background-color: ${background_color};
    height: 100vh;
    width: 56.25vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
    color: ${text_color};
    font-weight: bold;
}
.flex-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 56.25vh;
    margin: 0;
    padding: 0;
}
.box1{
    flex:1;
    padding-top: 10%;
    top:12%;
    font-size: 3.5vh;
    text-align: center;
    vertical-align: middle;
	position: relative;
    margin: 0;
    animation: slideLeft 12s infinite;
    
    
    
}
.box2{
    flex:2;
    font-size: 2vh;
    justify-content: center;
    align-items: center;
    position: relative;
display: flex;
    margin: 0;
    padding: 0;
}

.box2 .qr_container{
  max-width: 10.42vh;
  max-height: 10.42vh;
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: -2vh;  
}
.box2 .qr_container img{
  width: 100%;
  height: 100%;
  border-radius: 8%;
  z-index: 9999;
  position: relative;
}

.box2 p {
	    display: inline;
    bottom: -22%;
    padding-left: 20%;
    position: relative;
}

.box3{
    flex:3;
    padding-bottom: 0;
    margin: 0;
    width: 56.25vh;
    height: 50vh;
    position: relative;
    display: block;
    text-align: center;

    
}
.box3 img{
    
    height: 100%;
    width: 100%;
    object-fit: cover;
    
}

@keyframes slideLeft {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(3px); /* Adjust the value to the desired left movement */
  }
   50% {
    transform: translateX(0px); /* Adjust the value to the desired left movement */
  }
  75% {
    transform: translateX(-3px)
  }
  100% {
    transform: translateX(0px)
  }
  
}

.floating-image {
    
    position: absolute;
  top: 0;
  width: 100%;
    object-fit: cover;
    animation: float 8s infinite;

}

@keyframes float {
    0% {
        transform: scale(1.05);
        
    }
    50% {
        transform: scale(1.062);
    }
    100% {
        transform: scale(1.05)
    }
}
        </style>
        <link rel='stylesheet' href='style.css'>
    </head>
    <div class='flex-container'>
        <div class='box1'>
            ${title}
        </div>
        <div class='box2'>
            <div class='qr_container'>
                <img class='pop-out' src='${qrCodeURL}'>
            </div>
            <p>
                ${description}
            </p>
        </div>
        <div class='box3'>
            <div class='floating-image'>
                <img  src=${image_link} alt='';>
            </div>
        </div>
    </div>
</html>`;


    res.setHeader('Content-Type', 'text/html');


    res.send(htmlResponse);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

  async function averageColorFromImage(image) {
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    const imgData = context.getImageData(0, 0, image.width, image.height);
    const length = imgData.data.length;
    const rgb = { r: 0, g: 0, b: 0 };
  
    for (let i = 0; i < length; i += 4) {
      rgb.r += imgData.data[i];
      rgb.g += imgData.data[i + 1];
      rgb.b += imgData.data[i + 2];
    }
  
    const count = length / 4;
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);
  
    return rgb;
  }


chrome.runtime.onMessage.addListener(gotMessage);

async function myAlert(message){
    const div = document.createElement("div");
    div.classList.add = "alert";
    div.id = "alert2";
    div.style.fontSize = "2em";
    div.style.justifyContent= "center";
    div.style.alignItems= "center";
    div.style.display = "flex";
    div.style.textAlign = "center";
    div.style.width = "35vw";
    div.style.height = "10vh";
    div.style.position = "fixed";
    div.style.background = "rgb(217, 217, 219)";
    div.style.top = "1%";
    div.style.xIndex = '10';
    div.style.yIndex = '10';
    div.style.right = "1%";
    div.style.zIndex = "9999";
    div.style.borderRadius = "8%";
    div.style.fontFamily = "monaco";
    div.style.color = "#0d1259";
    const p = document.createElement("p");
    p.style.padding = "5px 5px";
    p.style.display =  "flex";
    
    
    p.textContent = message;
    div.appendChild(p);
    document.body.appendChild(div);
}

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  function remove(e)
{
    e.preventDefault(); // Prevent the default link opening behavior

}
  document.addEventListener('click', remove);
  if (message.txt === 'start') {
    window_link =  "http://localhost:3000/event";
    myAlert('Please select an image!');
    //alert("You started the Infopolis signage generator. \n\n\nPlease select an image!");

    var image, link, title, description, out;
    var ret = true;
    document.addEventListener("click", function(event) {
        event.preventDefault();
        const clickedElement = event.target;
            if (clickedElement.id === "alert"){
                console.log("alert clicked");
                removeAlert();
                return;
            }
        
        if (out){ return;}
        if (clickedElement.tagName == 'IMG'){
            image = clickedElement.src;
            ret = false;
            console.log("kep:  "+ image);
            myAlert("Now select the title!");
        return;
        }
        if (title){
            console.log("desc");
            description = clickedElement.textContent;
            link = window.location.href;
            out = window_link + '?' + 'imageLink=' + image + '&eventLink=' + link + '&title=' + title + '&description='  + description;
            var tmp = '';
            for (let i = 0; i < out.length; i++) { 
                if (out[i] === ' ' || out[i] === '  ') { 
                    tmp += '%20'; 
                } else { 
                    tmp += out[i]; 
                } 
            } 
            console.log(tmp);
            document.removeEventListener('click', remove);
            location.reload();
            window.open(tmp, "_blank");
        return;
        }
        if (!ret){
            title = clickedElement.textContent;
            myAlert('Finally select the description!')
            return;
        }
});
  }
}
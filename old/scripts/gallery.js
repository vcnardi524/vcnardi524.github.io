let viewImage = document.querySelector(".view-image");
let travelButtons = document.getElementsByClassName("travelButton");
let viewImageImg = document.querySelector(".view-image img");
let closeBtn = document.querySelector(".view-image span");
let caption = document.querySelector(".view-image div");
let rollerBtns = document.getElementsByClassName("galleryRoller");


function setUpImagePopup(){
    let images = document.querySelectorAll(".gallery .travel_gallery .column img");
    
    
    for( let image of images){
        image.addEventListener("click", function(e) {
            viewImage.style.display = "flex";
            viewImageImg.src = e.target.src;
            caption.innerHTML = (e.target.alt);
    
    
            //image parameters
            let imageTop = viewImageImg.offsetTop;
            const imageHeight = viewImageImg.offsetHeight;
            imageTop = imageTop + imageHeight;
            let imageLeft = viewImageImg.offsetLeft;
            const btnWidth = closeBtn.offsetWidth;
            // let imageWidth = viewImageImg.offsetWidth;
            let offsetHrzntl = imageLeft - btnWidth - 10; //10 pixel buffer 
            // let leftBuffer = imageLeft + imageWidth;
    
            // Set the position and bottom for closeBtn
            closeBtn.style.bottom = imageTop + "px";
            // closeBtn.style.left   =  leftBuffer + "px";
            closeBtn.style.right  = offsetHrzntl + "px";
    
    
            console.log(imageLeft, btnWidth);
    
            // Set the position and bottom for caption
            caption.style.position = "absolute";
            caption.style.bottom = imageTop + "px";
            caption.innerHTML = viewImageImg.alt;
    
        })
    }
}


//buttons//

closeBtn.addEventListener("click", function(){
    viewImage.style.display = "none";
})
function checkImageDisplay(){
    return (viewImage.style.display === "flex");
}
function handleResize(){
    if(checkImageDisplay()){
        //image parameters
        let imageTop = viewImageImg.offsetTop;
        const imageHeight = viewImageImg.offsetHeight;
        imageTop = imageTop + imageHeight;
        let imageLeft = viewImageImg.offsetLeft;
        const btnWidth = closeBtn.offsetWidth;
        // let imageWidth = viewImageImg.offsetWidth;
        let offsetHrzntl = imageLeft - btnWidth - 10; //10 pixel buffer 
        // let leftBuffer = imageLeft + imageWidth;

        // Set the position and bottom for closeBtn
        closeBtn.style.bottom = imageTop + "px";
        // closeBtn.style.left   =  leftBuffer + "px";
        closeBtn.style.right  = offsetHrzntl + "px";


        console.log(imageLeft, btnWidth);

        // Set the position and bottom for caption
        caption.style.position = "absolute";
        caption.style.bottom = imageTop + "px";
        caption.innerHTML = viewImageImg.alt;
    }
}
window.addEventListener("resize", handleResize)
window.addEventListener('load', function() {
    // Code to be executed after the page has fully loaded
    setUpImagePopup();
});


for(let button of travelButtons){
    button.addEventListener("click", function() {
        window.location.href = "personal.html";
    });    
}
for (let roller of rollerBtns) {
    roller.addEventListener("click", function() {
        let columns = roller.parentElement.children[0].children;
        var imagePath = columns[0].querySelector("img").src;
        var pathParts = imagePath.split("/");
        var travelIndex = pathParts.indexOf("travel");
        var destination = pathParts[travelIndex + 1];
        var max;
        if (destination === "japan"){
            max = 11;
        }
        else if (destination === "italy"){
            max = 13;
        }
        else if (destination === "korea"){
            max = 14;
        }
        else {
            max = 12;
        }

        let i = 6;
        while(i <= max){
            for (let column of columns){
                column.innerHTML += '<img src = "/objects/travel/' + destination + '/' + i + '.jpeg" alt = "">';
                i++;
                //end reached
                if (i >= max) {
                    break;
                }
            }
        }
        setUpImagePopup();
        roller.style.display = "none";
        
    });
}
const photos = document.querySelectorAll('.photo');

// add slideshow to all the photos
if(document.body.contains(photos[0])) {
    for (let photo of photos) {
        const arrowLeft = photo.parentNode.querySelector('.left-arrow');
        const arrowRight = photo.parentNode.querySelector('.right-arrow');
        window.onload = function() {
            adjustWidth(photo);
        }
        window.onresize = function() {
            adjustWidth(photo);
        }
    
        photo.addEventListener('mouseover', function() {
            clearInterval(time);
            time = null;
        });
        photo.addEventListener('mouseleave', function() {
            time = setInterval(function(){
                arrowRight.click();
            }, 3000);
        });
    
        // bind right arrow click event
        let num = 0;

        arrowRight.addEventListener('click', function() {
            // if slide to the last photo, set left = 0 to the first
            var imgLength = photo.getElementsByTagName('img').length;

            if (num == imgLength - 1){
                photo.children[0].style.left = 0;
                num = -1;
            }
            num++;
            slide(photo.children[0], -num * photo.offsetWidth);
        });
    
        // bind left arrow click event
        arrowLeft.addEventListener('click', function() {
            var imgLength = photo.getElementsByTagName('img').length;
            if (num == 0){
                num = imgLength;
                photo.children[0].style.left = -num * photo.offsetWidth + 'px';
            }
            num--;
            slide(photo.children[0], -num * photo.offsetWidth);
        });

        // auto slide
        let time = setInterval(function(){
            arrowRight.click();
        }, 3000);
    }
}

// function of silde, obj is the object to be slided, target is the target position to stop slide
function slide(obj, target) {
    // clear out all timer
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        let speed = target - obj.offsetLeft;
        if (obj.offsetLeft == target) {
            // stop slide
            clearInterval(obj.timer);
        }
        // slide slower and slower
        obj.style.left = obj.offsetLeft + speed + 'px';
    }, 15);
}

function adjustWidth(obj) {obj.offsetWidth = obj.offsetWidth;}

const images = document.querySelectorAll('.photo img');
const previewOverlay = document.querySelector('.preview-overlay');
const previewImage = document.querySelector('.preview-content img');

images.forEach(image => {
    image.addEventListener('click', function() {
        const src = this.src;
        previewImage.src = src;
        previewOverlay.style.display = 'flex';
    });
});

previewOverlay.addEventListener('click', function() {
    this.style.display = 'none';
});
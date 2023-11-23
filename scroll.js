document.addEventListener('DOMContentLoaded', function() {
    const navUl = document.querySelector("nav ul");
    const nav = document.querySelector('nav');
    const dropIcon = document.querySelector('.drop-icon');

    // navigate to intro page
    navTo(dropIcon, '.intro');

    // show the navigation bar for 4s
    setTimeout(function() {
        navUl.style.display = 'none';
        nav.style.backgroundColor = 'transparent';
    }, 4000);

    // if mouse move in, show the navigation bar
    nav.addEventListener("mouseover", function() {
        navUl.style.display = 'flex';
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    });

    // if mouse leave, the navigation bar disappear 
    nav.addEventListener("mouseleave", function() {
        navUl.style.display = 'none';
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const backgrounds = document.querySelectorAll('.background');
        const expands = document.querySelectorAll('.expand');
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY > 0 ? 'down' : 'up';
        lastScrollY = currentScrollY; 

        // if user scroll to the certain part, move the overlay as scroll distance change
        backgrounds.forEach((background, index) => {
            const overlay = background.parentElement.parentElement.querySelector('.overlay');
            const title = background.parentElement.querySelector('.title-style');
            const contents = overlay.querySelectorAll('.content');
            const photo = overlay.querySelector('.photo-container');
            const photoContainer1 = overlay.querySelector('.photo-container1');
            const rect = background.getBoundingClientRect();
            const distance = -rect.top - 60;
            
            if (rect.top < 0 && rect.bottom > 0) {
                handleScroll(overlay, title, contents, photo, photoContainer1, `titleZoomIn${index + 1}`, distance, scrollDirection);
            }
        });

        // if user scroll to the expand part, show the content of it
        expands.forEach(expand => {
            const content = expand.querySelector('.content');
            const rect = expand.getBoundingClientRect();
            const distance = -rect.top;
            if (distance > -300 && rect.bottom > 0) {
                if (content) {
                    content.style.animation = 'contentAppear 1.5s ease-in-out forwards';
                }
            } else {
                if (content) {
                    content.style.animation = 'contentDisappear 1s ease-in-out forwards';
                } 
            }
        });
    });
    

    // the function to handle user scroll
    function handleScroll(overlay, title, contents, photo, photoContainer1, titleZoomIn, distance, scrollDirection) {
        const maxScroll = window.innerHeight * 0.45;
        if (distance < maxScroll) {
            overlay.style.transform = `translateY(-${distance}px)`;
        } else {
            overlay.style.transform = `translateY(-${maxScroll}px)`;
        }
        if (scrollDirection == 'down') {
            if (distance > 100) {
                title.style.animation = 'titleZoomOut 0.5s ease-in-out forwards';
                contents.forEach(content => {
                    content.style.animation = 'contentAppear 1.5s ease-in-out forwards';
                });
                if (photo) {
                    photo.style.animation = 'contentAppear 1.5s ease-in-out forwards';
                }
                if (photoContainer1) {
                    photoContainer1.style.animation = 'contentAppear 1.5s ease-in-out forwards';
                }
            }
        } else {
            if (distance < 100) {
                title.style.animation = `${titleZoomIn} 0.5s ease-in-out forwards`;
                contents.forEach(content => {
                    content.style.animation = 'contentDisappear 1s ease-in-out forwards';
                });
                if (photo) {
                    photo.style.animation = 'contentDisappear 1s ease-in-out forwards';
                }
                if (photoContainer1) {
                    photoContainer1.style.animation = 'contentDisappear 1s ease-in-out forwards';
                }
            }  
        }
    }

    const introLink = document.querySelector(".intro-link");
    const insLink = document.querySelector(".ins-link");
    const proposalLink = document.querySelector(".proposal-link");
    const mvpLink = document.querySelector(".mvp-link");
    const finalLink = document.querySelector(".final-link");
    const portfolioLink = document.querySelector(".portfolio-link");
    const reflectionLink = document.querySelector(".reflection-link");

    // to handle the navigation position in navigation bar
    navTo(introLink, '.intro');
    navTo(insLink, '.inspiration');
    navTo(proposalLink, '.proposal');
    navTo(mvpLink, '.mvp');
    navTo(finalLink, '.final');
    navTo(portfolioLink, '.portfolio');
    navTo(reflectionLink, '.reflection');

    function navTo(link, targetClass) {
        link.addEventListener("click", function (event) {
            const targetElement = document.querySelector(targetClass);
            const rect = targetElement.getBoundingClientRect();
            const offset = rect.top + window.innerHeight * 0.1;

            window.scrollTo({
                top: window.scrollY + offset,
                behavior: 'smooth'
            });
            event.preventDefault();
        });
    }
});


  

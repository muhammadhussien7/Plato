
// Slider Home:-
const sliderImg = Array.from(document.querySelectorAll('.slider'));
const next = document.querySelector('.next');
const previous = document.querySelector('.prev');
let currentSlider =0,
    slideCount = sliderImg.length,
    bulletSlider = document.querySelector('.slider-bullet');


//create bulltes slider
for(let i = 0; i<slideCount; i++){
    let libullet = document.createElement('li');
    libullet.setAttribute('data-index', i)
    bulletSlider.appendChild(libullet);
    bulletSlider.firstElementChild.className = "slider-active";
};  

// loop for bulltes
let bulletArray = Array.from(document.querySelectorAll('.slider-bullet li'));
for(let i =0; i < bulletArray.length; i++){
    bulletArray[i].onclick = function(){
        currentSlider = parseInt(this.getAttribute('data-index'));
        changeSlider();
        resetTimer();
    }
}

//click on previous button
previous.addEventListener("click" , () => {
    prevSlider();
});

//click on next button
next.addEventListener("click" , () => {
    nextSlider();
});

//previous function
function prevSlider(){
    if(currentSlider === 0){
        currentSlider = slideCount-1;
    }else{
        currentSlider--;
    }
    changeSlider();
    resetTimer();
};

//next function
function nextSlider(){
    if(currentSlider === slideCount-1){
        currentSlider = 0;
    }else{
        currentSlider++;
    }
    changeSlider();
    resetTimer();
};

//add and remove all classes from img and bullets
function changeSlider(){
    removeAll();
    
    sliderImg[currentSlider].classList.add('active');
    bulletSlider.children[currentSlider].classList.add('slider-active');
};

//remove all classes
function removeAll(){
    sliderImg.forEach((img) => {
        img.classList.remove('active');
    });

    bulletArray.forEach((bullet) => {
        bullet.classList.remove('slider-active');
    });
}

//Autoplay Function
function autoBlay(){
    nextSlider();
    changeSlider();
}

//Reset Timer
let timer = setInterval(autoBlay,4000);
function resetTimer(){
    clearInterval(timer);
    timer = setInterval(autoBlay,4000);
}


//=====================================================================
// Scroll behavior / active color nav / menuBar:-
let navMenu = document.querySelectorAll('.header-nav a'),
    navArray = Array.from(navMenu),
    menuBar = document.querySelector('.menu-bar'),
    headerNav = document.querySelector('.header-nav');

navArray.forEach((item) => {
    item.onclick = (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior:'smooth',
        });

        navArray.forEach((n) => {
            n.classList.remove('header-active');
            n.classList.remove('link-active');
        });
        e.target.classList.add('header-active');
        e.target.classList.add('link-active');
    };
});

menuBar.onclick = () => {                                                  //??
    headerNav.classList.toggle('changed');
}


//=====================================================================
//Fixed Header / Counter / Highlight Nav Menu on scroll :-
let headerSection = document.querySelector('.header'),
    sticky = headerSection.offsetTop,
    counterMain = document.querySelector('.team-skills'),
    counterTop = counterMain.offsetTop,
    counterHeight = counterMain.offsetHeight,
    windowHeight = this.innerHeight,                   
    sectionItem = Array.from(document.querySelectorAll('.section-info')),
    currentSection = '',
    counterItem = document.querySelectorAll('.skill-item .counter-item');
    

window.onscroll = () => {
    //Fixed Header
    if(window.scrollY >= sticky){
        headerSection.classList.add('sticky');
    }else{
        headerSection.classList.remove('sticky');
    }

    //Counter                                                      //(counterHeight - windowHeight) ==??
    if(window.scrollY >= counterTop + counterHeight - windowHeight){ 
        counterItem.forEach((item) => {
            let updateCounter = function(){
                let targetNumber = item.dataset.target,
                    currentNumber = +item.innerText,
                    increment = targetNumber/500;
                if(currentNumber < targetNumber){
                    item.innerText = Math.ceil(currentNumber + increment);
                    setTimeout(updateCounter , 2500/targetNumber);
                }else{
                    item.innerText = targetNumber;
                }
                
            };
            updateCounter();
        });
    };

    //Highlight Nav Menu on scroll
    sectionItem.forEach((section) => {
        const sectionTop = section.offsetTop;
        if(scrollY >= sectionTop - 80){
            currentSection = section.getAttribute('name');
        };
    });
    navArray.forEach((li) => {
        li.classList.remove('header-active');
        li.classList.remove('link-active');
        
        if(li.classList.contains(currentSection)){
            li.classList.add('header-active');
            li.classList.add('link-active');
        };
    });
}

//=====================================================================
//Tab Menu
let tabMenu = document.querySelectorAll('.menu-list li'),
    tabArray = Array.from(tabMenu);
    menuContent = document.querySelectorAll('.menu .menu-content'),
    contentArray = Array.from(menuContent)

tabArray.forEach((item) => {
    item.onclick = (e) => {
        tabArray.forEach((tab) => {
            tab.classList.remove('menu-active');
        });
        e.target.classList.add('menu-active');

        contentArray.forEach((c) => {
            c.classList.remove('active');
        });
        document.querySelector(e.currentTarget.dataset.tab).classList.add('active');
    };
});

//======================================================================
//Check input value:-
let findClick = document.getElementById('find-click'),
    userInput = document.getElementById('user-box'),
    dateInput = document.getElementById('date-box'),
    timeInput = document.getElementById('time-box'),
    countInput = document.getElementById('user-count'),
    errorBox = document.querySelector('#error'),
    errorContact = document.querySelector('.error'),
    massageClick = document.getElementById('massage-click'),
    userName = document.getElementById('user-name'),
    emailName = document.getElementById('email-name'),
    textArea = document.getElementById('text-area');

findClick.onclick = (e) => {
    e.preventDefault();
    checkInput();
}

function checkInput(){
    const userValue = userInput.value.trim(); 
    const dateValue = dateInput.value.trim();
    const timeValue = timeInput.value.trim();
    const countValue = countInput.value.trim();


    //(show - hide) error
    errorBox.style.display = "block";
    setTimeout(() => {
        errorBox.style.display = "none";
    }, 2000);

    if(userValue === ""){
        //add error massage
        errorBox.innerText = 'please enter your name';
    }else if(dateValue === ""){
        //add error massage
        errorBox.innerText = 'please enter date of reservation';
    }else if(timeValue === ""){
        //add error massage
        errorBox.innerText = 'please enter your time';
    }else if(countValue === ""){
        //add error massage
        errorBox.innerText = 'please  enter number of persons for this reservation';
    }else{
        //add error massage
        errorBox.innerText = 'Your message has been sent. Thank you!';
    }
}

/* ============= */

massageClick.onclick = (e) => {
    e.preventDefault();
    checkContact();
}

function checkContact(){
    const userNameValue = userName.value.trim();
    const emailNameValue = emailName.value.trim();
    const textAreaValue = textArea.value.trim();

    errorContact.style.display = "block";
    setTimeout(() => {
        errorContact.style.display = "none";
    }, 2000);

    if(userNameValue === ""){
        //add error massage
        errorContact.innerText = 'please enter your name';
    }else if(emailNameValue === ""){
        //add error massage
        errorContact.innerText = 'please enter your email';
    }else if(textAreaValue === ""){
        //add error massage
        errorContact.innerText = 'please write your massage';
    }else{
        //add error massage
        errorContact.innerText = 'Your message has been sent. Thank you!';
    }
}

//======================================================================                     ??? 
//Slider Drag:-
// let dragSlider = document.querySelector('.team-slider'),
//     dragItem = document.querySelector('.team-content'),
//     pressed = false,
//     startx;
    

// dragSlider.addEventListener("mousedown" , (e) => {
//     pressed = true;
//     startx = e.offsetX - dragItem.offsetLeft;
//     dragSlider.style.cursor = 'move';
// });

// dragSlider.addEventListener("mouseup" , () => {
//     dragSlider.style.cursor = 'default';
// });

// window.addEventListener("mouseup" , () => {
//     pressed = false;
// });

// dragSlider.addEventListener("mousemove" , (e) => {
//     if(!pressed) return;
//     e.preventDefault();
//     dragItem.style.left = `${e.offsetX-startx}px`;
//     checkBoundery();
// });


// function checkBoundery(){
//     let outer = dragSlider.getBoundingClientRect();
//     let inner = dragItem.getBoundingClientRect();
    
//     if(parseInt(dragItem.style.left ) > 0){
//         dragItem.style.left = "0px";
//     }else if(inner.right < outer.right){
//         dragItem.style.left = `-${inner.width - outer.width}px`;
//     }
// }

//======================================================================
//Gallery:- 
let galleryIcon = document.querySelectorAll('.gallery-info i'),
    iconArray = Array.from(galleryIcon);

iconArray.forEach((item) => {
    item.onclick = (e) => {
        //create gallerylayer
        let galleryLayer = document.createElement('div');
    
        // add class to gallerylLayer
        galleryLayer.className = "gallery-lay";
    
        //create main div
        let galleryMain = document.createElement('div');
        galleryMain.className = "gallery-main";
    
        //create img
        let imgSource = document.createElement('img');
        imgSource.src = item.dataset.img;
        imgSource.className="img-source";

        //create caption text/icon
        let captionText = document.createElement('p');
        let textContain = document.createTextNode(`Aliquam tincidunt: ${e.currentTarget.dataset.info}`);
        captionText.appendChild(textContain);
        let iconDiv = document.createElement('div');
        iconDiv.className = "caption"
        let captionIcon = document.createElement('i');
        captionIcon.className = "fa fa-times fa-lg close-icon";
        iconDiv.appendChild(captionText);
        iconDiv.appendChild(captionIcon);

        //append icon to main div
        galleryMain.appendChild(iconDiv);

        //append img to main div
        galleryMain.appendChild(imgSource);
    
        //append main div to gallerylayer
        galleryLayer.appendChild(galleryMain);
    
        //append gallerylayer to body
        document.body.appendChild(galleryLayer);

        captionIcon.onclick = () => {
            galleryLayer.remove();
        };
    };
});

//Gallery tab menu:-
let galleryLi = document.querySelectorAll('.gallery-list li'),
    itemArray = Array.from(document.querySelectorAll('.gallery-item'));

galleryLi.forEach((li) => {
    li.addEventListener("click" , switchLiColor);
    li.addEventListener("click" , switchImg);
});


function switchLiColor(){
    galleryLi.forEach((li) => {
        li.classList.remove('gallery-active');
        this.classList.add('gallery-active');
    });
};

function switchImg(){
    itemArray.forEach((item) => {
        item.style.display = "none";
        item.classList.remove('show');
    });
    document.querySelectorAll(this.dataset.gallery).forEach((i) => {
        i.style.display = "block";
        i.classList.add('show');                                     // ???
    });
};




//======================================================================

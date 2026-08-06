const flower_btn = document.getElementById("flower_btn");
const click_sounds = document.querySelectorAll(".sound");
const click_sound = new Audio("/audio/hover_click.mp3");
const rightNavItems = document.getElementById("right_bar_items");

let spin_degree = 0;

function setImageCarousel(imageHolder, prevBtn, nextBtn, caption) {
    const mainImgs = document.querySelectorAll(imageHolder);
    const prevButton = document.querySelector(prevBtn);
    const nextButton = document.querySelector(nextBtn);
    const captionElement = document.querySelectorAll(caption);

    let currentIndex = 0;

    function updateDisplay() {
        for (let i = 0; i < mainImgs.length; i++) {
            mainImgs[i].classList.remove("active");
            captionElement[i].classList.remove("active");
        }
        mainImgs[currentIndex].classList.add("active");
        captionElement[currentIndex].classList.add("active");
    }

    nextButton.addEventListener('click', function() {
        if (currentIndex == mainImgs.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        updateDisplay();
    })

    prevButton.addEventListener('click', function() {
        if (currentIndex == 0) {
            currentIndex = mainImgs.length - 1;
        } else {
            currentIndex -= 1;
        }
        updateDisplay();
    })
}

function playSound(audio) {
    audio.volume = 0.8;
    audio.currentTime = 0;
    audio.play();
}

flower_btn.addEventListener('click', function(event) {
    event.preventDefault();
    let degrees = 360 + spin_degree;
    flower_btn.style.transform = `rotate(${degrees}deg)`;
    spin_degree += 360

    rightNavItems.classList.toggle("open")
})

click_sounds.forEach(element => {
    element.addEventListener("mouseenter", function() {
        playSound(click_sound);
    });
    element.addEventListener("click", function() {
        playSound(click_sound);
    })
});

setImageCarousel("#main_img_holder img", "#main_prevBtn", "#main_nextBtn", "#main_img_holder figcaption");
setImageCarousel("#album_cover img", "#main_prevBtn", "#main_nextBtn", "#album_cover figcaption");

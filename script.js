const flower_btn = document.getElementById("flower_btn");
const click_sounds = document.querySelectorAll(".sound");
const click_sound = new Audio("../audio/hover_click.mp3");
const rightNavItems = document.getElementById("right_bar_items");

const searchInput = document.getElementById("search_input");
const suggestionBox = document.getElementById("suggestion_box");

const information_box = document.querySelector(".information");
const lyrical_content = document.querySelector(".lyrical_content");
const source_box = document.querySelector(".source_content");

const song_cover = document.querySelector("#song-cover");

const info_button = document.getElementById("info-btn");
const lyric_button = document.getElementById("lyric-btn");
const video_button = document.getElementById("listen-btn");
const src_button = document.getElementById("sources-btn")

let spin_degree = 0;
let songs = [];
const songDivs = [information_box, lyrical_content, source_box];

function setImageCarousel(imageHolder, prevBtn, nextBtn, caption) {
    const mainImgs = document.querySelectorAll(imageHolder);
    const prevButton = document.querySelector(prevBtn);
    const nextButton = document.querySelector(nextBtn);
    const captionElement = document.querySelectorAll(caption);

    let currentIndex = 0;

    if (mainImgs.length === 0) {
        return;
    }

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

setImageCarousel("#main_img_holder img", "#main_prevBtn", "#main_nextBtn", "#main_img_holder figcaption");
setImageCarousel("#album_cover img", "#main_prevBtn", "#main_nextBtn", "#album_cover figcaption");


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

function lyrics (lyric) {
    let lyric_content = lyric;
    return lyric_content.split("\n").map(function(line) {
        line = line.trim();
        if (line == "") {
            return "<br>";
        }

        if (line.startsWith("[") && line.endsWith("]")) {
            return `<h2>${line}</h2>`;
        }

        return `<p>${line}</p>`;
    }).join("");
}

fetch("songs.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        songs = data

        const params = new URLSearchParams(window.location.search);
        const songId = params.get("id");

        const song = songs.find(function(music) {
            return music.id === songId
        })

        information_box.innerHTML = `<p><span class="inf">Song: </span>${song["song-name"]}</p>
                                    <br>
                                    <p><span class="inf">Album: </span>${song["album"]}</p>
                                    <br>
                                    <p><span class="inf">Tracklist Position: </span>${song["tracklist-number"]}</p>
                                    <br>
                                    <p><span class="inf">Duration: </span>${song["duration"]}</p>
                                    <br>
                                    <p><span class="inf">Release Year: </span>${song["release-year"]}</p>
                                    <br>
                                    <p><span class="inf">Genre: </span>${song["genre"]}</p>
                                    <br>
                                    <p><span class="inf">Total Streams: </span>${song["streams"]}</p>
                                    <br>
                                    <p><span class="inf">Label: </span>${song["label"]}</p>
                                    <br>
                                    <p><span class="inf">Songwriters: </span>${song["songwriters"]}</p>
                                    <br>
                                    <p><span class="inf">Producers: </span>${song["producers"]}</p>`
        
        source_box.innerHTML = `<p>Lyrics + Information Sourced from: <a href="${song["info-src"]}" target="_blank">${song["info-src"]}</a></p>
                                <p>Streams Sourced from: <a href="https://kworb.net/spotify/artist/66CXWjxzNUsdJxJ2JdwvnR_songs.html" target="_blank">https://kworb.net/spotify/artist/66CXWjxzNUsdJxJ2JdwvnR_songs.html</a></p>
                                <p>Image Sourced from: <a href="${song["image"]}" target="_blank">${song["image"]}</a></p>
                                <p>font "Karrilee" obtained from <a href="https://www.onlinewebfonts.com/icon"> svg icons</a> is licensed by CC BY 4.0</p>`

        lyrical_content.innerHTML = lyrics(song["lyrics"]);
        song_cover.src = song["image"]
        video_button.href = song["video-id"]
    });

searchInput.addEventListener("input", function() {
    const typed = searchInput.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (typed === "") {
        return;
    }

    const matches = songs.filter(function(song) {
        return song["song-name"].toLowerCase().includes(typed);
    }).slice(0, 5);

    matches.forEach(function(song) {
        const suggestion = document.createElement("div")
        suggestion.textContent = song["song-name"]
        suggestion.addEventListener('click', function() {
            window.location.href = song["url"]
        })
        suggestionBox.appendChild(suggestion);
    })

})

lyric_button.addEventListener('click', function() {

    for (let i = 0; i < songDivs.length; i++) {
        songDivs[i].classList.remove("show");
    }

    lyrical_content.classList.add("show")
})

info_button.addEventListener('click', function() {

    for (let i = 0; i < songDivs.length; i++) {
        songDivs[i].classList.remove("show");
    }

    information_box.classList.add("show")
})

src_button.addEventListener('click', function() {

    for (let i = 0; i < songDivs.length; i++) {
        songDivs[i].classList.remove("show");
    }

    source_box.classList.add("show")
})


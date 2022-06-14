'use strict';

const music = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const forwardBtn = document.getElementById('forward');
const img = document.getElementById('img');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');



const musicObj = [

    {
        image: 'img/jacinto-1.jpg',
        music: 'music/jacinto-1.mp3',
        artist: 'Jacinto Design',
        displayName: 'Electric Chill Machine'
    }, {
        image: 'img/jacinto-2.jpg',
        music: 'music/jacinto-2.mp3',
        artist: 'Jacinto Design',
        displayName: 'Seven Nation Army (Remix)'
    }, {
        image: 'img/jacinto-3.jpg',
        music: 'music/jacinto-3.mp3',
        artist: 'Jacinto Design',
        displayName: 'Goodnight, Disco Queen'
    }, {
        image: 'img/metric-1.jpg',
        music: 'music/metric-1.mp3',
        artist: 'Metric/Jacinto Design',
        displayName: 'Front Row (Remix)'
    },

];

const playMusic = function () {
    if (music.paused === true) {
        music.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        music.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');

    }
};

let i = 0;

const setSong = function (i) {
    img.src = musicObj[i].image;
    music.src = musicObj[i].music;
    artist.textContent = musicObj[i].artist;
    title.textContent = musicObj[i].displayName;
};

const nextTrack = function () {
    progress.style.width = '0%';
    const paused = music.paused;
    i++;

    if (i < musicObj.length) {
        setSong(i);
        if (!paused) music.play();
    }

    if (i === musicObj.length) {
        i = 0;
        setSong(i);
        if (!paused) music.play();
    }
};

const prevTrack = function (e) {
    progress.style.width = '0%';

    if ((music.currentTime * 100 / music.duration) > 4) { music.currentTime = 0; }

    else {
        const paused = music.paused;
        i--;

        if (i >= 0) {
            setSong(i);
            if (!paused) music.play();
        }

        if (i < 0) {
            i = musicObj.length - 1;
            setSong(i);
            if (!paused) music.play();
        }
    }
};

const updateProgressBar = function (e) {

    const paused = music.paused;
    const { duration, currentTime } = e.srcElement;


    if (!paused && currentTime > 0) {
        progress.style.width = `${currentTime * 100 / duration}%`;
        const durationMinutes = Math.floor(duration / 60);

        const durationSeconds = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : '0' + Math.floor(duration % 60);

        const curMinutes = Math.floor(currentTime / 60);

        const curSeconds = Math.floor(currentTime % 60) >= 10 ? Math.floor(currentTime % 60) : '0' + Math.floor(currentTime % 60);

        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        currentTimeEl.textContent = `${curMinutes}:${curSeconds}`;

    }



};

const setProgressBar = function (e) {

    music.currentTime = (e.offsetX) * music.duration / this.clientWidth;
};

playBtn.addEventListener('click', playMusic);
forwardBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', function () {
    nextTrack();
    music.play();
})

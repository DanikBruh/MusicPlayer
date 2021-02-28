let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Глобальные переменные
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Создание тэга audio 
let curr_track = document.createElement('audio');

// Массив объектов (Песня)
let track_list = [
    {
        name: "Butterfly Effect",
        artist: "Travis Scott",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Astroworld_by_Travis_Scott.jpg/220px-Astroworld_by_Travis_Scott.jpg",
        path: "butterfly-effect.mp3"
    },
    {
        name: "Yea Yea",
        artist: "Pop Smoke",
        image: "https://media.npr.org/assets/img/2020/07/02/bw_rose_cover_sq-ebcb27b1b61edf014a164e3544ebc7f1d9904788.png",
        path: "yea-yea.mp3"
    },
    {
        name: "Wet Dreamz",
        artist: "J Cole",
        image: "https://images.genius.com/2f88c0a52697a42d3d0fb1e3276d2411.640x640x1.jpg",
        path: "wet-dreamz.mp3",
    },
    {
        name: "One Dance",
        artist: "Drake",
        image: "https://cdn52.zvuk.com/pic?type=release&id=4093157&size=500x500&ext=jpg",
        path: "one-dance.mp3",
    }
];

// Смена состояния (остановить или играть), зависит от текущего состояния
function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}
// Остановка музыки
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    // Смена иконки с "остановить" в "играть"
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    // document.body.style.opacity = '0.5';
}
// Играть музыку
function playTrack() {
    curr_track.play();
    isPlaying = true;
    // Смена иконки с "играть" в "остановить" 
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    // document.body.style.opacity = '1';
}
// Смена трэка на предыдущий
function prevTrack() {
    track_index--;
    if(track_index == -1) {
        track_index = track_list.length - 1;
    }
    // Остановка текущего трэка
    pauseTrack();
    // Загрузка предыдущего трэка
    loadTrack(track_index);
}
// Смена трэка на следующий
function nextTrack() {
    track_index++;
    if(track_index == track_list.length) {
        track_index = 0;
    }
    // Загрузка следующего трэка
    loadTrack(track_index);
    // Воспроизведение след трэка
    playTrack();
}

function seekTo() {
    // Calculate the seek position by the 
    // percentage of the seek slider  
    // and get the relative duration to the track 
    seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position 
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the percentage of the volume slider set 
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() { 
    let seekPosition = 0; 
    
    // Check if the current track duration is a legible number 
    if (!isNaN(curr_track.duration)) { 
      seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
      seek_slider.value = seekPosition; 
    
      // Calculate the time left and the total duration 
      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
      // Add a zero to the single digit time values 
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
      // Display the updated duration 
      curr_time.textContent = currentMinutes + ":" + currentSeconds; 
      total_duration.textContent = durationMinutes + ":" + durationSeconds; 
    } 
  } 

// Рандомный цвет заднего фона
function randomBackgroundColor() {
    // Получаем рандомные числа в диапазоне от 64 до 256 (для более ярких цветов)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Объединяем цвета и получаем rgb цвет
    let bgColor = `rgb(${red},${green},${blue})`;

    // Смена заднего фона
    document.body.style.background = bgColor;
}

// Functiom to reset all values to their default 
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function loadTrack(track_index) {
    // Очистка предыдущего таймера (интервала)
    clearInterval(updateTimer);
    resetValues();

    // Загрузка нового трэка
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Обновление обложки, названия и исполнителя
    track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = `PLAYING ${track_index + 1} OF ${track_list.length}`;

    // Обновление интервала времени
    updateTimer = setInterval(seekUpdate, 1000);

    // Смена на следующий трэк, если текущий закончился
    curr_track.addEventListener("ended", nextTrack);

    // меняем цвет заднего фона
    randomBackgroundColor();
}

// Загрузка первого трэка
loadTrack(track_index); 
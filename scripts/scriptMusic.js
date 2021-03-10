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

// Создание тэга <audio> 
let curr_track = document.createElement('audio');

// Класс "Трэк"
class Track {
    constructor(name, artist, image, path) {
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.path = path;
    }
}

// Массив объектов (Трэк)
let track_list = [];
// Добавление трэков
track_list.push(new Track("One Dance", "Drake", "images/one-dance.jpg", "songs/one-dance.mp3"));
track_list.push(new Track("Redbone", "Childish Gambino", "images/redbone.jpg", "songs/redbone.mp3"));
track_list.push(new Track("Somebody That I Used To Know", "Gotye feat. Kimbra", "images/somebody-that-i-used-to-know.jpg", "songs/somebody-that-i-used-to-know.mp3"));
track_list.push(new Track("Redbone That I Used To Know", "Childish Gotye", "images/redbone-that-i-used-to-know.jpg", "songs/redbone-used-to-know.mp3"));
track_list.push(new Track("Wet Dreamz", "J Cole", "images/wet-dreamz.jpg", "songs/wet-dreamz.mp3"));
track_list.push(new Track("Butterfly Effect", "Travis Scott", "images/astroworld.jpg", "songs/butterfly-effect.mp3"));
track_list.push(new Track('Krabby Step', 'Swae Lee | Tyga | Lil Mosey', 'images/krabby-step.jpg', 'songs/krabby-step.mp3'));

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
// Установка момента трэка
function seekTo() {
    // Вычисление позиции элемента <input type="range"> по проценту ползунка
    let seekto = curr_track.duration * (seek_slider.value / 100);
    // Установка текущей позиции трека на рассчитанную позицию поиска
    curr_track.currentTime = seekto;
}
// Установка громкости в соответствии с установленным ползунком громкости в процентах.
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
// Обновление счетчика времени
function seekUpdate() { 
    let seekPosition = 0; 
    
    // Проверка, является ли текущая длительность трека корректным числом
    if (!isNaN(curr_track.duration)) { 
      seekPosition = curr_track.currentTime * (100 / curr_track.duration); 
      seek_slider.value = seekPosition; 
    
      // Вычисление прошедшего и полного времени трэка
      let currentMinutes = Math.floor(curr_track.currentTime / 60); 
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60); 
      let durationMinutes = Math.floor(curr_track.duration / 60); 
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60); 
    
      // Добавление нуля однозначным числам
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
    
      // Отображение времени
      curr_time.innerText = currentMinutes + ":" + currentSeconds; 
      total_duration.innerText = durationMinutes + ":" + durationSeconds; 
    } 
} 
// Рандомный цвет заднего фона
function randomBackgroundColor() {
    // Получаем рандомные числа в диапазоне от 90 до 256 (для более ярких цветов)
    let red = Math.floor(Math.random() * 256) + 90;
    let green = Math.floor(Math.random() * 256) + 90;
    let blue = Math.floor(Math.random() * 256) + 90;

    // Объединяем цвета и получаем rgb цвет
    let bgColor = `rgb(${red},${green},${blue})`;
    console.log('bgColor: ', bgColor);

    // Смена заднего фона
    document.body.style.background = bgColor;
}
// Сброс времени
function resetValues() {
    curr_time.innerText = "00:00";
    total_duration.innerText = "00:00";
    seek_slider.value = 0;
}
// Загрузка трэка
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

    // Установка громкости
    setVolume();

    // Смена на следующий трэк, если текущий закончился
    curr_track.addEventListener("ended", nextTrack);

    // меняем цвет заднего фона
    randomBackgroundColor();
}

// Загрузка первого трэка
loadTrack(track_index); 
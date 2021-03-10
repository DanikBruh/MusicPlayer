let showHideButton = document.getElementById('showHideButton');
let changeImageButton = document.getElementById('changeImageButton');

let videos = document.querySelector('.videos');
let heroImage = document.querySelector('.hero-image');

// Видео изначально скрыты 
let videosAreShown = false;
// Картинка изначально стандартная
let defaultImage = true;


// При загрузке всей страницы
window.onload = () => {
    // При нажатии на кнопку для отображения видео
    showHideButton.onclick = () => {
        if(!videosAreShown) {
            showHideButton.innerHTML = 'Скрыть видео';
            videosAreShown = true;
            // Показываем блок с видео
            videos.style.display = 'flex';
        } else {
            showHideButton.innerHTML = 'Показать видео';
            videosAreShown = false;
            // Скрываем блок с видео
            videos.style.display = 'none';
        }
    }

    // При нажатии на кнопку для смены картинки
    changeImageButton.onclick = () => {
        if(!defaultImage) {
            defaultImage = true;
            // Меняем картинку
            heroImage.style.backgroundImage = 'url("images/hero-image.jpg")';
        } else {
            defaultImage = false;
            // Меняем картинку
            heroImage.style.backgroundImage = 'url("images/hero-image-2.jpg")';
        }
    }
}
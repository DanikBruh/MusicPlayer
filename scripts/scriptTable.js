let tbody = document.querySelector('table tbody');

// При нажатии на таблицу срабатывает функция
tbody.onclick = paintCell;

// Окрашивает задний фон клетки в рандомный цвет
function paintCell(e) {
    // Если кликнули на клетку
    if (e.target.nodeName == 'TH') {
        // Получаем рандомные числа в диапазоне от 64 до 256 (для более ярких цветов)
        let red = Math.floor(Math.random() * 256) + 64;
        let green = Math.floor(Math.random() * 256) + 64;
        let blue = Math.floor(Math.random() * 256) + 64;

        // Объединяем цвета и получаем rgb цвет
        let bgColor = `rgb(${red},${green},${blue})`;
        // Окрашиваем задний фон клетки
        e.target.style.background = bgColor;
    }
}
const images = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg'
];

let currentIndex = 0;

function changeBackground() {
    document.body.style.backgroundImage = `url(${images[currentIndex]})`;

    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(changeBackground, 15000);

window.onload = changeBackground;

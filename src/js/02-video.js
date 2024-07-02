import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Funcție pentru salvarea timpului curent de redare în local storage
const saveCurrentTime = throttle((data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
}, 1000);

// Adaugă evenimentul timeupdate pentru a actualiza timpul de redare
player.on('timeupdate', saveCurrentTime);

// La reîncărcarea paginii, setează timpul de redare la valoarea salvată
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
    player.setCurrentTime(savedTime).catch((error) => {
        console.error('Error setting current time:', error);
    });
}


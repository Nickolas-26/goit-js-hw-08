import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const KEY_NAME = 'videoplayer-current-time';

function dataTime({ seconds }) {
  console.log(seconds);
  localStorage.setItem(KEY_NAME, seconds);
}

player.on('timeupdate', throttle(dataTime, 1000));

function start() {
  const data = localStorage.getItem(KEY_NAME);
  if (!data) return;
  player
    .setCurrentTime(data)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      console.log(error);
    });
}

start();

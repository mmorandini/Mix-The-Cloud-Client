angular
.module('mtcApp')
.controller('ConsoleCtrl', ConsoleCtrl);


ConsoleCtrl.$inject = [];
function ConsoleCtrl(){

  var PlayerBElement = document.getElementById('vineVideo');
  var PlayerAElement = document.getElementById('instVideo');
  var PlayerAGain;
  var PlayerBGain;
  // window.AudioContext = window.AudioContext||window.webkitAudioContext;
  // var context = new AudioContext();

  function initCrossfade(){
    // vineVideoElement.play();
    // instVideoElement.play();
    var PlayerB = context.createMediaElementSource(PlayerBElement);
    var PlayerA = context.createMediaElementSource(PlayerAElement);

    PlayerAGain = context.createGainNode();
    PlayerBGain = context.createGainNode();

    PlayerB.connect(PlayerBGain);
    PlayerA.connect(PlayerAGain);

    PlayerAGain.connect(context.destination);
    PlayerBGain.connect(context.destination);
  }

  var updateVolumes = function(mouseEvent){
    var range = (PlayerBElement.offsetLeft + PlayerBElement.offsetWidth) - PlayerAElement.offsetLeft;
    console.log('range: ',range);

    var crossfadePos = parseFloat(mouseEvent.clientX-(PlayerBElement.offsetLeft + PlayerBElement.offsetWidth));
    crossfadePos = Math.max(0, Math.min(crossfadePos, range))/range;
    console.log('cross: ',crossfadePos);
    PlayerBGain.gain = (crossfadePos*-1)+1;
    PlayerAGain.gain = crossfadePos;
  };


  initCrossfade();

  onmousemove = updateVolumes;
}

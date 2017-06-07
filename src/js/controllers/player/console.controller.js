// angular
// .module('mtcApp')
// .controller('ConsoleCtrl', ConsoleCtrl);
//
//
// ConsoleCtrl.$inject = [];
// function ConsoleCtrl(){
//   ////Changed to AudioB
//   var AudioB = document.getElementById('vineVideo');
//   /////
//   /////Changed to AudioA
//   var AudioA = document.getElementById('instVideo');
//   ////
//   var PlayerAGain;
//   var PlayerBGain;
//   // window.AudioContext = window.AudioContext||window.webkitAudioContext;
//   // var context = new AudioContext();
//
//   function initCrossfade(){
//     // vineVideoElement.play();
//     // instVideoElement.play();
//     var PlayerB =  context.createMediaElementSource(AudioB);
//     var PlayerA =  context.createMediaElementSource(AudioA);
//
//     PlayerAGain = context.createGainNode();
//     PlayerBGain = context.createGainNode();
//
//     PlayerB.connect(PlayerBGain);
//     PlayerA.connect(PlayerAGain);
//
//     PlayerAGain.connect(context.destination);
//     PlayerBGain.connect(context.destination);
//   }
//
//   var updateVolumes = function(mouseEvent){
//     var range = (AudioB.offsetLeft + AudioB.offsetWidth) - AudioA.offsetLeft;
//     console.log('range: ',range);
//
//     var crossfadePos = parseFloat(mouseEvent.clientX-(AudioB.offsetLeft + AudioB.offsetWidth));
//     crossfadePos = Math.max(0, Math.min(crossfadePos, range))/range;
//     console.log('cross: ',crossfadePos);
//     PlayerBGain.gain = (crossfadePos*-1)+1;
//     PlayerAGain.gain = crossfadePos;
//   };
//
//
//   initCrossfade();
//
//   onmousemove = updateVolumes;
// }

angular
.module('mtcApp')
.controller('PlayerCtrl', PlayerCtrl);


PlayerCtrl.$inject = ['$scope', '$rootScope'];
function PlayerCtrl($scope, $rootScope){

  const context     = new AudioContext();
  const PlayerGainA = context.createGain();
  const PlayerGainB = context.createGain();

  ///clicking on the A button of the track startPlayerA(track) is called and the track is passed as argument
  $scope.startPlayerA = function(track){
    const id     = track.id;
    // const trackA = track;
    const url    = `http://api.soundcloud.com/tracks/${id}/stream` +
    '?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM';

    var audioA   = new Audio(), PlayerA;

    audioA.src = url;
    audioA.crossOrigin = 'anonymous';
    PlayerA = context.createMediaElementSource(audioA);
    console.log(audioA);
    
    PlayerA.connect(PlayerGainA);
    PlayerA.connect(context.destination);
    

    // Analyzer.getFile(audio.src);
    $('#playA').on('click', function(){
      PlayerA.mediaElement.play();
    });
    $('#pauseA').on('click', function(){
      PlayerA.mediaElement.pause();
    });
    $rootScope.audioA = PlayerA.mediaElement;
  };

  ///clicking on the B button of the track startPlayerB(track) is called and the track is passed as argument
  $scope.startPlayerB = function(track){
    const id     = track.id;
    // const trackB = track;
    const url    = `http://api.soundcloud.com/tracks/${id}/stream` +
    '?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM';
    console.log(url);

    var audioB   = new Audio(), PlayerB;
    // console.log('this is it', audioB);
    // console.log(context);

    audioB.src = url;
    audioB.crossOrigin = 'anonymous';
    PlayerB = context.createMediaElementSource(audioB);
    
    PlayerB.connect(PlayerGainB);
    PlayerB.connect(context.destination);


    $('#playB').on('click', function(){
      PlayerB.mediaElement.play();
      // console.log('PlayerB.mediaElement: ',PlayerB.mediaElement);
    });
    $('#pauseB').on('click', function(){
      PlayerB.mediaElement.pause();
    });
    $rootScope.audioB = PlayerB.mediaElement;
  };

  function crossFade(){
    const crossVal = document.getElementById('crossfade').value;

    console.log('crossVal: ', crossVal);
    console.log('gainVal playerA: ', PlayerGainA.gain.value);
    console.log('gainVal playerB: ', PlayerGainB.gain.value);

    if (crossVal < 0.5){
      PlayerGainB.gain.value = 1 - (2 * (0.5 - crossVal ));
    }else if(crossVal === 0){
      PlayerGainB.gain.value = 0;
    }else if(crossVal<1){
      PlayerGainA.gain.value = 1 - (2 * (crossVal - 0.5 ));
    }else if(crossVal===1){
      PlayerGainA.gain.value = 0;
    }
  }
  $('#crossfade').on('input', crossFade);
}

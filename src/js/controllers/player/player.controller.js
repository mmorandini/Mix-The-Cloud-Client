angular
.module('mtcApp')
.controller('PlayerCtrl', PlayerCtrl);


PlayerCtrl.$inject = ['$scope', 'Analyzer'];
function PlayerCtrl($scope, Analyzer){

  $scope.startPlayerA = function(track){
    const id = track.id;
    const url = `http://api.soundcloud.com/tracks/${id}/stream` +
    '?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM';
    var context = new AudioContext(),
      audio = new Audio(),
      source;

    audio.src = url;
    audio.crossOrigin = 'anonymous';
    source = context.createMediaElementSource(audio);
    source.connect(context.destination);
    console.log(source.mediaElement);
    // Analyzer.getPeaksAtThreshold(source.mediaElement, 10);



    // Analyzer.getFile(audio.src);


    $('#playA').on('click', function(){
      source.mediaElement.play();
    });
    $('#pauseA').on('click', function(){
      source.mediaElement.pause();
    });
  };


  $scope.startPlayerB = function(track){
    const id = track.id;

    const url = `http://api.soundcloud.com/tracks/${id}/stream` +
    '?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM';
    console.log(url);
    var context = new AudioContext(),
      audio = new Audio(),
      source;

    audio.src = url;
    audio.crossOrigin = 'anonymous';
    source = context.createMediaElementSource(audio);
    source.connect(context.destination);

    $('#playB').on('click', function(){
      source.mediaElement.play();
      console.log('source.mediaElement: ',source.mediaElement);
    });
    $('#pauseB').on('click', function(){
      source.mediaElement.pause();
    });
  };
}

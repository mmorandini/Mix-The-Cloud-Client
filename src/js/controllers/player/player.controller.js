angular
.module('mtcApp')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['$scope'];
function PlayerCtrl($scope){

  $scope.startPlayerA = function(track){
    const id = track.id;
    console.log(id);
    SC
      .stream(`/tracks/${id}`)
      .then(function(player){
        $('#playA').on('click', function(){
          player.play();
        });
        $('#pauseA').on('click', function(){
          player.pause();
        });
      });
  };

  $scope.startPlayerB = function(track){
    const id = track.id;
    console.log(id);
    SC
      .stream(`/tracks/${id}`)
      .then(function(player){
        $('#playB').on('click', function(){
          player.play();
        });
        $('#pauseB').on('click', function(){
          player.pause();
        });
      });
  };
}

//

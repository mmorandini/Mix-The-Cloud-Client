angular
.module('mtcApp')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['$scope'];
function PlayerCtrl($scope){

  $scope.songs = [];

  SC
  .initialize({
    client_id: 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM'
  });

  SC
  .get('/tracks', {
    genres: 'techno',
    limit: 20
  })
  .then(function(tracks) {
    console.log(tracks);

    const id = tracks[0].id;
    SC
      .stream(`/tracks/${id}`)
      .then(function(player){
        $('#play').on('click', function(){
          player.play();
        });
        $('#stop').on('click', function(){
          player.pause();
        });
      });

  });
}

//

angular
.module('mtcApp')
.controller('PlayerCtrl', PlayerCtrl);

PlayerCtrl.$inject = ['$scope', 'SC'];
function PlayerCtrl($scope, SC){

  $scope.songs = [];

  SC.initialize({
    client_id: 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM'

  });

  SC
  .get('http://api.soundcloud.com/tracks/13158665', {
    // limit: 5
  }, function(tracks) {

    for (var i = 0; i < tracks.length; i ++) {
      SC
      .stream( '/tracks/' + tracks[i].id, function( sm_object ){
        var track = {
          id: tracks[i].id,
          title: tracks[i].title,
          artist: tracks[i].genre,
          url: sm_object.url
        };

        $scope.$apply(function () {
          $scope.songs.push(track);
        });
      });
    }
  });
  // {
  //   id: 'one',
  //   title: 'Rain',
  //   url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
  // },
  // {
  //   id: 'two',
  //   title: 'Walking',
  //   url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3'
  // },
  // {
  //   id: 'three',
  //   title: 'Barrlping with Carl (featureblend.com)',
  //   url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
  // },
  // {
  //   id: 'four',
  //   title: 'Angry cow sound?',
  //   url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
  // },
  // {
  //   id: 'five',
  //   title: 'Things that open, close and roll',
  //   url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
  // }

}

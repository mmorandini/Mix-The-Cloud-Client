angular
.module('mtcApp')
.controller('TracksSearchCtrl', TracksSearchCtrl);

function TracksSearchCtrl($scope){
  const vm = this;

  vm.tracksSearch = () => {


    // SC
    // .initialize({
    //   client_id: 'S9C5RLmHrFya8jd9Ci42dsVLIl79rRi1'
    // });

    // find all tracks with the genre 'techno' that have a tempo greater than 120 bpm.
    SC
    .get('/tracks', {
      q: vm.trackFind,
      limit: 50
    })
    .then(function(tracks){
      $scope.tracks = tracks;
      console.log('searchCTRL says: ', $scope.tracks);
    });


  };
}

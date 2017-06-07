angular
.module('mtcApp')
.controller('TracksSearchCtrl', TracksSearchCtrl);

TracksSearchCtrl.$inject = [];
function TracksSearchCtrl(){
  const vm = this;

  vm.tracksSearch = search;

  function search() {
    SC
    .get('/tracks', {
      q: vm.trackFind,
      limit: 200
    })
    .then(function(tracks){
      vm.tracks = tracks;
      
    });
  }
}

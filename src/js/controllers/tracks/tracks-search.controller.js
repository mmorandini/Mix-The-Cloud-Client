angular
.module('mtcApp')
.controller('TracksSearchCtrl', TracksSearchCtrl);

function TracksSearchCtrl(){
  const vm = this;

  vm.tracksSearch = () => {


    SC
    .initialize({
      client_id: 'S9C5RLmHrFya8jd9Ci42dsVLIl79rRi1'
    });

    // find all tracks with the genre 'techno' that have a tempo greater than 120 bpm.
    SC
    .get('/tracks', {
      genres: 'techno',
      limit: 20
    });

  };
}

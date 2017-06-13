angular
  .module('mtcApp')
  .controller('TestCtrl', TestCtrl);

TestCtrl.$inject = ['$http', '$window', '$location', '$rootScope', '$scope', 'ngAudio'];
function TestCtrl($http, $window, $location, $rootScope, $scope, ngAudio) {
  const vm = this;

  $rootScope.$broadcast('showHeader');
  
  vm.deck1             = 'SoundCloud';
  vm.deck2             = 'SoundCloud';
  vm.searchType        = 'SoundCloud';
  vm.searchTypes       = ['Youtube', 'SoundCloud'];
  vm.crossfade         = 50;
  vm.gainA             = 80;
  vm.gainB             = 80;
  vm.titleA            = '';
  vm.titleB            = '';
  vm.playA             = false;
  vm.playB             = false;
  vm.lowpassFilterOn   = false;
  vm.tempoA            = 1;
  vm.tempoB            = 1;


  var soundcloudPlayer1 = WaveSurfer.create({
    container: '#waveformA',
    waveColor: '#009ecb',
    progressColor: 'grey',
    height: '30',
    cursorWidth: '1',
    fillParent: 'false',
    cursorColor: 'white',
    minPxPerSec: '100',
    pixelRatio: '1',
    scrollParent: 'true'
    // hideScrollbar: 'true'

  });
  var soundcloudPlayer2 = WaveSurfer.create({
    container: '#waveformA',
    waveColor: 'lime',
    progressColor: 'grey',
    height: '30',
    cursorWidth: '1',
    fillParent: 'false',
    cursorColor: 'white',
    minPxPerSec: '100',
    pixelRatio: '1',
    scrollParent: 'true'
    // hideScrollbar: 'true'

  });
  var lowpass = soundcloudPlayer1.backend.ac.createBiquadFilter();

  /*

    UI

  */

  vm.search = function search() {
    if (vm.searchType === 'Youtube') {
      searchYoutube(vm.query);
      vm.scrollDown();
      
    } else {
      searchSoundCloud(vm.query);
      vm.scrollDown();
    }
  };


  vm.loadToDeck = function loadToDeck(deck, result) {
    let id;
    if (vm.searchType === 'Youtube') {
      id = result.id.videoId;
      if (deck == 1) {
        vm.deck1 = 'Youtube';
        youtubePlayer1.loadVideoById(id, 5, "large");
        youtubePlayer1.stopVideo();
        // console.log(result);
        vm.titleA = result.snippet.title;

      } else if (deck == 2) {
        vm.deck2 = 'Youtube';
        youtubePlayer2.loadVideoById(id, 5, "large");
        youtubePlayer2.stopVideo(); 
        vm.titleB = result.snippet.title;
      }
    } else {
      if (deck == 1){
        vm.deck1 = 'SoundCloud';
        // youtubePlayer1.stopVideo();
        lowpassFilter();
        id = result.id;
        const url    = `http://api.soundcloud.com/tracks/${id}/stream?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM`;
        // $('#soundcloudPlayer1').attr('src', url );
        soundcloudPlayer1.load(url);
        vm.titleA = result.title;
       

      } else {
        vm.deck2 = 'SoundCloud';
        id = result.id;
        const url    = `http://api.soundcloud.com/tracks/${id}/stream?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM`;
        // $('#soundcloudPlayer2').attr('src', url );
        soundcloudPlayer2.load(url);
        vm.titleB = result.title;
      }
    }
    // Set the base video volume
    fade();
  };

  vm.playDeck1 = () => {
    if (vm.playA === false){

      if (vm.deck1 === 'Youtube') {
        youtubePlayer1.playVideo();
      } else {
        soundcloudPlayer1.play();
      }
      vm.playA = true;
    } else {
      if (vm.deck1 === 'Youtube') {
        youtubePlayer1.pauseVideo();
      } else {
        soundcloudPlayer1.pause();
      }
      vm.playA = false;
    }
  };

  vm.playDeck2 = () => {
    if (vm.playB === false){

      if (vm.deck2 === 'Youtube') {
        youtubePlayer2.playVideo();
      } else {
        soundcloudPlayer2.play();
      }
      vm.playB = true;
    } else {
      if (vm.deck2 === 'Youtube') {
        youtubePlayer2.pauseVideo();
      } else {
        soundcloudPlayer2.pause();
      }
      vm.playB = false;
    }
  };

  /*

  EFFECTS

  */

  vm.lowpassFilter = lowpassFilter;
  function lowpassFilter(){
    $('#addFilter').change(function() {

      console.log('yo');
      if (vm.lowpassFilterOn === false ){
          soundcloudPlayer1.backend.setFilter(lowpass);
          vm.lowpassFilterOn = true;
      } else {
        soundcloudPlayer1.backend.disconnect(lowpass);
        }
    });
  }
  
  

  /*
  
  AUDIO/VIDEO MANIPULATION
    
  */

  vm.setTempoA = setTempoA;
  function setTempoA(){
        soundcloudPlayer1.setPlaybackRate(vm.tempoA);
        console.log('tempo A: ', vm.tempoA);
  }

  vm.setTempoB = setTempoB;
  function setTempoB(){
        soundcloudPlayer2.setPlaybackRate(vm.tempoB);
        console.log('tempo B: ', vm.tempoB);
     }

  vm.setGainA = setGainA;
  function setGainA(){
    if(vm.crossfade > 50){
      if (vm.deck1 === 'Youtube'){
        youtubePlayer1.setVolume(vm.deck1Fade * (vm.gainA / 100));
      }else{
        soundcloudPlayer1.setVolume((vm.deck1Fade * (vm.gainA / 100))/100);
      }
    } else {
      if (vm.deck1 === 'Youtube') {
        youtubePlayer1.setVolume(vm.gainA);
      } else {
        soundcloudPlayer1.setVolume(vm.gainA/100);
      }
    }
  }

  vm.setGainB = setGainB;
  function setGainB(){
    if(vm.crossfade < 50){
      if (vm.deck2 === 'Youtube') {
        youtubePlayer2.setVolume(vm.deck2Fade * (vm.gainB / 100));
      } else {
        soundcloudPlayer2.setVolume((vm.deck2Fade * (vm.gainB / 100))/100);
      }
    }else{
      if (vm.deck2 === 'Youtube'){
        youtubePlayer2.setVolume(vm.gainB);
      }else{
        soundcloudPlayer2.setVolume(vm.gainB/100);
      }
    }
  }


  vm.fade = fade;
  function fade() {
    vm.deck1Fade = 100 - (2 * (vm.crossfade - 50));
    vm.deck2Fade = 100 - (2 * (50 - vm.crossfade));
    
    if(vm.crossfade > 50){
      if (vm.deck1 === 'Youtube') {
        youtubePlayer1.setVolume(vm.deck1Fade * (vm.gainA / 100));
      } else {
        soundcloudPlayer1.setVolume((vm.deck1Fade * (vm.gainA / 100))/100);
      }
    } else {
      if (vm.deck1 === 'Youtube') {
        youtubePlayer1.setVolume(vm.gainA);
      } else {
        soundcloudPlayer1.setVolume(vm.gainA/100);
      }
    }

    if(vm.crossfade < 50){
      if (vm.deck2 === 'Youtube') {
        youtubePlayer2.setVolume(vm.deck2Fade * (vm.gainB / 100));
      } else {
        soundcloudPlayer2.setVolume((vm.deck2Fade * (vm.gainB / 100))/100);
      }
    } else {
      if (vm.deck2 === 'Youtube') {
        youtubePlayer2.setVolume(vm.gainB);
      } else {
        soundcloudPlayer2.setVolume(vm.gainB/100);
      }
    }
  }

  /*

    UTILITIES

  */

  function formatDuration(value){
    value = parseInt(value);
    let hours, minutes, seconds;
    
    if ((value / 3600) > 0){
      hours = parseInt(value / 3600);
    } else {
      hours = 0;
    }

    if ((value / 60) > 0){
      minutes = parseInt((value - (hours*3600)) / 60);
    } else {
      minutes = 0;
    }
  
    seconds = parseInt((value - (hours*3600) - (minutes*60)));
    
    if (hours !== 0){
      return hours + ":" + add0(minutes) + ":" + add0(seconds);   
    } else {
      return add0(minutes) + ":" + add0(seconds);
    }
  }

  /*
    
    Function to change a single number
    e.g. 1 to 01
  
  */
  
  function add0(value){
    if (parseInt(value) < 10) return `0${value}`;
    return value;
  }

  /*
    
    Convert Youtube API Time (ISO 8601 String Video Duration) to Seconds
    e.g. PT1H40M50S -> 6050
    
  */

  

  function youtubeTimeToSec(input){
    const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    let hours = 0, minutes = 0, seconds = 0, totalseconds;
    
    if (reptms.test(input)) {
      var matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
      totalseconds = hours * 3600  + minutes * 60 + seconds;
    }
    return totalseconds;
  }


  /*

    YOUTUBE

  */

  const YOUTUBE_KEY = 'AIzaSyB9mOZ5J4v7g8eW5WJAiFai_ZcmIhAnmoI';
  // GLOBAL VARIABLE
  let youtubePlayer1, youtubePlayer2; 

  initYoutube();

  function initYoutube() {
    console.log('LOADING YOUTUBE STUFF');
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() {
    console.log('onYouTubeIframeAPIReady');
    // The first arguement 'player' here is the ID of the element to add a player
    youtubePlayer1 = new YT.Player('youtubePlayer1', {
      height: '300',
      width: '300',
      videoId: '',
      
    });

    youtubePlayer2 = new YT.Player('youtubePlayer2', {
      height: '300',
      width: '300',
      videoId: '',

    });
  }

  $window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  

  function searchYoutube(query) {
    const maxResults = 20;
    // Remove all spaces and add a '+'
    query = encodeURIComponent(query.replace(/ /gi, '+'));
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${YOUTUBE_KEY}`;
    $http
    .get(url)
    .then(response => {
      vm.results = response.data.items;
      console.log('searchYoutube says: ', vm.results);
    }, err => {
      console.error(err);
    });
  }


  // const trackId = '5rrgY9x1Hts';

  // getYoutubeVideoInformation(trackId)

  function getYoutubeVideoInformation(trackId) {
    // PART IS (optional) default: 'id,snippet,contentDetails,statistics'
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${encodeURIComponent(trackId)}&key=${YOUTUBE_KEY}&part=snippet,contentDetails`;
    $http
    .get(url)
    .then(response => {
      console.log('getYoutubeVideoInformation', response);
    }, err => {
      console.error(err);
    });
  }


  /*

    SOUNDCLOUD

  */

  const SOUNDCLOUD_KEY = 'uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM';

  // CORS issue here!
  // searchSoundCloud('Villalobos mix');

  function searchSoundCloud(query) {
    const maxResults = 50;
    query = encodeURIComponent(query.replace(/ /gi, '+'));
    const url = `https://api.soundcloud.com/tracks.json?client_id=${SOUNDCLOUD_KEY}&q=${query}&limit=${maxResults}&linked_partitioning=1`;
    $http
    .get(url)
    .then(response => {
      console.log('searchSoundCloud', response);
      vm.results = response.data.collection;
    }, err => {
      console.error(err);
    });
  }

  // const trackId = '90787841'
  // getSoundCloudInformation(trackId)


  function getSoundCloudInformation(trackId) {
    const url = `https://api.soundcloud.com/tracks/${encodeURIComponent(trackId)}?client_id=${SOUNDCLOUD_KEY}`;
    $http
    .get(url)
    .then(data => {
      console.log('getSoundCloudInformation', data);
    }, err => {
      console.error(err);
    });
  }

  vm.scrollDown = scrollDown;
  function scrollDown (){
    window.scrollBy(0, 200);
  }
}

/// SEARCH SCROLL DOWN

  
























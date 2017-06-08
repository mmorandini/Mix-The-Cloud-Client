angular
  .module('mtcApp')
  .controller('TestCtrl', TestCtrl);

TestCtrl.$inject = ['$http', '$window'];
function TestCtrl($http, $window) {
  const vm = this;
  vm.searchType = 'SoundCloud';
  vm.searchTypes = ['Youtube', 'SoundCloud'];
  /*

    UI

  */

  vm.search = function search() {
    if (vm.searchType === 'Youtube') {
      searchYoutube(vm.query);
    } else {
      searchSoundCloud(vm.query);
    }
    controls();
  };


  vm.loadToDeck = function loadToDeck(deck, result) {
    let id;
    if (vm.searchType === 'Youtube') {
      id = result.id.videoId;
      if (deck == 1) {
        youtubePlayer1.loadVideoById(id, 5, "large");
        youtubePlayer1.stopVideo();
      } else {
        youtubePlayer2.loadVideoById(id, 5, "large");
        youtubePlayer2.stopVideo();
      }
    } else {
      if (deck == 1){
        id = result.id;
      const url    = `http://api.soundcloud.com/tracks/${id}/stream?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM`;
      $('#soundcloudPlayer1').attr('src', url );
      // soundcloudPlayer1.src = url;
      // soundcloudPlayer1.crossOrigin = 'anonymous';
      } else {
        id = result.id;
      const url    = `http://api.soundcloud.com/tracks/${id}/stream?client_id=uuWqQ2079j0Dp2awBVJwpa3q7RnBdMiM`;
      $('#soundcloudPlayer2').attr('src', url );
      }
      
    }
  };

  function controls(){
    $('#playA').on('click', () => {
       soundcloudPlayer1.play();
       youtubePlayer1.playVideo();
    });
    $('#pauseA').on('click', () => {
       soundcloudPlayer1.pause();
       youtubePlayer1.pauseVideo();
    });
    $('#playB').on('click', () => {
       soundcloudPlayer2.play();
       youtubePlayer2.playVideo();
    });
    $('#pauseB').on('click', () => {
       soundcloudPlayer2.pause();
       youtubePlayer2.pauseVideo();
    });
  }
  /*
  
  AUDIO/VIDEO MANIPULATION
    
  */

  // let context   = new AudioContext();

  // // let soundcloudPlayer1 = new Audio();


  // let gainNodeA = context.createGain();
  // let gainNodeB = context.createGain();
  
  // let sourceA   = context.createMediaElementSource(soundcloudPlayer1);
  // let sourceB   = context.createMediaElementSource(soundcloudPlayer2);

  // sourceA.connect(gainNodeA);
  // sourceB.connect(gainNodeB);

  // $('#playA').on('click', function(){
  //     sourceA.mediaElement.play();
  //   });
  // $('#pauseA').on('click', function(){
  //     sourceA.mediaElement.pause();
  //   });

  // $('#playB').on('click', function(){
  //     sourceB.mediaElement.play();
  //   });
  // $('#pauseB').on('click', function(){
  //     sourceB.mediaElement.pause();
  //   });



  
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

  // const formattedTime = youtubeTimeToSec('PT1H40M50S');
  // console.log(formattedTime);

  // console.log(formatDuration(formattedTime))

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
      height: '200',
      width: '200',
      videoId: '',
      
      // events: {
      // 'autoplay': false
      //   'onReady': onPlayerReady,
      //   'onStateChange': onPlayerStateChange
      // }
    });

    youtubePlayer2 = new YT.Player('youtubePlayer2', {
      height: '200',
      width: '200',
      videoId: '',

      
      // events: {
      //   'autoplay': false
      //   'onReady': onPlayerReady,
      //   'onStateChange': onPlayerStateChange
      // }
    });
  }

  $window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  // // 4. The API will call this function when the video player is ready.
  // function onPlayerReady(event) {
  //   event.target.playVideo();
  // }

  // $window.onPlayerReady = onPlayerReady;

  // // 5. The API calls this function when the player's state changes.
  // //    The function indicates that when playing a video (state=1),
  // //    the player should play for six seconds and then stop.
  // var done = false;
  // function onPlayerStateChange(event) {
  //   if (event.data == YT.PlayerState.PLAYING && !done) {
  //     setTimeout(stopVideo, 6000);
  //     done = true;
  //   }
  // }
  
  // $window.onPlayerStateChange = onPlayerStateChange;

  // function stopVideo() {
  //   player.stopVideo();
  // }

  // $window.stopVideo = stopVideo;

  // searchYoutube('Bonobo');


  function searchYoutube(query) {
    const maxResults = 20;
    // Remove all spaces and add a '+'
    query = encodeURIComponent(query.replace(/ /gi, '+'));
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${YOUTUBE_KEY}`;
    $http
    .get(url)
    .then(response => {
      console.log(response);
      vm.results = response.data.items;
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

  // - https://developers.google.com/youtube/iframe_api_reference
  // player.loadVideoById({'videoId': 'bHQqvYy5KYo',
  //              'startSeconds': 5,
  //              'endSeconds': 60,
  //              'suggestedQuality': 'large'})
  // player.setVolume(volume:Number) (0 and 100)

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

}


























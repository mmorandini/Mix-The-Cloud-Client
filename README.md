 <img src="https://raw.githubusercontent.com/mmorandini/wdi-project-4-client/master/src/images/home.png">
 
 <h2>Genesis</h2>
 <p>I've always been involved in djing and electronic music in general. </p>
 <p>The Idea of building <strong>Mix the cloud</strong> has been sitting at the back of my mind for at least six or seven years.</p>
 <p>I was in my early twenties when house parties started being increasingly frequent in my week-end routine; but in a situation where you don't have your own music with you, having to switch from a browser window to another can get annoying. I thought I would have liked to build something that could solve my issue, but I didn't have skills at the time, so I just kept daydreaming on it for a while, until I took the WDI course at GA, which gave me the skills I needed.</p>
 <p><strong>Mix the cloud</strong> has been my capstone project for the course, and even though there's still a lot to do, I think is a reasonably good and fun product, having spent hours playing with it myself. </p>
<p> Keep reading this readme for a more detailed breakdown of the development process.</p>
  
 <h2>Planning</h2>
 <p>Having chosen the topic for my project, I then started the planning bit. I therefore decided what I had to do first, in order to get a decent product to build on.</p>
<p>After setting up the environment for the app, I built the API for the back-end, which is build on <strong>Ruby on Rails</strong>. Because of the fact that I did not need a complex structure for it, once I got the users' authentication working, I started moving onto the front-end, for which I've used AngularJS, and defined a basic MVP, which can be summarised as follows:  </p>
<ul> 
<li>Find out how to search for tracks in the SoundCloud API.</li>
<li>Find out how to stream those tracks the search has produced as results.</li>
<li>Find a way to change the playback speed of a track while is played. </li>
<li>Create a crossfader that could fade the volume in and out between two different players that are playing simultanously.</li>
<li>Add sound effects.</li>
<li>Design a logo.</li>
</ul>
 <p>Those who have spent sometime djing will know that these are pretty much the essential functionalities in a dj console (not the logo, of course, that's just a whing), so I decided I'd have started from these points, and I have used trello to divide my tasks day by day.</p>
 <img src="https://raw.githubusercontent.com/mmorandini/wdi-project-4-client/master/src/images/trello-board.png" width="600">
 
 <h2>Development</h2>
 <h4>Search</h4>

 These are the functions that, having set query as a variable by applying an ng-model directive to the search input, make an http request to soundcloud or youtube and return a given number ( === maxResults ) of results, storing them in an array, for me to play with after.
 
```
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

```


```
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

```

 <h4>Audio players</h4>
 After trying to work with the SoundCloud embedded players at the very beginning, I decided to move forward to a more customizable custom player, which I eventually substituted when I decide to use <a href="https://wavesurfer-js.org/">Wavesurfer.js</a>, a great package that has allowed me to have amazing waveforms, and also discover a very powerful tool such as the <a href="">Web Audio API</a>.
 
 
 <h4>Audio manipulations</h4>
 
 <p>This is probably the part I'd struggled the most on, especially when it came to the crossfader part: I had to create a function that not only could fade the volume between one deck to the other, but also that could keep track of the individual volume value of each deck (gainA and gainB in the code below).</p>
 
 ```
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
 
 ```
 <p>Please note that the volume of the Youtube player ranges between 0 and 100, whereas the volume for the SoundCloud player goes from 0 to 1.</p>
 
 <h4>Waveforms</h4>
 <p>As mentioned above I have used <a href="https://wavesurfer-js.org/">Wavesurfer.js</a> for the waveforms, a very important part of this project.</p>
 <p>In my original idea I was thinking to have a classic approach to the mixing process, by detecting the bpm (beats per minute) of a track and adjusting it according to the bpm of the other track. Turns out that most of the sounds in the SoundCloud platform don't have a defined bpm in the metadata; therefore I tried detecting the bpm using Javascript, but the solution I came out with wasn't accurate enough (you can find it <a href="https://github.com/mmorandini/wdi-project-4-client/blob/master/lib/analyzer.js">here</a>. Feedbacks and improvements are more then welcome!!!). </p>
<p>
The way I decided to work it out is therefore to display the waveforms of the two tracks one on top of the other so that users will have to match the beats and adjust the tempo based on what they see on the display.
</p>
<h2>Styling</h2>

<img src="https://raw.githubusercontent.com/mmorandini/wdi-project-4-client/master/src/images/console-preview.png"></img>
 
 <h2>Technologies</h2>
 <ul>
 <li>Express</li>
 <li>Gulp</li>
 <li>Babel</li>
 <li>Bcrypt</li>
 <li>Ruby on Rails</li>
 <li>HTML5</li>
 <li>CSS3</li>
 <li>AngularJS</li>
 <li>Wavesurfer.js</li>
 <li>Web Audio API</li>
 <li>Tachyons</li>
 <li>Animate.css</li>
 </ul>
 
 <h2>Future plans</h2>
 
 For the future I intend to add more sound effects, integrate the Spotify API and maybe work on a mobile version of the app.
 
 <h2>Feedbacks</h2>
 <p>Please send any feedback or improvement to emmemorandini@gmail.com or fork the code from Github <a href="https://github.com/mmorandini/wdi-project-4-client">here</a>.</p>
 <small>Author:</small> Matteo Morandini<br>
 <small>First Release:</small> 16 June 2017
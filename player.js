var player;
var playerInterval;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {

    height: $('#player').attr('data-ytheight'),
    width: $('#player').attr('data-ytwidth'),
    videoId: $('#player').attr('data-ytid'),

    playerVars: {
      modestbranding: 1,
      controls: 0,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

  $(document).trigger('player:ready');
}

function onPlayerStateChange(event) {
  $('#player').attr('data-ytstate', event.data);
}

function stopVideo() {
  player.stopVideo();
}

function pauseVideo() {
  player.pauseVideo();
}

function playVideo() {
  player.playVideo();
}

function startInterval()
{
  var timerTime = parseInt($('#player').attr('data-timer-time'));
  var timerTarget = $($('#player').attr('data-timer-target'));

  if (timerTarget.length == 0 || timerTime == 0) {
    return;
  }

  playerInterval = setInterval(function(){
    if (parseInt(player.getCurrentTime()) >= timerTime && player.getPlayerState() == 1) {
      timerTarget.show(0);
    } else {
      timerTarget.hide(0);
    }
  }, 700);
}

$(document).on('player:ready', function(){
  startInterval();

  $('.glass').on('click', function(e){
    if ($('#player').attr('data-ytstate') == YT.PlayerState.PLAYING) {
      return pauseVideo();
    } 
    
    return playVideo();
  });

  $('.player-wrapper').on('click', function(e){
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    return false;
  });
});



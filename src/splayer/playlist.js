// Playlist fn
// ======================================================== //

// ** (This method is better than if(..hasClass etc) doSomething etc..)
$(playListsContainer).on('click', playList + ' li.nowplaying.wasplaying', function(){
    sP.play()
});
$(playListsContainer).on('click', playList + ' li.nowplaying:not(.wasplaying)', function() {
    sP.pause();
});
$(playListsContainer).on('click', playList + ' li:not(.nowplaying):not(.wasplaying)', function () {
    sP.play(this);
});

// ======================================================== //
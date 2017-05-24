// Loop
// ======================================================== //

if (currentLoopBtn) {
    $(currentLoopBtn).click(function () {
        $(this).toggleClass('islooped');
        function loopTrue() {
            if ($(currentLoopBtn + '.islooped').length) {
                sP.audio.play();
                if (playerSlider) {
                    $(playerSlider).val(sP.audio.currentTime);
                }
                $(playBtn).addClass('nowplaying');
                $(playList + ' li.nowplaying').removeClass('wasplaying');
            } else {
                return false
            }

        };
        sP.audio.addEventListener('ended', loopTrue);
    });
}

// -- Audio on End [No Loop]
sP.audio.addEventListener('ended', function () {
    if(!currentLoopBtn && $(playList + ' li.nowplaying:not(:last-child)').length) {
        sP.next()
    } else if (currentLoopBtn && $(playList + ' li.nowplaying:not(:last-child)').length && $(currentLoopBtn + ':not(.islooped)').length) {
        sP.next()
    } else {
        sP.pause()
    }
});
// ======================================================== //
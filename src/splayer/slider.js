// Slider
// ========================================================= //

// -- Slider Change
if (playerSlider) {
    $(playerSlider).on("change", function () {
        sP.audio.currentTime = $(playerSlider).val()
        sP.audio.play();
        $(playBtn).addClass('nowplaying');
        $(playList + ' li.wasplaying').removeClass('wasplaying');
    });
}

// -- Slider Timeupdate
if (playerSlider || playerSliderProgress || songCurrentTime) {
    sP.audio.addEventListener('timeupdate', function (s) {
        if (playerSlider) {
            $(playerSlider).attr('max', sP.audio.duration).attr('value', sP.audio.currentTime);
        }

        var currentSec = parseInt(sP.audio.currentTime, 10).toString(),
            sCurrentDone = currentSec.toMMSS();

        if (playerSliderProgress) {
            var sliderBgPercent = (sP.audio.currentTime * 100) / sP.audio.duration + '%';
            $(playerSliderProgress).css('width', sliderBgPercent);
        }

        if (songCurrentTime) {
            $(songCurrentTime).text(sCurrentDone)
        }
    });
}
// ========================================================= //
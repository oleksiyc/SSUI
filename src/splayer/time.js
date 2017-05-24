// Time: Song Duration and Song CurrentTime
// ======================================================== //

if (songDuration || songCurrentTime) {
    sP.audio.addEventListener('loadedmetadata', function (d) {
        var durationSec = parseInt(sP.audio.duration, 10).toString(),
            sDurationDone = durationSec.toMMSS(),
            currentSec = parseInt(sP.audio.currentTime, 10).toString(),
            sCurrentDone = currentSec.toMMSS();
        if (songDuration) {
            // Prevent NaN:NaN output
            if (sP.audio.duration != sP.audio.duration) {
                $(songDuration).text('0:00');
            } else {
                $(songDuration).text(sDurationDone);
            }
        }

        if (songCurrentTime) {
            $(songCurrentTime).text(sCurrentDone);
        }
    });
}

// ======================================================== //
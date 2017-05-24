
// Helpers
// ======================================================== //

// -- Converter to time (string.toMMSS())
String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = minutes + ':' + seconds;
    return time;
};

// ======================================================== //
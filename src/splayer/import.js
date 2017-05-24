// Import
// ========================================================= //

if (importLocalFiles) {
    // -- Getting Songs
    $(importLocalFiles).on('change', function () {
        // -- canPlay check function for supported audio formats
        var canPlay = function (type) {
            var nA = new Audio();
            return !!(nA.canPlayType && nA.canPlayType(type).replace(/no/, ''));
        }
        var files = this.files;
        if (files) {
            // -- Handling selected files and also 
            // -- checking Browser support for audio formats before importing them
            // ** Note: This will be implemented soon for player js
            var queue = [];
            var mp3 = canPlay('audio/mpeg;'),
                ogg = canPlay('audio/ogg; codecs="vorbis"'),
                aac = canPlay('audio/aac;'),
                m4a = canPlay('audio/m4a;'),
                mp4 = canPlay('audio/mp4;');
            // -- Looping through selected files to find playable songs
            // -- only, and then pushing them to queue
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var path = file.webkitRelativePath || file.mozFullPath || file.urn || file.name;
                // Skip Metadata folder in OSX
                if (path.indexOf('.AppleDouble') != -1) {
                    continue;
                }

                // Create Queue arrey full of playable songs only
                if (file.name.indexOf('mp3') != -1 && mp3) {
                    queue.push(file);
                }
                if ((file.name.indexOf('ogg') != -1 || file.name.indexOf('oga') != -1) && ogg) {
                    queue.push(file);
                }
                if (file.name.indexOf('aac') != -1 && aac) {
                    queue.push(file);
                }
                if (file.name.indexOf('m4a') != -1 && m4a) {
                    queue.push(file);
                }
                if (file.name.indexOf('mp4') != -1 && mp4) {
                    queue.push(file);
                }
            }
            // -- Saveing queue to Storage
            if (importStorage) {
                localforage.setItem('selectedFiles', queue);
            }
        }
        // -- looping through queue
        if (queue.length) {
            for (var i = 0; i < queue.length; i++) {
                sP.import(queue, i)
            }
        }
    });
}
// ========================================================= //
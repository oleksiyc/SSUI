// Storage: Loading Storage
// ========================================================= //

// -- Last Played Song ID
// ** Loading Last played song from storage is included inside Player library

// -- Starred Songs
if (localStorage.getItem('starredSongs')) {
    (function(){
        var resultSSIDs = localStorage.getItem('starredSongs');
        var getSSID = resultSSIDs.split(',');
        $.each(getSSID, function (i, val) {
            var creSSID = '#' + getSSID[i];
            sP.star(creSSID);
        });
    })();
}

// -- Import / Selected Files
if (importStorage) {
    localforage.getItem('selectedFiles', function (err, result) {
        if (result) {
            for (var i = 0; i < result.length; i++) {
                sP.import(result, i)
            }
        }
        if (err) {
            console.log(err)
        }
    });
}
// ========================================================= //
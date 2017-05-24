// Default Variables
// ======================================================== //

if (!playListsContainer) {
    playListsContainer = 'body'
}

// ======================================================== //


// sP (sPlayer Magic)
// ======================================================== //

var sP = {
    // -- Audio Element
    // ** I'm using HTMLAudioElement object
    // ** Which's ~60% Faster than createElement()
    // ** Check this test
    // ** https://jsperf.com/new-audio-vs-document-createelement-audio
    audio: new Audio(),

    // -- Play fn
    // ** sP.play(): play the current song
    // ** sP.play(someElement): play a new song
    // ** sP.play(someElement, 'radio'): play a new song but w/ radio method
    play: function (sElement, radio) {
        if (!sElement) {
            sP.audio.play();
            $(playList + ' li.wasplaying').removeClass('wasplaying');

        } else if (sElement) {
            sP.audio.src = $(sElement).attr('data-song');
            sP.audio.load();
            sP.audio.play();

            $(playList + ' li').removeClass('nowplaying wasplaying');
            $(sElement).addClass('nowplaying');
            if (currentLoopBtn) {
                $(currentLoopBtn).removeClass('islooped');
            }

            // -- Sync with the Bottom classes
            if (currentStarBtn && $(sElement).find(starBtn + '.isstarred').length) {
                $(currentStarBtn).addClass('isstarred');

            } else if (currentStarBtn && !$(sElement).find(starBtn + '.isstarred').length) {
                $(currentStarBtn).removeClass('isstarred');
            }
            if (currentDownloadBtn && $(sElement).find(downloadBtn + '.isdownloaded').length) {
                $(currentDownloadBtn).addClass('isdownloaded');

            } else if (currentDownloadBtn && !$(sElement).find(downloadBtn + '.isdownloaded').length) {
                $(currentDownloadBtn).removeClass('isdownloaded');
            }

            if (songDuration) {
                // Prevent NaN:NaN output
                if (sP.audio.duration != sP.audio.duration) {
                    $(songDuration).text('0:00');
                }
            }
            // -- Save the Current Playing SongID to Storage
            // ** Note: I'm telling it not to save last played local song
            if (lastPlayedSongIdStorage && $(sElement).not('[id^=sLID]').attr('id')) {
                var lastPlayedSongID = $(sElement).attr('id');
                localStorage.setItem('lastPlayedID', lastPlayedSongID)
            }
        }

        if (radio && radioTime) {
            sP.audio.addEventListener('timeupdate', function (d) {
                var currentSec = parseInt(sP.audio.currentTime, 10).toString(),
                    sCurrentDone = currentSec.toMMSS();
                $(radioTime).html(sCurrentDone);
            });
        }

        $(playBtn).addClass('nowplaying');

    },

    // -- Pause fn
    pause: function () {
        sP.audio.pause();
        $(pauseBtn).removeClass('nowplaying');
        $(playList + ' li.nowplaying').addClass('wasplaying');
    },

    // -- Next fn
    // ** We make sure that next play cant be called 
    // ** on the last child, because trust me it aint pretty
    // ** when we call sNext fn on the last child
    next: function () {
        if ($(playList + ' li.nowplaying:not(:last-child)').length) {
            var sElementNew = $(playList + ' li.nowplaying').next();
            sP.play(sElementNew)
        } else {
            return false;
        }
    },

    // -- Prev fn
    // ** This fn cant be called on the first child
    prev: function () {
        if ($(playList + ' li.nowplaying:not(:first-child)').length) {
            var sElementNew = $(playList + ' li.nowplaying').prev();
            sP.play(sElementNew)
        } else {
            return false;
        }
    },

    // -- Star fn
    // -- sStar(): Star the playing song
    // -- sStar(someElement): Star that element
    star: function (sElement) {
        var SongLi = '';
        if (!sElement) {
            SongLi = playList + ' li.nowplaying';
        } else if (sElement) {
            SongLi = sElement;
        }
        var SongLiData = $(SongLi).attr('id');
        var cloneSongLi = $('#' + SongLiData).clone();
        $(cloneSongLi).attr({
            'data-id': SongLiData,
            id: ''
        })
        $(starredList + ' ul').append(cloneSongLi);
        if (noStarredList) {
            $(noStarredList).addClass('passive');
        }

        if (currentStarBtn && $(SongLi).hasClass('nowplaying')) {
            $(currentStarBtn).addClass('isstarred');
        }

        $(starredList + ' li ' + starBtn).addClass('isstarred');
        $(SongLi).find(starBtn).addClass('isstarred');


        // -- Store Starred Songs IDs arrey for localStorage
        if (starredListStorage) {
            var starredSongsID = $(playList + ' li[id] ' + starBtn + '.isstarred').parents('li').map(function () {
                return this.id;
            }).get().join(',');
            localStorage.setItem('starredSongs', starredSongsID);
        }

    },

    // -- Unstar fn
    // ** sUnstar(): Unstar the playing song
    // ** sUnstar(someElement): Unstar that element
    unstar: function (sElement) {
        var SongLi = '';
        if (!sElement) {
            SongLi = playList + ' li.nowplaying';
        } else if (sElement) {
            SongLi = sElement;
        }

        var SongLiData = $(SongLi).attr('id') || $(SongLi).attr('data-id');
        $(starredList + ' li[data-id=' + SongLiData + ']').remove();
        $('#' + SongLiData).find(starBtn).removeClass('isstarred');
        if (noStarredList && $(starredList + ' li').length == 0) {
            $(noStarredList).removeClass('passive');
        }

        if (currentStarBtn && $(SongLi).hasClass('nowplaying')) {
            $(currentStarBtn).removeClass('isstarred');
        }

        $(SongLi).find(starBtn).removeClass('isstarred');

        // -- Store starred Songs IDs arrey for localStorage
        if (starredListStorage) {
            var starredSongsID = $(playList + ' li[id] ' + starBtn + '.isstarred').parents('li').map(function () {
                return this.id;
            }).get().join(',');
            localStorage.setItem('starredSongs', starredSongsID);
        }

    },

    // -- Live Search fn
    // ** Usage: 
    // ** $(input).keyup(function() {
    // **    var thisVal = $(this).val();
    // **    sP.search(thisVal)
    // ** })
    search: function (thisVal) {
        // -- Searching for all Songs Li that has ID only
        var searchableSongElements = '';
        if (starredList) {
            searchableSongElements = playList + ':not(' + starredList + ') li[id]';
        } else {
            searchableSongElements = playList + ' li[id]';
        }
        $(searchableSongElements).each(function () {
            if ($(this).text().search(new RegExp(thisVal, 'i')) < 0) {
                var idLi = $(this).attr('id');
                $(resultsList + ' li[data-id=' + idLi + ']').remove();

            } else {
                var idLi = $(this).attr('id'),
                    cloneLi = $(this).clone(),
                    dCloneLi = {};
                $(cloneLi).attr({
                    'data-id': idLi,
                    id: ''
                });

                $(resultsList + ' ul').append(cloneLi);
                // -- Removing duplicated results
                $(resultsList + ' li').each(function () {
                    var thisId = $(this).attr('data-id');
                    if (dCloneLi[thisId]) {
                        $(this).remove();
                    } else {
                        dCloneLi[thisId] = 'true';
                    }
                });

            }

        });
        // -- Show "No results" when resLi = 1
        if (noResultsList && $(resultsList + ' li').length == 0) {
            $(noResultsList).show();
        } else if (noResultsList && $(resultsList + ' li').length > 0) {
            $(noResultsList).hide();
        }
    },

    // -- Import Local Files
    // ** Usage:
    // ** function sPimportBeta(song, tags, url, id, art) { doSomething(tags) }
    import: function (queue, i) {
        // -- Passing songs objects to ID3 js
        // ** Note: there's also parseURL fn but only for URLs
        // ** in this case we are dealing with file objects
        ID3v2.parseFile(queue[i], function (tags) {
            //console.log(tags);

            // --  Creating Song Blob URL
            var url;
            if (window.createObjectURL) {
                url = window.createObjectURL(queue[i])
            } else if (window.createBlobURL) {
                url = window.createBlobURL(queue[i])
            } else if (window.URL && window.URL.createObjectURL) {
                url = window.URL.createObjectURL(queue[i])
            } else if (window.webkitURL && window.webkitURL.createObjectURL) {
                url = window.webkitURL.createObjectURL(queue[i])
            }

            // --  Creating Song ID
            var id = 'sLID' + i;

            // -- smartCoverArt (art)
            // -- smartCoverArt Pirtioty = Embedded image then SearchAPI then default cover
            // ** Note: I'm checking also for image Description if its empty
            // ** because if it has some weird characters
            // ** the dataURL would be disrupted (non functional)
            // ** I think this is ID3.js bug.
            // ** I tasted hunderends of songs,
            // ** the songs downloaded from noisetrade.com seems to only have this issues
            // ** Thats not a big problem, the art would fallback to the defaultArt

            // ** Note: I'm checking also for tags.pictures.length,
            // ** to prevent an error
            var art = importDefaultArt || '';
            if (tags.pictures.length > 0 && tags.pictures[0].dataURL && tags.pictures[0].Description == "") {
                art = tags.pictures[0].dataURL;
                return sPimportBeta(queue[i], tags, url, id, art)
            } else if (tags.Album && tags.Artist) {
                var tagsAlbum = tags.Album.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                    tagsArtist = tags.Artist.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
                    crSearchAPI = 'https://api.spotify.com/v1/search?q=album:' + tagsAlbum + '%20artist:' + tagsArtist + '&type=album';
                var searchAPI = crSearchAPI.replace(/ /g, '%20');
                // -- Get SpotifyAPI and Return fn
                $.getJSON(searchAPI, function (data) {
                    $.each(data, function (key, value) {
                        if (value.items[0]) {
                            art = value.items[0].images[1].url;
                        }
                        return sPimportBeta(queue[i], tags, url, id, art)
                    });
                }).fail(function () {
                    return sPimportBeta(queue[i], tags, url, id, art)
                });
            } else {
                return sPimportBeta(queue[i], tags, url, id, art)
            }


        });
    },
    share: function (callback) {
        var urlHref = window.location.href,
            hasShareParm = urlHref.indexOf('?share='),
            hasSongId = urlHref.substr(hasShareParm + 7);
        if (hasShareParm > -1 && $('#' + hasSongId).length) {
            return callback(hasSongId)
        }
    },
    lastPlayed: function (callback) {
        // -- Last Played Song ID
        var lastPlayedID = localStorage.getItem('lastPlayedID');
        var urlHref = window.location.href,
            hasShareParm = urlHref.indexOf('?share='),
            hasSongId = urlHref.substr(hasShareParm + 7);

        if (lastPlayedID && hasShareParm == -1) {
            return callback(lastPlayedID)
        }

    },
    clear: function (clearKey) {
        if (clearKey == 'starredListStorage') {
            localStorage.removeItem('starredSongs');
        } else if (clearKey == 'importStorage') {
            localforage.removeItem('selectedFiles');
            $(importLocalFiles).wrap('<form>').closest('form').get(0).reset();
            $(importLocalFiles).unwrap();
        }
    }
}

// ======================================================== //
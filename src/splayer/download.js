// Download
// ======================================================== //

// -- Download/Cloud btn Function in current
if (currentDownloadBtn) {
    $(currentDownloadBtn).click(function (b) {
        var getNPDown = $(playList + ' li.nowplaying ' + downloadBtn),
            getNPDownA = getNPDown.children(),
            getNPDownAH = getNPDownA.attr('href');
        $(this).toggleClass('isdownloaded');
        getNPDown.toggleClass('isdownloaded');
        $(this).children().attr('href', getNPDownAH)
    });
}

// -- Download/Cloud btn Function in playlist
if (downloadBtn) {
    $(playListsContainer).on('click', downloadBtn, function (e) {
        // -- stopPropagation
        e.stopPropagation();
        $(this).toggleClass('isdownloaded');
        // -- Sync with the bottom player classes
        var SongLi = $(this).parent();
        if ($(this).hasClass('isdownloaded')) {
            if (currentDownloadBtn && $(SongLi).hasClass('nowplaying')) {
                $(currentDownloadBtn).addClass('isdownloaded');
            }
        } else {
            if (currentDownloadBtn && $(SongLi).hasClass('nowplaying')) {
                $(currentDownloadBtn).removeClass('isdownloaded');
            }
        }
    });
}

// ======================================================== //
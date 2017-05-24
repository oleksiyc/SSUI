// Share
// ========================================================= //

// -- Create Share Link by Click on share Btn
if (currentShareBtn && currentShareLink) {
    $(currentShareBtn).click(function () {
        var shareSongId = $(playList + ' li.nowplaying').attr('id'),
            locationHr = window.location.href.split('?share=')[0],
            shareLink = locationHr + '?share=' + shareSongId;

        $(currentShareLink).text(shareLink);
    });
}

// ========================================================= //
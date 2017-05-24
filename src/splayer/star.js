// Star/Save 
// ======================================================== //

// -- Star/Save btn Function in current
if (currentStarBtn) {
    $(currentStarBtn).click(function (b) {
        // -- Star or Unstar 
        if (!$(this).hasClass('isstarred')) {
            sP.star()
        } else {
            sP.unstar()
        }
    });
}

// -- Star/Save btn Function in playlist
if (starBtn) {
    $(playListsContainer).on('click', starBtn, function (e) {
        // -- stopPropagation / preventDefault
        e.stopPropagation();
        e.preventDefault();
        var SongLi = $(this).parent();
        if (!$(this).hasClass('isstarred')) {
            sP.star(SongLi)
        } else {
            sP.unstar(SongLi)
        }
    });
}

// ======================================================== //
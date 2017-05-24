// Live Search
// ======================================================== //

if(liveSearch) {
    $(liveSearch).keyup(function () {
        var thisVal = $(this).val();
        sP.search(thisVal)
    })
}

// ======================================================== //
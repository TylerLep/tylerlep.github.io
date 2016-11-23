// find template and compile it
var resultsPlaceholder = $('#results'),
    playingCssClass = 'playing',
    audioObject = null,
    albumCoversHtml = "";
/* 1. 
 - Write a function that makes an AJAX request for a specific album so you can get the tracks of a specific
 the function should accept 2 parameters
 - param1 is the album id 
 - param2 is a "callback" function that you will call after the AJAX request and pass in the response to
 - the API documenation is at https://developer.spotify.com/web-api/get-album/
*/

var fetchTracks = function (albumId, callback) {

        $.ajax({
            
            url: "https://api.spotify.com/v1/albums" + albumId,
            success: function(response){
                callback(response);
                
            }
            
        })










};

var addAlbumsToPage = function ( albums) {

    albums.items.forEach(function(album){
        albumCoversHtml += '<div style="background-image:url('+album.images[0].url+')" data-album-id="'+album.id+'" class="cover"></div>';    
    })
    resultsPlaceholder.append(albumCoversHtml);
}

var searchAlbums = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            // console.log(response);
            // console.log(response.albums);
            // console.log(response.albums.items);
            // console.log(response.albums.items[0]);
            // console.log(response.albums.items[0].images);
            // console.log(response.albums.items[0].images[0].url);
            addAlbumsToPage(response.albums);
            addAlbumPreview();
        }
    });
};

function addAlbumPreview(){
    $(".cover").on('click', function (e) {
        var target = e.target;
        if (target !== null && target.classList.contains('cover')) {
            if (target.classList.contains(playingCssClass)) {
                audioObject.pause();
            } else {
                if (audioObject) {
                    audioObject.pause();
                }
                fetchTracks(target.getAttribute('data-album-id'), function (data) {
                    audioObject = new Audio(data.tracks.items[0].preview_url);
                    audioObject.play();
                    target.classList.add(playingCssClass);
                    audioObject.addEventListener('ended', function () {
                        target.classList.remove(playingCssClass);
                    });
                    audioObject.addEventListener('pause', function () {
                        target.classList.remove(playingCssClass);
                    });
                });
            }
        }    
    });
};

$('#search-form').on('submit', function (e) {
    e.preventDefault();
    searchAlbums($('#query').val());
});
//
//
//
//
'use strict';

window.onload = function () {
    console.log("Onload")

    var box = document.getElementById('movie-list');

    var newCard = document.createElement('div');
    newCard.className = 'single-movie';
    newCard.id = 'movie-card-2';

    var newImageDiv = document.createElement('div');
    newImageDiv.className = 'movie-image';
    newImageDiv.innerHTML = '<img src="https://img3.doubanio.com/lpic/s2555801.jpg">'
    newCard.append(newImageDiv);

    var newInfo = document.createElement('div')
    newInfo.className = 'movie-info';
    newCard.append(newInfo);

    box.append(newCard);
}


//
// function createSingleMovie(index) {
//     if (typeof index !== 'number') {
//         throw 'Invalid index'
//     }
//
// }


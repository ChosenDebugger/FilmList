//
//
//
//
'use strict';

var data;

function init(){
    const url='films.json';
    $.getJSON(url, function (_data) {
        data = _data;
    })
}

window.onload = function () {
    console.log("Onload")

    init();

    $.getJSON(url, function (data) {
        console.log(data[0]);
        // console.log(data[0].casts);

        const box = document.getElementById("cards");

        for(var i = 0, len = data.length; i<len; i++){
            const newCard = document.createElement('div');
            newCard.className = 'single-card';
            newCard.id = 'movie-card-' + i;

            const newImageDiv = document.createElement('div');
            newImageDiv.className = 'movie-image';
            newImageDiv.innerHTML = `<img src=${data[i].poster}>`;
            newCard.append(newImageDiv);

            const newInfo = document.createElement('div');
            newInfo.className = 'movie-info';
            newInfo.innerHTML = `<div class="info-title"><h1>${data[i].title}</h1></div>`;
            // <div class="info-pub_date"><h2>${data[i].pubDate}</h2></div>
            // <div class="info-cast"><h3>${data[i].cast}</h3>;

            newCard.append(newInfo);

            box.append(newCard);
        }

    })

};


//
// function createSingleMovie(index) {
//     if (typeof index !== 'number') {
//         throw 'Invalid index'
//     }
//
// }


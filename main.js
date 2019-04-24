//
//
//
//
'use strict';

window.onload = function () {
    console.log("Onload")
    const url = 'films.json';

    $.getJSON(url, function (data) {
        console.log(data[0]);
        // console.log(data[0].casts);

        const cards = document.getElementById("cards");

        for (let i = 0, len = data.length; i < len; i++) {
            const newCard = document.createElement('div');
            newCard.className = 'single-card';
            newCard.id = 'movie-card-' + i;

            const newImageDiv = document.createElement('div');
            newImageDiv.className = 'movie-image';
            newImageDiv.innerHTML = `<img src=${data[i].poster}>`;
            newCard.append(newImageDiv);

            //INFO
            const newInfo = document.createElement('div');
            newInfo.className = 'movie-info';

            //INFO-TITLE
            const title = ControlLength(data[i].title, 20);

            const newTitle = document.createElement('div');
            newTitle.className = 'info-title';
            newTitle.innerHTML = `<h1>${ControlLength(title, 20)}</h1>`;

            newInfo.append(newTitle);

            /***************/
            /*INFO-PUB_DATE*/
            /***************/
            let pubDate = 'PUB DATE: ';

            for (let j = 0; j < data[i].pubdate.length; j++) {
                if (j > 0) {
                    pubDate += ', '
                }
                pubDate += data[i].pubdate[j];
            }

            const newPubDate = document.createElement('div');
            newPubDate.className = 'info-pub_date';
            newPubDate.innerHTML = `<h2>${ControlLength(pubDate, 60)}</h2>`

            newInfo.append(newPubDate);

            /**************/
            /*INFO-COUNTRY*/
            /**************/

            let country = 'COUNTRY: ';

            for(let j=0; j<data[i].countries.length; j++){
                if (j>0){
                    country+=', ';
                }
                country += data[i].countries[j];
            }

            const newCountry = document.createElement('div');
            newCountry.className = 'info-country';
            newCountry.innerHTML = `<h2>${country}</h2>`;

            newInfo.append(newCountry);

            /************/
            /*INFO-CASTS*/
            /************/
            let casts = 'CASTS: ';

            for (let j = 0; j < data[i].casts.length; j++) {
                if (j > 0) {
                    casts += ', ';
                }
                casts += data[i].casts[j].name;
            }

            const newCasts = document.createElement('div');
            newCasts.className = 'info-cast';
            newCasts.innerHTML = `<h3>${ControlLength(casts, 60)}</h3>`;

            newInfo.append(newCasts);

            // newInfo.innerHTML = `<div class="info-title"><h1>${title}</h1></div>`;
            // <div class="info-pub_date"><h2>${data[i].pubDate}</h2></div>
            // <div class="info-cast"><h3>${data[i].cast}</h3>;

            newCard.append(newInfo);

            cards.append(newCard);
        }

    })

};

/**
 * @return {string}
 */
function ControlLength(str, maxLen) {
    return str.length > maxLen ? str.slice(0, maxLen - 1) + '...' : str;
}

function ExtractElement(str, originalArray) {
    for (let i = 0; i < originalArray.length; i++) {
        str += originalArray[i];

        if (i > 0) {
            str += ', '
        }
    }
    return str;
}

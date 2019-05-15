'use strict';

window.onload = function () {
    console.log("Onload")

    init_with_pageNum(0);
};


function PageTurning(pageNum) {
    // https://raw.githubusercontent.com/ChosenDebugger/FilmList/master/films.json
    $.getJSON('https://raw.githubusercontent.com/ChosenDebugger/FilmList/master/films.json', function (data) {
        console.log(data);
        let currentPageNum = -1;
        const currentFirstCard = document.getElementById('movie-card-0').firstChild.firstChild;
        for (let i = 0; i < 200; i = i + 10) {
            if (currentFirstCard.src === data[i].poster) {
                currentPageNum = i / 10;
            }
        }

        if (pageNum >= 0) {
            init_with_pageNum(pageNum);
            if (currentPageNum !== pageNum) {
                window.scroll(0, 0);
            }
        } else if (pageNum === -1) {
            if (currentPageNum === 0) {
                init_with_pageNum(0);
            } else {
                init_with_pageNum(currentPageNum - 1);
                window.scroll(0, 0);
            }
        } else if (pageNum === -2) {
            if (currentPageNum === 9) {
                init_with_pageNum(9);
            } else {
                init_with_pageNum(currentPageNum + 1);
                window.scroll(0, 0);
            }
        } else {
            console.log('Invalid Page');
        }
    })
}

function ShowDetails(movieID) {
    window.location.href = "details.html?" + movieID;
}


function init_with_pageNum(pageNum) {
    const url = 'https://raw.githubusercontent.com/ChosenDebugger/FilmList/master/films.json';

    $.getJSON(url, function (data) {
        console.log(data);
        // console.log(data[0].casts);

        const cards = document.getElementById("cards");
        while (cards.children.length > 0) {
            cards.removeChild(cards.children[0]);
        }

        for (let i = pageNum * 10; i < pageNum * 10 + 10; i++) {
            const newCard = document.createElement('div');
            newCard.className = 'single-card';
            newCard.id = 'movie-card-' + i % 10;

            const newImageDiv = document.createElement('div');
            newImageDiv.className = 'movie-image';
            newImageDiv.innerHTML = `<img src=${data[i].poster}>`;
            newCard.append(newImageDiv);

            //INFO
            const newInfo = document.createElement('div');
            newInfo.className = 'movie-info';

            /************/
            /*INFO-TITLE*/
            /************/
            const id = data[i]._id;
            const title = data[i].title;
            const newTitle = document.createElement('div');
            newTitle.className = 'info-title';
            newTitle.innerHTML = `<a href="javascript:ShowDetails(${id})">${title}</a>`;
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
            newPubDate.innerHTML = `<h2>${pubDate}</h2>`;

            newInfo.append(newPubDate);

            /**************/
            /*INFO-COUNTRY*/
            /**************/

            let country = 'COUNTRY: ';

            for (let j = 0; j < data[i].countries.length; j++) {
                if (j > 0) {
                    country += ', ';
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
            newCasts.innerHTML = `<h2>${casts}</h2>`;

            newInfo.append(newCasts);

            /*************/
            /*INFO-GENRES*/
            /*************/
            let genres = 'GENRES:';

            for (let j = 0; j < data[i].genres.length; j++) {
                if (j > 0) {
                    genres += ' ';
                }
                genres += data[i].genres[j];
            }

            const newGenres = document.createElement('div');
            newGenres.className = 'info-genres';
            newGenres.innerHTML = `<h2>${genres}</h2>`;

            newInfo.append(newGenres);

            /***************/
            /*INFO-DURATION*/
            /***************/

            let duration = 'DURATION: ' + data[i].duration;

            const newDuration = document.createElement('div');
            newDuration.className = 'info-duration';
            newDuration.innerHTML = `<h2>${duration}</h2>`;

            newInfo.append(newDuration);

            newCard.append(newInfo);

            cards.append(newCard);
        }
    });

    const footer = document.getElementById('pagination-ul');
    while(footer.children.length>0){
        footer.removeChild(footer.children[0]);
    }

    const pageUp = document.createElement('li');
    pageUp.innerHTML = `<a href="javascript:PageTurning(-1)"></a>`;
    footer.append(pageUp);

    for(let i=0;i<10;i++){
        const pageFlip = document.createElement('li');
        pageFlip.innerHTML = `<a href="javascript:PageTurning(${i})"></a>`;
        footer.append(pageFlip);
    }

    const pageDown = document.createElement('li');
    pageDown.innerHTML = `<a href="javascript:PageTurning(-2)"></a>`;
    footer.append(pageDown);
}

function Reload() {
    location.reload();
}

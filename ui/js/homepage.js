'use strict';

const limit = 10;

let maxPage = 0;
let totalCount = 0;

window.onload = function () {
    console.log("Onload");
    const url = `http://127.0.0.1:5000/api/v1.0/films_count`;

    $.getJSON(url, function (data) {
        totalCount = data.totalCount;
        maxPage = Math.ceil(totalCount / limit);
    });

    init_with_pageNum(1);
};

function init_with_pageNum(_pageNum) {
    const url = `http://127.0.0.1:5000/api/v1.0/films?pageNum=${_pageNum}&limit=${limit}`;

    $.getJSON(url, function (data) {

        const _filmList = data.films;

        // console.log(_filmList);

        init_with_json(_filmList);
        init_pagination(_pageNum);
    });
}

function init_with_json(data) {

    const cards = document.getElementById("cards");
    while (cards.children.length > 0) {
        cards.removeChild(cards.children[0]);
    }

    for (let i = 0; i < 10; i++) {
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
}

function init_pagination(currentPageNum) {

    let firstPagePagination = -1;

    if (currentPageNum <= 5){
        firstPagePagination = 1;
    }
    else if (currentPageNum >= maxPage - 4){
        firstPagePagination = maxPage - 8;
    }
    else {
        firstPagePagination = currentPageNum - 4;
    }

    const footer = document.getElementById('pagination-ul');
    while(footer.children.length>0){
        footer.removeChild(footer.children[0]);
    }

    const firstPage = document.createElement('li');
    firstPage.innerHTML = `<a class="sleepingPagination" href="javascript:PageTurning(${currentPageNum}, -1)"><<</a>`;
    footer.append(firstPage);

    const pageUp = document.createElement('li');
    pageUp.innerHTML = `<a class="sleepingPagination" href="javascript:PageTurning(${currentPageNum}, -2)"><</a>`;
    footer.append(pageUp);

    for(let i=0;i<9;i++){
        const pageFlip = document.createElement('li');
        console.log(currentPageNum);
        console.log(firstPagePagination + i);
        if (currentPageNum == firstPagePagination + i) {
            pageFlip.innerHTML = `<a class="activePagination" href="javascript:PageTurning(${currentPageNum}, ${firstPagePagination + i})">${firstPagePagination + i}</a>`;
        }else {
            pageFlip.innerHTML = `<a class="sleepingPagination" href="javascript:PageTurning(${currentPageNum}, ${firstPagePagination + i})">${firstPagePagination + i}</a>`;
        }
        footer.append(pageFlip);
    }

    const pageDown = document.createElement('li');
    pageDown.innerHTML = `<a class="sleepingPagination" href="javascript:PageTurning(${currentPageNum}, -3)">></a>`;
    footer.append(pageDown);
    
    const lastPage = document.createElement('li');
    lastPage.innerHTML = `<a class="sleepingPagination" href="javascript:PageTurning(${currentPageNum}, -4)">>></a>`;
    footer.append(lastPage);
}

function PageTurning(currentPageNum, targetPageNum) {

    //FIRST PAGE
    if (targetPageNum === -1){
        if (currentPageNum === 1){ return }
        init_with_pageNum(1);
        window.scroll(0, 0);
    }
    else if (targetPageNum === -2){
        if (currentPageNum === 1){ return }
        init_with_pageNum(currentPageNum - 1);
        window.scroll(0, 0);
    }
    else if (targetPageNum === -3){
        if (currentPageNum === maxPage){ return }
        init_with_pageNum(currentPageNum + 1);
        window.scroll(0, 0);
    }
    else if (targetPageNum === -4){
        if (currentPageNum === maxPage){ return }
        init_with_pageNum(maxPage);
        window.scroll(0, 0);
    }
    else{
        if (currentPageNum === targetPageNum){ return }
        init_with_pageNum(targetPageNum);
        window.scroll(0, 0)
    }
}

function ShowDetails(movieID) {
    window.location.href = "details.html?" + movieID;
}

function Reload() {
    location.reload();
}

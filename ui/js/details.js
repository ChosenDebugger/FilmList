'use strict';

window.onload = function () {
    console.log("Onload")

    const id = window.location.search.slice(1);

    init_with_id(id);
};

function init_with_id(id) {
    $.getJSON('https://raw.githubusercontent.com/ChosenDebugger/FilmList/master/films.json',function (data) {
        let targetMovie;
        for (let i=0; i<data.length; i++){
            if (data[i]._id === id){
                targetMovie = data[i];
            }
        }
        console.log(targetMovie);
        if (targetMovie === undefined){
            console.log('Invalid ID');
            return;
        }

        //reset
        const card = document.getElementById('detail-card');
        while (card.children.length > 0) {
            card.removeChild(card.children[0]);
        }

        //TITLE
        const newTitle = document.createElement('div');
        newTitle.className = 'detail-title';
        newTitle.innerHTML = `<h1>${targetMovie.title}</h1>`;

        card.append(newTitle);

        //POSTER
        const newPoster = document.createElement('div');
        newPoster.className = 'detail-poster';
        newPoster.innerHTML = `<img src=${targetMovie.poster}>`;

        card.append(newPoster);

        //INFO
        const newInfo = document.createElement('div');
        newInfo.className = 'detail-info';

        //INFO-DIRECTOR
        let directors = 'Directors: ';

        for(let j = 0; j<targetMovie.directors.length; j++){
            if (j>0){
                directors += ' / ';
            }
            directors += targetMovie.directors[j].name;
        }

        const newDirector = document.createElement('div');
        newDirector.className = 'info-director';
        newDirector.innerHTML = `<h2>${directors}</h2>`;

        newInfo.append(newDirector);

        //INFO-WRITER
        let writers = 'Writers: ';

        for(let j = 0; j<targetMovie.writers.length; j++){
            if (j>0){
                writers+=' / ';
            }
            writers += targetMovie.writers[j].name;
        }

        const newWriter = document.createElement('div');
        newWriter.className = 'info-writers';
        newWriter.innerHTML = `<h2>${writers}</h2>`;

        newInfo.append(newWriter);

        //INFO-CAST
        let casts = 'Casts: ';

        for(let j = 0; j<targetMovie.casts.length; j++){
            if (j>0){
                casts+=' / ';
            }
            casts += targetMovie.casts[j].name;
        }

        const newCast = document.createElement('div');
        newCast.className = 'info-casts';
        newCast.innerHTML = `<h2>${casts}</h2>`;

        newInfo.append(newCast);

        //INFO-GENRES
        let genres = 'Genres: ';

        for(let j = 0; j<targetMovie.genres.length; j++){
            if (j>0){
                genres+=' / ';
            }
            genres += targetMovie.genres[j];
        }

        const newGenre = document.createElement('div');
        newGenre.className = 'info-genres';
        newGenre.innerHTML = `<h2>${genres}</h2>`;

        newInfo.append(newGenre);

        //INFO-LANGUAGE
        let languages = 'Languages: ';

        for(let j = 0; j<targetMovie.languages.length; j++){
            if (j>0){
                languages+=' / ';
            }
            languages += targetMovie.languages[j];
        }

        const newLan = document.createElement('div');
        newLan.className = 'info-language';
        newLan.innerHTML = `<h2>${languages}</h2>`;

        newInfo.append(newLan);

        //INFO-PUB_DATE
        let pub_date = 'Pub-Date: ';

        for(let j = 0; j<targetMovie.pubdate.length; j++){
            if (j>0){
                pub_date+=' / ';
            }
            pub_date += targetMovie.pubdate[j];
        }

        const newPub = document.createElement('div');
        newPub.className = 'info-pub_date';
        newPub.innerHTML = `<h2>${pub_date}</h2>`;

        newInfo.append(newPub);

        //INFO-DURATION
        let duration = 'Duration: ' + targetMovie.duration;

        const newDur = document.createElement('div');
        newDur.className = 'info-duration';
        newDur.innerHTML = `<h2>${duration}</h2>`;

        newInfo.append(newDur);

        //INFO-IMDB
        let imdb = 'IMDB: ' + targetMovie.imdb;

        const newIMDB = document.createElement('div');
        newIMDB.className = 'info-imdb';
        newDur.innerHTML = `<h2>${imdb}</h2>`;

        newInfo.append(newIMDB);

        card.append(newInfo);

        //SUMMARY
        const newSummary = document.createElement('div');
        newSummary.className = 'detail-summary';

        const newHeader = document.createElement('div');
        newHeader.className = 'header-in-summary';
        newHeader.innerHTML = `<h1>${targetMovie.title}的剧情简介</h1>`;

        newSummary.append(newHeader);

        const newContent = document.createElement('div');
        newContent.className = 'content';
        newContent.innerHTML = `<p>&nbsp&nbsp&nbsp&nbsp${targetMovie.summary}</p>`;

        newSummary.append(newContent);

        card.append(newSummary);

    })

}


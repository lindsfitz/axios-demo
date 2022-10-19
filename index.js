// using inquirer, axios, movie db 
// prompt user to enter a movie title search term
// use input to pull movie data from api (with axios)
// use a template literal & fs to create or update an html page w first 4 results
const inquirer = require('inquirer')
const axios = require('axios')
const fs = require('fs')

const KEY = '1afce432c5b8a4c5d7f3901c4838a2ae'
const URL = `https://api.themoviedb.org/3/search/movie/?api_key=${KEY}&language=en-US&query=`



const prompt = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'Enter a movie title'
    }])
}

const getData = (term) => {
    axios.get(`${URL}${term}&page=1&include_adult=false`)
        .then(res => {
            const results = res.data.results.slice(0, 4);
            const cards = results.map(movie => generateCards(movie.title, movie.overview, movie.poster_path))
            // console.log(cards)
            //    console.log(generateHTML(term,cards))
            fs.writeFileSync(`${term}.html`, generateHTML(term, cards))
        }).catch (err => console.log(err))
}

const generateCards = (title, description, cover) =>
    `<div class="card" style="width: 18rem;">
<img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${cover}" class="card-img-top" alt="movie-cover">
<div class="card-body">
  <h5 class="card-title">${title}</h5>
  <p class="card-text">${description}</p>
</div>
</div>`

const generateHTML = (term, cards) =>
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Results related to ${term}</h1>
    <div class='container d-flex'>
        ${cards}
    </div>
  </div>
</div>
</body>
</html>`;

const init = () => {
    prompt().then(ans => {
        getData(ans.title)
    })
}

init()



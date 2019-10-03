const axios = require('axios');
const express = require('express');
const app = express();
const Game = require('./database');

const API_KEY = "5865e092b3bb33ca3807c709e8f3abeb";

//add game to database
app.get('/create', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.query.id;

    axios({

        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {

            Accept: "application/json",
            "user-key": API_KEY
        },

        data: `fields *; where id = ${id};`

    }).then(result => {

        const game = new Game({
            id: result.data[0].id,
            name: result.data[0].name
        });

        if (!game.id) {
            res.status(200).json("Not Found");
            return;
        }

        game.save().then(response => {
            res.status(200).json(response);
        }).catch(error => {
            res.status(400).json(error);
        });

    }).catch(err => {

        res.status(400).json(err);
    })

});

//get all games from database
app.get('/games', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    Game.find({}).then(response => {

        res.status(200).json(response);
    }).catch(error => {

        res.status(400).json(error);
    })

});

//find game in APi
app.get('/findgame', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const name = req.query.name;

    axios({

        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {

            Accept: "application/json",
            "user-key": API_KEY
        },

        data: `fields *; search "${name}";`

    }).then(result => {

        res.status(200).json(result.data);
        console.log(result);

    }).catch(error => {

        res.status(400).json(error);
        console.log(error);
    })
});

app.get('/delete', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const id = req.query.id;

    Game.deleteOne({ id: `${id}` }).then(response => {

            res.status(200).json(response);
            console.log(`${id} Deleted`);
        }).catch(err => {
            res.status(400).json(err);
            console.log(err);
        })

});


app.listen(5000);
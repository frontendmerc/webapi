const axios = require('axios');
const express = require('express');
const app = express();
const Game = require('./database');

const API_KEY = "5865e092b3bb33ca3807c709e8f3abeb";

companies = (data) => {

    axios({

        url: "https://api-v3.igdb.com/companies",
        method: 'POST',
        headers: {

            Accept: "application/json",
            "user-key": API_KEY
        },

        data: `fields *; where id= (${data.toString()});`

    }).then(result => {

        gamez.companies = result.data.name;

    }).catch(error => {


    });
}

//get game from API and add to database
app.get('/create', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const name = req.query.name;

    var genresArray = [];
    var platformArray = [];

    //get the game's id
    axios({

        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {

            Accept: "application/json",
            "user-key": API_KEY
        },

        data: `fields *; search "${name}"; limit 1;`

    }).then(result => {

        Game.find({ id: `${result.data[0].id}` }).then(databse => {

            if (databse.length) {
                res.status(200).json("This game already exist in the database");
            } else {
                result.data[0].genres.forEach(element => {
                    genresArray.push(element);
                });

                result.data[0].platforms.forEach(element => {
                    platformArray.push(element);
                });

                //use the game's id to search the game's image/screenshot
                axios({

                    url: "https://api-v3.igdb.com/covers",
                    method: 'POST',
                    headers: {

                        Accept: "application/json",
                        "user-key": API_KEY
                    },

                    data: `fields *; where id = (${result.data[0].cover});`

                }).then(imgResult => {

                    axios({

                        url: "https://api-v3.igdb.com/genres",
                        method: 'POST',
                        headers: {

                            Accept: "application/json",
                            "user-key": API_KEY
                        },

                        data: `fields *; where id= (${genresArray.toString()});`

                    }).then(genresResult => {

                        axios({

                            url: "https://api-v3.igdb.com/platforms",
                            method: 'POST',
                            headers: {

                                Accept: "application/json",
                                "user-key": API_KEY
                            },

                            data: `fields *; where id= (${platformArray.toString()});`

                        }).then(platformResult => {

                            const game = new Game({
                                id: result.data[0].id,
                                name: result.data[0].name,
                                summary: result.data[0].summary,
                                first_release_date: result.data[0].first_release_date,
                                cover: imgResult.data[0].url.replace("t_thumb", "t_cover_big_2x")
                            });

                            genresResult.data.forEach(element => {
                                game.genres.push(element.name);
                            });

                            platformResult.data.forEach(element => {
                                game.platform.push(element.name);
                            });

                            //game.companies = companyResult.name;

                            if (!game.id) {
                                res.status(200).json("Not Found");
                                return;
                            }

                            // //save in database(mongodb)
                            game.save().then(response => {
                                res.status(200).json(response);
                            }).catch(error => {
                                res.status(400).json(error);
                            });


                        }).catch(error => {


                        });

                    }).catch(error => {


                    });

                }).catch(err => {
                    res.status(400).json(err);
                });
            }


        }).catch(error => {

            res.status(400).json(error);
        });

    }).catch(err => {

        res.status(400).json(err);
    });


});

//get all games from database
app.get('/games', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    Game.find({}).sort({'_id': -1}).then(response => {

        res.status(200).json(response);
    }).catch(error => {

        res.status(400).json(error);
    })

});

app.get('/findgame', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const name = req.query.name;

    Game.find({ name: new RegExp(name, 'i') })
        .then(response => {

            res.status(200).json(response);
        }).catch(error => {

            res.status(400).json(error);
        });

});

//find game in APi
app.get('/findgameAPI', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    const name = req.query.name;

    axios({

        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {

            Accept: "application/json",
            "user-key": API_KEY
        },

        data: `fields *; search "${name}"; limit 1;`

    }).then(result => {

        res.status(200).json(result.data);
        console.log(result);

    }).catch(error => {

        res.status(400).json(error);
        console.log(error);
    })
});

//delete game from database
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

//update game from database
app.get('/update', (req, res) => {

    const id = req.query.id;
    const text = req.query.text;
    const platform = req.query.platform;
    const genres = req.query.genres;

    var platform1 = platform.split(",");
    var genres1 = genres.split(",");
    console.log(platform1);
    console.log(genres1);

    Game.update({ id: id }, { $set: { platform: platform1, genres: genres1 }, summary: `${text}` })
        .then(response => {

            res.status(200).json(response);
        }).catch(error => {

            res.status(400).json(error);
        });
});



app.listen(5000);
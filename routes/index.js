var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/test';

var db;
// var allPhotos;

MongoClient.connect(mongoUrl, function(error, database) {
    // database.collection('cars').find().toArray(function(error, result) {
    // allPhotos = result;
    db = database;
    // });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    //get the users IP
    var currIP = req.ip;
    db.collection('users').find({
        ip: currIP
    }).toArray(function(error, userResult) {
        var photosVoted = [];
        console.log(userResult);
        console.log('=====================');
        console.log(photosVoted);
        for (i = 0; i < userResult.length; i++) {
            photosVoted.push(userResult[i].image);
        }
        db.collection('cars').find({
            imageSrc: {
                $nin: photosVoted
            }
        }).toArray(function(error, photosToShow) {
            if (photosToShow.length === 0) {
                res.redirect('/standings');
            } else {
                console.log(photosToShow);
                var randomNum = Math.floor(Math.random() * photosToShow.length);
                res.render('index', {
                    carimage: photosToShow[randomNum].imageSrc
                });
            }
        });
    });
});


router.get('/standings', function(req, res, next) {
    // 1. Get all the photos.
    // 2. Sort them by the highest totals (negatives at the bottom)
    // res.send('You are on the standing page');
    db.collection('cars').find().toArray(function(error, result) {
        result.sort(function(a, b) {
            return (b.totalVotes - a.totalVotes);
        });
        res.render('standings', {
            theStandings: result
        });
    });
});

/* Set up the post electric page. */
router.post('/electric', function(req, res, next) {
    // 1. We know they voted electric, or they wouldn't be here.
    // 2. We know what they voted on, because we passed it in the req.body var
    // 3. We know who they are, because we know their ip.
    // 4. Update the users collection to include: user ip and photo they voted one
    db.collection('users').insertOne({
        ip: req.ip,
        vote: 'electric',
        image: req.body.photo
    });
    // 5. Update the images/cars collection "totalVotes" for this particular car, by 1 (because they chose electric)
    db.collection('cars').find({
        imageSrc: req.body.photo
    }).toArray(function(error, result) {
        if (isNaN(result[0].totalVotes)) {
            total = 0;
        } else {
            total = result[0].totalVotes;
        }
        db.collection('cars').updateOne({
            imageSrc: req.body.photo
        }, {
            $set: {
                "totalVotes": (total + 1)
            }
        }, function(error, results) {
            // console.log(results);
            // console.log(newTotal);
        });
    });
    // 6. Send them back to the main page so they can vote again (OR render a page)
    // Instead of simply sending the user back to the home page, you could
    // res.render an ejs file, that has a picture of that car
    // with the total votes

    res.redirect('/');

});

/* Set up the post electric page. */
router.post('/poser', function(req, res, next) {
    // res.send(req.body);
    db.collection('users').insertOne({
        ip: req.ip,
        vote: 'poser',
        image: req.body.photo
    });

    db.collection('cars').find({
        imageSrc: req.body.photo
    }).toArray(function(error, result) {
        if (isNaN(result[0].totalVotes)) {
            total = 0;
        } else {
            total = result[0].totalVotes;
        }
        db.collection('cars').updateOne({
            imageSrc: req.body.photo
        }, {
            $set: {
                "totalVotes": (total - 1)
            }
        }, function(error, results) {
            // console.log(results);
            // console.log(newTotal);
        });
    });

    res.redirect('/');

    // res.send("The user chose " + req.body.photo + " as a poser picture.");
    // 1. We know they voted electric, or they wouldn't be here.
    // 2. We know what they voted on, because we passed it in the req.body var
    // 3. We know who they are, because we know their ip.
    // 4. Update the users collection to include: user ip and photo they voted on
    // 5. Update the images/cars collection by -1	
    // 6. 
    // res.send(req.query.submit);
});

router.get("/reset", function(req, res, next){
	db.collection("cars").updateMany(
			{},
			{
				$set: { "totalVotes": 0}
			},
			{}
		);

	res.redirect("/");
});

router.get("/resetUser", function(req, res, next){
	db.collection("users").find().toArray(function(error, result){
		for(var i = 0; i < result.length; i++){
			db.collection("users").deleteOne(
				{"ip": "::1"},
				function(err, results) {

	      		}	
			);
		}
	});
});


module.exports = router;
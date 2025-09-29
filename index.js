const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get('/', function(req , res){
    res.render("index");
});

// Chocolate route with cookie logic
app.get('/chocolate', function (req, res) {
    let myCookie = req.cookies.myValue;

    // If no cookie set, initialize it to -1
    if (!myCookie) {
        res.cookie('myValue', -1, { httpOnly: true, path:'/chocolate'});
        myCookie = -1;
    }

    // If cookie is 350 -> show flag
    if (parseInt(myCookie) === 350) {
        res.render("flag");
    } else {
        res.render("chocolate");
    }
});

app.listen(3000, function(){
    console.log('The server started on port 3000');
});
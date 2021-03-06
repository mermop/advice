var express = require('express');
var app = express();
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://merrin:@localhost/postgres';
var unused_advices;
var used_advices;
var runout_date;
var background_colours = [];
var brush_colour;
var gradient_degrees = Math.floor(Math.random() * (180 - 0)) + 0;

app.get('/', function (request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT colour FROM colour_table WHERE use = 'pen'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        brush_colour = result.rows[0].colour;
       }
    });

    client.query("SELECT colour FROM colour_table WHERE use = 'first'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        background_colours.push(result.rows[0].colour);
       }
    });

    client.query("SELECT colour FROM colour_table WHERE use = 'second'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        background_colours.push(result.rows[0].colour);
       }
    });

    client.query("SELECT use FROM advice_table WHERE use = 'unused'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        unused_advices = result.rowCount
        calculate_days_left(unused_advices)
       }
    });

    client.query("SELECT use FROM advice_table WHERE use = 'used'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        used_advices = result.rowCount
       }
    });

    function calculate_days_left(unused) {
      runout_date = new Date();
      runout_date.setDate(runout_date.getDate() + unused);
      runout_date = moment(runout_date).format("dddd, MMMM Do YYYY")
    }

    client.query("SELECT * FROM advice_table WHERE use = 'in_use'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
        response.render('pages/index', {results: result.rows, used: used_advices, unused: unused_advices, runout: runout_date, background_colours: background_colours, brush_colour: brush_colour, gradient_degrees: gradient_degrees} );
       }
    });
  });
})

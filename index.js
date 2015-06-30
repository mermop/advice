var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://merrin:@localhost/postgres';

app.get('/', function (request, response) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query("SELECT * FROM advice_table WHERE use = 'in_use'", function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/index', {results: result.rows} ); }
    });
  });
})

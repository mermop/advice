var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://merrin:@localhost/postgres';

function random_number(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function random_light_colour() {
  var red = random_number(180, 255);
  var green = random_number(180, 255);
  var blue = random_number(180, 255);
  return('rgb(' + red + ', ' + green + ', ' + blue + ')');
}

function random_dark_colour() {
  var red = random_number(0, 50);
  var green = random_number(0, 50);
  var blue = random_number(0, 50);
  return('rgb(' + red + ', ' + green + ', ' + blue + ')');
}

// update advice
pg.connect(connectionString, function(err, client, done) {
  client.query("UPDATE advice_table SET use = 'used' WHERE use = 'in_use'; UPDATE advice_table SET use='in_use' WHERE id IN (SELECT id FROM advice_table WHERE use = 'unused' ORDER BY RANDOM() LIMIT 1);", function(err, result) {
    done();
    if (err)
     { console.error(err); response.send("Error " + err); }
    else
     {
      return;
    }
  });
  var first_colour = random_light_colour();
  var second_colour = random_light_colour();
  var pen_colour = random_dark_colour();
  client.query("UPDATE colour_table SET colour = '" + first_colour + "' WHERE use = 'first'; UPDATE colour_table SET colour = '" + second_colour + "' WHERE use = 'second'; UPDATE colour_table SET colour = '" + pen_colour + "' WHERE use = 'pen';", function(err, result) {
    done();
    if (err)
     { console.error(err); response.send("Error " + err); }
    else
     {
      return;
    }
  });
});

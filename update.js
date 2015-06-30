var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://merrin:@localhost/postgres';

pg.connect(connectionString, function(err, client, done) {
  client.query("UPDATE advice_table SET use = 'used' WHERE use = 'in_use'; UPDATE advice_table SET use='in_use' WHERE id IN (SELECT id FROM advice_table WHERE use = 'unused' ORDER BY RANDOM() LIMIT 1);", function(err, result) {
    done();
    if (err)
     { console.error(err); response.send("Error " + err); }
    else
     { 
      var backgroundColour = '#BADA55';
      return;
    }
  });
});

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query("UPDATE advice_table SET use = 'used' WHERE use = 'in_use'", function(err, result) {
    done();
    if (err)
     { console.error(err); response.send("Error " + err); }
    else
     { 
      console.log('yep');
    }
  });
});

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  client.query("SELECT advice FROM advice_table ORDER BY RANDOM() LIMIT 1;", function(err, result) {
    done();
    if (err)
     { console.error(err); response.send("Error " + err); }
    else
     { 
      console.log('yep');
    }
  });
});
// if there is in_use
  // select in_use
  // make it used
// if there is unused
  // select random unused
  // make it in_use
  // return changed
// else: return empty

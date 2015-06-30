# Advice for myself
It is at http://advicefor.merr.in/

This is a tiny silly node thing.

This is run through Heroku. If you want to do it yourself you can.

You need a database!

`heroku addons:create heroku-postgresql:hobby-dev`

`heroku pg:psql`

```
CREATE TABLE advice_table (
    id    SERIAL PRIMARY KEY,
    advice  TEXT,
    use   TEXT
);
```

To run locally
`foreman start web`
To test the update locally
`node update.js`

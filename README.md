# Advice for myself
It is at http://advicefor.merr.in/

This is a tiny silly node thing.

This is run through Heroku. If you want to do it yourself you can.

To run locally
`foreman start web`
To test the update locally
`foreman start worker`

## Heroku setup
`heroku addons:create heroku-postgresql:hobby-dev`

`heroku pg:psql`

## Local setup
`pg_restore --verbose --clean --no-acl --no-owner -h localhost -U merrin -d postgres latest.dump`


# Advice for myself
It is at http://advicefor.merr.in/

This is a tiny silly node thing to give myself advice from the past. 

It is run through Heroku. If you want to do it yourself you can.

## Heroku setup
Create a database
`heroku addons:create heroku-postgresql:hobby-dev`

'Hello, database'
`heroku pg:psql`

'Database! Make me a table'
`create table advice_table (id integer, advice text, use text);` 

'Yes, good. Now put things into it'
`insert into advice_table values (1, 'an advice', use 'unused');`

'Goodbye'
`\q`

I am running a daily update through heroku scheduler
![scheduler](readme-screenshots/scheduler.jpg)

## Local setup

You will need node and postgres installed. 

To run locally
`foreman start web`
To run an update locally
`foreman start worker`

## Todo
- Some kind of fonts
- Some kind of shapes
- Daily visual changes
- Make advice id not have to be manually defined? a serial?
- Better setup instructions

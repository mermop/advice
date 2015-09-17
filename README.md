# Advice for myself
It is at http://advicefor.merr.in/

This is a tiny silly node thing to give myself advice from the past.

It is run through Heroku. If you want to do it yourself you can.

## Setup
Here are step by step instructions for Pip <3
You will need:

- [Heroku Toolbelt](https://toolbelt.heroku.com/)
- [Node and NPM](https://nodejs.org/download/)
- Postgres - [through the command line](https://wiki.postgresql.org/wiki/Detailed_installation_guides) or [postgres.app](http://postgresapp.com/)
- You may like to use the Github app for [Mac](https://mac.github.com/) or [Windows](https://windows.github.com/)

Mostly [these instructions are almost exactly right](https://devcenter.heroku.com/articles/getting-started-with-nodejs#) but here are the core bits.
First of all, clone this thing onto your computer:

`git clone git@github.com:mermop/advice.git`

And go into the folder where it is:

`cd advice`

Make a heroku app:

`heroku create`

It will get a random name.
Put the code on heroku:

`git push heroku master`

Go to the website:

`heroku open`

It won't work because it doesn't have a database.

Create a database

`heroku addons:create heroku-postgresql:hobby-dev`

'Hello, database'

`heroku pg:psql`

'Database! Make me a table'

`create table advice_table (id integer, advice text, use text);`

'Yes, good. Now put things into it'

`insert into advice_table values (1, 'an advice', 'unused'), (2, 'another advice', 'unused');`

'Goodbye'

`\q`

We can get into putting a bunch of advice into it later. Let's just do the setup now.

So now if you refresh the website that `heroku open` opened before, it should work. Yay! You can make changes and push them to the site with `git push heroku master`.

## Local setup

This is more complicated and a bit messy right now! You will need to change the line in `index.js` and `update.js` that says:

`postgres://merrin:@localhost/postgres`

with whatever is right for

`postgres://username:password@localhost/postgres`

for you. It kind of depends on your postgres setup I guess. IT'S VERY CONFUSING. I'M VERY CONFUSED BY IT.

Anyway once you have that working you can follow [these instructions](https://devcenter.heroku.com/articles/heroku-postgres-import-export) to bring your heroku database into your local database.

To run locally

`foreman start web`

To run an update locally

`foreman start worker`

I am running a daily update through [heroku scheduler](https://scheduler.heroku.com/dashboard)
![scheduler](readme-screenshots/scheduler.jpg)

## Fun with SQL

So when you are in the psql terminal thing (you get to the heroku one with `heroku pg:psql`) you can send it sql queries to look at and manipulate the database. Here are some phrases:

'What is in my advice_table? Tell me everything. EVERYTHING.'

`SELECT * FROM advice_table;`

'What is in my advice_table? But only tell me about the advice.'

`SELECT advice FROM advice_table;`

'Find all the used advices and make them unused again!'

`UPDATE advice_table SET use = 'unused' WHERE use = 'used'`

## Todo
- Drawing working on mobile
- Some kind of fonts
- Make advice id not have to be manually defined? a serial?
- Better setup instructions
- apparently the colours only reset if the server restarts

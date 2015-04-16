Work Sample for Accedo.tv
written April 15, 2015
by Dale Foo
dale@thefoos.net
ph 91010913

-----------------
Welcome to Colour Memory!

Colour Memory is an html & javascript memory game that runs on a modern browser.

The files included are 
- index.html
- style.css
- application.js (game logic) and
- leaderboard.js (firebase server logic)
- graphics files as supplied

-----------------
SETUP

This will run with a python simple server from the main directory (containing index.html)

> python -m simpleHTTPserver 8080
 
 and then viewed on localhost:8080

-----------------
REQUIREMENTS

These requirements were met:
  - The basic gameplay requirements
  - Game template
  - A leaderboard on a (database) server

These requirements are lacking or missing:
  - Removal of cards from the board and loss of points from a non matching pair.
  - proper implementation of leaderboard query data, in correct order
  - use of PHP, mySQL, Firebug, prototype.js


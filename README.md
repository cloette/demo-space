# Home Assessment
### A quick responsive site to allow for easy, objective, and weighted measurements of houses. 

It probably will come in handy for other things, too.

I could use an excel sheet for this, but that's a terrible mobile experience.

## Plan 
Heroku hosting, MongoDB to store scores and scored items, and I'll probably use Auth0 or Passport to do a basic auth check. The data's not sensitive for my use case but I'd rather someone not be able to stumble on it and mess with it, either.

## Screens
Initially Blank Assessment Form <br />
New Thing to Assess Form <br />
Leaderboard (home)<br />
(Login, Logout)<br /><br />

Assessment Fields should be customizable for the user - <br />
Ex.1 - I need an extra field to put in HOA dues (if applicable).<br />
Ex.2 - I no longer want to weigh price as 3x as important. I should be able to set the multiplier to zero, too, if I want to compare houses independent of price.<br />
* ! Blank Fields should be removed from the denominator/max possible when calculating scores!

## Contributing
Feel free to pitch in! Just give me a heads up.

## Scripts
npm run start<br />
npm run build<br />
npm run test<br />
npm run lint

### Client url: http://localhost:4200
### Application ( epxress ) API: http://localhost:4300

Starting marker: 3.10.2018

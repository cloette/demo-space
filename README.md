# Home Assessment
### A quick responsive site to allow for easy, objective, and weighted measurements of houses. 

It probably will come in handy for other things, too.

I could use an excel sheet for this, but that's a terrible mobile experience.

## Plan 
Heroku hosting, Postgres to store scores and scored items, and I'll probably use Auth0 or Passport to do a basic auth check. The data's not sensitive for my use case but I'd rather someone not be able to stumble on it and mess with it, either.

## Screens
Initially Blank Assessment Form
New Thing to Assess Form 
Leaderboard (home)
(Login, Logout)

Assessment Fields should be customizable for the user - 
Ex.1 - I need an extra field to put in HOA dues (if applicable).
Ex.2 - I no longer want to weigh price as 3x as important. I should be able to set the multiplier to zero, too, if I want to compare houses independent of price.
* ! Blank Fields should be removed from the denominator/max possible when calculating scores!

## Contributing
Feel free to pitch in! Just give me a heads up.

## Scripts
npm run start
npm run build
npm run test
npm run lint
npm run e2e

## Licensing
Just don't try to sell it. If that's not your goal, you're good to copy away.

Starting marker: 3.10.2018

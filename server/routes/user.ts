import { Request, Response, Router, NextFunction } from 'express';
import * as passport from 'passport';
import * as connect from 'connect-ensure-login';

const ensureLoggedIn = connect.ensureLoggedIn();
const userRouter = Router();

/* GET user profile. */
userRouter.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user
  });
});

export { userRouter };

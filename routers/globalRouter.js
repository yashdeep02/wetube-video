import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { login, logout, getJoin, postJoin, getLogin, postLogin, githubLogin, postGithubLogin, getMe } from "../controllers/userController";
import { onlyPublic } from "../middlewares";
import passport from "passport"

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, onlyPublic,getJoin);
globalRouter.post(routes.join,onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login,onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic,postLogin);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.me, getMe)
globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate("github" ,{ 
    failureRedirect: "/login"
}
),postGithubLogin)

export default globalRouter;
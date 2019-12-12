import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import mongoose from "mongoose"
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import session from "express-session";

import passport from "passport"
import { localsMiddleware } from "./middlewares";
import "./passport"
const app = express();
const CookieStore = MongoStore(session);

app.use(helmet());
app.set('view engine', "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));
app.use(morgan("dev"));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized:false,
    store:new CookieStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);



app.use("", globalRouter); 
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
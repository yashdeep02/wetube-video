import express from "express";
import routes from "../routes";
import { uploadVideo, onlyPrivate } from "../middlewares";
import { postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView,postRegisterView)

export default apiRouter;
import express from "express";
import routes from "../routes";
import { uploadVideo, onlyPrivate } from "../middlewares";
import { postRegisterView, postAddComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView,postRegisterView)
apiRouter.post(routes.addComment, postAddComment)

export default apiRouter;
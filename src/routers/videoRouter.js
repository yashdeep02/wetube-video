import express from "express";
import routes from "../routes";
import { videoDetail, getUpload, postUpload, editVideo, deleteVideo, getEditVideo, postEditVideo } from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload,onlyPrivate, getUpload);
videoRouter.post(routes.upload,onlyPrivate,uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail)

videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo)
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo)
videoRouter.get(routes.deleteVideo(),onlyPrivate, deleteVideo)

export default videoRouter;
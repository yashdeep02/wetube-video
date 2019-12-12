import express from 'express';
import routes from '../routes';
import { editProfile, userDetail } from '../controllers/userController';
import { onlyPrivate } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile)
userRouter.get(routes.userDetail(), onlyPrivate, userDetail)

export default userRouter;

import express from "express";
import { signupInstitute, loginInstitute, logoutInstitute, updateCurrentInstitute,getCurrentInstitute } from "../controllers/insituteController.js";
import {authenticate} from "../middlewares/instituteMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(signupInstitute);

router
    .route("/login")
    .post(loginInstitute);

router
    .post("/logout", logoutInstitute);

router
  .route("/profile")
  .get(authenticate, getCurrentInstitute)
  .put(authenticate, updateCurrentInstitute);

export default router;
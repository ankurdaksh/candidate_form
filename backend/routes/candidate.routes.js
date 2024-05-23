import { Router } from "express";

import { candiateController } from "../controller/candidate.controller.js";

import upload from "../Utils/utils.js";

const router = Router();

router.route("/submit-form").post(upload.any("documents"), candiateController);

export default router;

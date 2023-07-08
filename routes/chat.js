import express from "express";
const router = express.Router();

import {
  getChat,
  getChats,
  joinGroup,
  removeFromGroup,
} from "../controllers/chat.js";

router.route("/").post(getChat);
router.route("/group").post(getChats);
router.route("/joinGroup").post(joinGroup);

router.route("/removeFromGroup").patch(removeFromGroup);

export default router;

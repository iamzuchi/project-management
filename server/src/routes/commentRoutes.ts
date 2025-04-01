import express from "express";
import { getCommentsByTask, createComment, updateComment, deleteComment } from "../controllers/commentController";

const router = express.Router();

router.get("/:taskId", getCommentsByTask);
router.post("/", createComment);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router;
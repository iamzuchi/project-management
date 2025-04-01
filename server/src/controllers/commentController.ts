import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get comments for a specific task
 */
export const getCommentsByTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: { taskId: Number(taskId) },
            include: { user: true },
            orderBy: { id: "asc" },
        });
        res.json(comments);
    } catch (error: any) {
        res.status(500).json({ message: `Error fetching comments: ${error.message}` });
    }
};

/**
 * Create a new comment for a task
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
    const { text, taskId, userId } = req.body;
    
    if (!text || !taskId || !userId) {
        res.status(400).json({ message: "Text, taskId, and userId are required." });
        return;
    }
    
    try {
        const newComment = await prisma.comment.create({
            data: { 
                text, 
                taskId: Number(taskId), 
                userId: Number(userId),
            },
        });
        res.status(201).json(newComment);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating comment: ${error.message}` });
    }
};

/**
 * Update a comment
 */
export const updateComment = async (req: Request, res: Response): Promise<void> => {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text) {
        res.status(400).json({ message: "Text is required." });
        return;
    }

    try {
        const updatedComment = await prisma.comment.update({
            where: { id: Number(commentId) },
            data: { text },
        });
        res.json(updatedComment);
    } catch (error: any) {
        res.status(500).json({ message: `Error updating comment: ${error.message}` });
    }
};

/**
 * Delete a comment
 */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const { commentId } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: Number(commentId) },
        });
        res.json({ message: "Comment deleted successfully." });
    } catch (error: any) {
        res.status(500).json({ message: `Error deleting comment: ${error.message}` });
    }
};

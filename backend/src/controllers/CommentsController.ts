import { Request, Response } from 'express';
import { CommenstService } from '../services/CommentsService';

const commentsService = new CommenstService();

export const createComment = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { content } = req.body;

    if (!taskId) {
      return res.status(400).json({ error: 'Task id not provided.' });
    }

    const comment = await commentsService.createComment({ content }, taskId);

    const response = {
      commentId: comment.commentId,
      content: comment.content,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment id not provided.' });
    }

    const comment = await commentsService.updateComment(commentId, { content });

    const response = {
      commentId: comment.commentId,
      content: comment.content,
    };

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment id not provided.' });
    }

    await commentsService.deleteComment(commentId);

    return res.json({ message: 'Comment deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

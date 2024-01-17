import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Comment } from '../entities/Comment';

export class CommenstService {
  private commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = AppDataSource.getRepository('Comment');
  }

  async createComment(commentData: Partial<Comment>, taskId: string) {
    const newComment = this.commentRepository.create(commentData);

    if (!newComment) {
      throw new Error('Comment Service: Comment could not be created.');
    }

    const task = await AppDataSource.getRepository('Task').findOne({
      where: { taskId },
      relations: ['comments'],
    });

    if (!task) {
      throw new Error('Comment Service: Task could not be found.');
    }

    task.comments = [newComment, ...task.comments];

    const savedComment = await this.commentRepository.save(newComment);

    if (!savedComment) {
      throw new Error('Comment Service: Comment could not be saved.');
    }

    const savedTask = await AppDataSource.getRepository('Task').save(task);

    if (!savedTask) {
      throw new Error('Comment Service: Task could not be saved.');
    }

    const response = {
      commentId: savedComment.commentId,
      content: savedComment.content,
    };

    return response;
  }

  async updateComment(commentId: string, commentData: Partial<Comment>) {
    const comment = await this.commentRepository.findOne({
      where: { commentId },
    });

    if (!comment) {
      throw new Error('Comment Service: Comment could not be found.');
    }

    const updatedComment = await this.commentRepository.update(
      commentId,
      commentData,
    );

    if (!updatedComment) {
      throw new Error('Comment Service: Comment could not be updated.');
    }

    return updatedComment;
  }

  async deleteComment(commentId: string) {
    const comment = await this.commentRepository.findOne({
      where: { commentId },
    });

    if (!comment) {
      throw new Error('Comment Service: Comment could not be found.');
    }

    const deletedComment = await this.commentRepository.delete(commentId);

    if (!deletedComment) {
      throw new Error('Comment Service: Comment could not be deleted.');
    }

    return deletedComment;
  }
}

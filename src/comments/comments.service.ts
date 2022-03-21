import { BadRequestException, forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { BlogPostsService } from 'src/blog-posts/blog-posts.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/comments/models/Comment'
import { GetCommentDTO } from './dto/get-comment.dto';

@Injectable()
export class CommentsService {
    constructor (
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService) {}

    comments: Comment[] = [
        new Comment(1, "foarte frumos 1", 1, 1),
        new Comment(2, "foarte frumos 2", 1, 1),
        new Comment(3, "foarte frumos 3", 1, 2),
        new Comment(4, "foarte frumos 4", 1, 2),
        new Comment(5, "foarte frumos 5", 1, 2),
        new Comment(6, "foarte frumos 6", 2, 11),
        new Comment(7, "foarte frumos 7", 2, 12),
        new Comment(8, "foarte frumos 8", 2, 12),
    ];

    getComments() {
        return this.comments;
    }

    getCommentsOfAUserPaginated(userID: number, page: number, limit: number) {
        const user = this.usersService.getUsers()
        .find((user) => {
            return user._id === parseInt(userID.toString());
        })

        if(!user) {
            throw new BadRequestException(`No user with user ID = ${userID} was found!`);
        }

        const commentsOfUser: GetCommentDTO[] = this.comments.filter((comment) => { 
            return comment.userID === parseInt(userID.toString());
        }).map(blogPost => new GetCommentDTO(
            blogPost._id, 
            blogPost.content, 
            user
        ));

        if (commentsOfUser.length === 0) {
            throw new BadRequestException(`No blog-post with user ID = ${userID} was found!`);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        return commentsOfUser.slice(startIndex, endIndex);
    }
}

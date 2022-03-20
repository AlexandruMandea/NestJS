import { BadRequestException, Injectable } from '@nestjs/common';
import { BlogPostsService } from 'src/blog-posts/blog-posts.service';
import { UsersService } from 'src/users/users.service';
import { Comment } from 'src/comments/models/Comment'
import { GetCommentDTO } from './dto/get-comment.dto';

@Injectable()
export class CommentsService {
    constructor (private readonly usersService: UsersService,
        private readonly blogPostsService: BlogPostsService) {}

    comments: Comment[] = [
        new Comment(1, "foarte frumos 1", 1, 1),
        new Comment(2, "foarte frumos 2", 1, 1),
        new Comment(3, "foarte frumos 3", 1, 2),
        new Comment(4, "foarte frumos 4", 1, 2),
        new Comment(5, "foarte frumos 5", 1, 2),
        new Comment(6, "foarte frumos 6", 2, 1),
        new Comment(7, "foarte frumos 7", 2, 2),
        new Comment(8, "foarte frumos 8", 2, 2),
    ];

    getCommentsOfABlogPostPaginated(postID: number, page: number, limit: number) {
        const blogPost = this.blogPostsService.getBlogPosts()
        .find((post) => {
            return post._id === parseInt(postID.toString());
        })

        if(!blogPost) {
            throw new BadRequestException(`No post with post ID = ${postID} was found!`);
        }

        const user = this.usersService.getUsers()
        .find((user) => {
            return user._id === blogPost.userID;
        })

        const commentsOfAPost: GetCommentDTO[] = this.comments.filter((comment) => { 
            return comment.postID === blogPost._id;
        }).map(comment => new GetCommentDTO(
            comment._id, 
            comment.content, 
            user, 
            blogPost
        ));

        if (commentsOfAPost.length === 0) {
            throw new BadRequestException(`No comment from this post was found!`);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        return commentsOfAPost.slice(startIndex, endIndex);
    }
}

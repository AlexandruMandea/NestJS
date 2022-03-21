import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { BlogPostsService } from 'src/blog-posts/blog-posts.service';
import { GetBlogPostAndCommentsDTO } from 'src/blog-posts/dto/get-blog-post-and-comments.dto';
import { CommentsService } from 'src/comments/comments.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { GetUserAndContentDTO } from './dto/get-user-and-content.dto';
import { User } from './models/User';

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => CommentsService))
        private readonly commentsService: CommentsService,

        @Inject(forwardRef(() => BlogPostsService))
        private readonly blogPostsService: BlogPostsService
        ) {}

    private users: User[] = [
        new User(1, 'alex.m', 22, '0758'),
        new User(2, 'andrei.m', 24, '0756'),
        new User(3, 'vladimir.c', 22, '07'),
        new User(4, 'radu.a', 20, '07**'),
        new User(5, 'alina.d', 21, '07**'),
        new User(6, 'viorica.s', 25, '07**'),
        new User(7, 'mihai', 27, '07**'),
        new User(8, 'george', 21, '07**'),
        new User(9, 'grigore', 23, '07**'),
    ];

    getUsers(): User[] {
        return this.users;
    }

    private getBiggestUserID(): number {
        let biggestID: number = 0;

        this.users.forEach(user => {
            if(biggestID < user._id) {
                biggestID = user._id;
            }
        })

        return biggestID;
    }

    getAllUsers(): User[] {
        return [...this.users];
    }

    getUserByID(id: number): User {
        let user: User =  this.users.find((user) => {
            return user._id === parseInt(id.toString());
        });

        return new User(user._id, user.name, user.age, user.phoneNumber);
    }

    createUser(body: CreateUserDTO) {
        let user: User;
        let _id = this.getBiggestUserID() + 1;

        user = new User(_id, body.name, body.age, body.phoneNumber);

        this.users.push(user);
    }
    
    editUser(id: number, body: CreateUserDTO) {
        this.users.forEach(user => {
            if(user._id === parseInt(id.toString())) {
                user.name = body.name;
                user.age = body.age;
                user.phoneNumber = body.phoneNumber;
            }
        });
    }
    
    deleteUser(id: number) {
        let user: User =  this.users.find((user) => {
            return user._id === id;
        });

        let index = this.users.indexOf(user);

        this.users.splice(index, 1);
    }

    getUserAndContent(userID: number) {
        let userAndContentDTO: GetUserAndContentDTO = new GetUserAndContentDTO;

        let user: User =  this.users.find((user) => {
            return user._id === parseInt(userID.toString());
        });

        let userBlogPosts: GetBlogPostAndCommentsDTO[] = this.blogPostsService.getBlogPosts().filter((blogPost) => {
            return blogPost.userID === parseInt(userID.toString());
        }).map((blogPost) => {
            let blogPostAndCommentsDTO = new GetBlogPostAndCommentsDTO();

            blogPostAndCommentsDTO.blogPost = blogPost;

            blogPostAndCommentsDTO.comments = this.commentsService.getComments().filter((comment) => {
                return comment.postID === blogPost._id;
            });

            return blogPostAndCommentsDTO;
        });

        userAndContentDTO.user = user;
        userAndContentDTO.blogPosts = userBlogPosts;

        return userAndContentDTO;
    }
}

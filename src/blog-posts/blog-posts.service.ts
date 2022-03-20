import { BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { resourceLimits } from 'worker_threads';
import { CreateBlogPostDTO } from './dto/blog-post.dto';
import { GetBlogPostDTO } from './dto/get-blog-post.dto';
import { BlogPost } from './models/BlogPost';

@Injectable()
export class BlogPostsService {
    constructor (private readonly usersService: UsersService) {}

    private blogPosts: BlogPost[] = [
        new BlogPost(0, "dummy post", "dummy content", 0),
        new BlogPost(1, "1", "post 1 of user 1", 1),
        new BlogPost(2, "2", "post 2 of user 1", 1),
        new BlogPost(3, "3", "post 3 of user 1", 1),
        new BlogPost(4, "4", "post 4 of user 1", 1),
        new BlogPost(5, "5", "post 5 of user 1", 1),
        new BlogPost(6, "6", "post 6 of user 1", 1),
        new BlogPost(7, "7", "post 7 of user 1", 1),
        new BlogPost(8, "8", "post 8 of user 1", 1),
        new BlogPost(9, "9", "post 9 of user 1", 1),
        new BlogPost(10, "10", "post 10 of user 1", 1),
        new BlogPost(11, "title", "post 1 of user 2", 2),
        new BlogPost(12, "title", "post 2 of user 2", 2),
        new BlogPost(13, "title", "post 3 of user 2", 2),
        new BlogPost(14, "title", "post 4 of user 2", 2),
        new BlogPost(15, "title", "post 5 of user 2", 2),
        new BlogPost(16, "1", "post 1 of user 3", 3),
        new BlogPost(17, "2", "post 2 of user 3", 3),
        new BlogPost(18, "1", "post 1 of user 4", 4),
        new BlogPost(19, "2", "post 2 of user 4", 4),
        new BlogPost(20, "3", "post 3 of user 4", 4),
        new BlogPost(21, "1", "post 1 of user 5", 5),
        new BlogPost(22, "2", "post 2 of user 5", 5),
        new BlogPost(23, "3", "post 3 of user 5", 5),
    ];

    private getBiggestBlogPostID(): number {
        let biggestID: number = 0;

        this.blogPosts.forEach(blogPost => {
            if(biggestID < blogPost._id) {
                biggestID = blogPost._id;
            }
        })

        return biggestID;
    }

    createBlogPost(body: CreateBlogPostDTO) {
        let blogPost: BlogPost;
        let _id = this.getBiggestBlogPostID() + 1;

        blogPost = new BlogPost(_id, body.title, body.content, body.userID);

        this.blogPosts.push(blogPost);
    }
    
    getBlogPostsOfAUserPaginated(userID: number, options: { page: number, limit: number }): GetBlogPostDTO[] {
        
        const user = this.usersService.getUsers()
        .find((user) => {
            return user._id === parseInt(userID.toString());
        })

        if(!user) {
            throw new BadRequestException(`No user with user ID = ${userID} was found!`);
        }

        const blogPostsOfAUser: GetBlogPostDTO[] = this.blogPosts.filter((blogPost) => { 
            return blogPost.userID === parseInt(userID.toString());
        }).map(blogPost => new GetBlogPostDTO(
            blogPost._id, 
            blogPost.title, 
            blogPost.content, 
            user
        ));

        if (blogPostsOfAUser.length === 0) {
            throw new BadRequestException(`No blog-post with user ID = ${userID} was found!`);
        }

        const startIndex = (options.page - 1) * options.limit;
        const endIndex = options.page * options.limit;

        return blogPostsOfAUser.slice(startIndex, endIndex);
    }
}


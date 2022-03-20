import { BlogPost } from "src/blog-posts/models/BlogPost";
import { User } from "src/users/models/User";

export class GetCommentDTO {
    _id: number;
    content: string;
    user: User;
    blogPost: BlogPost;

    constructor(_id: number, content: string, user: User, blogPost: BlogPost) {
        this._id = _id;
        this.content = content;
        this.user = user;
        this.blogPost = blogPost;
    }
}

import { BlogPost } from "../models/BlogPost";
import { Comment } from "src/comments/models/Comment";

export class GetBlogPostAndCommentsDTO {
    blogPost: BlogPost;
    comments: Comment[];
}
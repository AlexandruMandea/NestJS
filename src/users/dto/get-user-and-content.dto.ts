import { GetBlogPostAndCommentsDTO } from "src/blog-posts/dto/get-blog-post-and-comments.dto";
import { User } from "../models/User";

export class GetUserAndContentDTO {
    user: User;
    blogPosts: GetBlogPostAndCommentsDTO[];
}
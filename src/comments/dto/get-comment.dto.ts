import { BlogPost } from "src/blog-posts/models/BlogPost";
import { User } from "src/users/models/User";

export class GetCommentDTO {
    _id: number;
    content: string;
    user: User;

    constructor(_id: number, content: string, user: User) {
        this._id = _id;
        this.content = content;
        this.user = user;
    }
}

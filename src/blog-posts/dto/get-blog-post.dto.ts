import { User } from "src/users/models/User";

export class GetBlogPostDTO {
    _id: number;
    title: string;
    content: string;
    user: User;

    constructor(_id: number, title: string, content: string, user: User){
        this._id = _id;
        this.title = title;
        this.content = content;
        this.user = user;
    }
}
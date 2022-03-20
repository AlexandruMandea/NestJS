import { User } from "src/users/models/User";

export class BlogPost {
    _id: number;
    title: string;
    content: string;
    userID: number;

    constructor(_id: number, title: string, content: string, userID: number) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.userID = userID;
    }
}
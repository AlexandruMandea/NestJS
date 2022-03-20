export class Comment {
    _id: number;
    content: string;
    userID: number;
    postID: number;

    constructor(_id: number, content: string, userID: number, postID: number) {
        this._id = _id;
        this.content = content;
        this.userID = userID;
        this.postID = postID;
    }
}
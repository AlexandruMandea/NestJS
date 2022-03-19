export class User {
    _id: number;
    name: string;
    age: number;
    phoneNumber: string

    constructor(_id: number, name: string, age: number, phoneNumber: string) {
        this._id = _id;
        this.name = name;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }
}
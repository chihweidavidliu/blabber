import { ObjectID } from "mongodb";
import User from "../../models/User";

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

export const users = [
    {
        _id: userOneId,
        email: "chihweiliu1993@gmail.com",
        firstName: "Chih-Wei",
        lastName: "Liu",
    },
    { _id: userTwoId, email: "bob@gmail@gmail.com", firstName: "Bob", lastName: "Ross" },
];

export const populateUsers = (done: any): void => {
    User.deleteMany({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]).then(() => {
            done();
        });
    });
};

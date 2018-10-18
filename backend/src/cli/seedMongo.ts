import * as moment from "moment";
import mongoose, { URI } from "../db";
import { User } from "../user/User";
import UserCredential from "../user/UserCredential";
import { UserProfile } from "../user/UserProfile";
import UserProfileRepository from "../user/UserProfileRepository";
import UserRepository from "../user/UserRepository";
import UserService from "../user/UserService";

mongoose.connect(URI);

async function main() {
    const credentials = await UserService.createCredentials("test123");

    const users = [
        new User("maximgeerinck@hotmail.com", [credentials]),
        new User("geerinck.maxim@gmail.com", [credentials])
    ];

    const profiles = [
        new UserProfile({ user: users[0], name: "Maxim Geerinck", email: "maximgeerinck@hotmail.com" }),
        new UserProfile({ user: users[0], name: "Maxim Geerinck", email: "c4d3r@hotmail.com" }),
        new UserProfile({ user: users[1], name: "Maxim Geerinck", email: "geerinck.maxim@gmail.com" }),
    ];

    await Promise.all(users.map((user) => UserRepository.create(user)));
    await Promise.all(profiles.map((profile) => UserProfileRepository.create(profile)));
    process.exit(0);
}

try {
    main();
} catch (ex) {
    console.log(ex);
}

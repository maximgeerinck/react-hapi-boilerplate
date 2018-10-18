import mongoose from "../db";
import { MongoRepository } from "../models/Repository";
import UserProfileModel, { IUserProfile, UserProfile } from "./UserProfile";

class UserProfileRepository extends MongoRepository<UserProfile> {
    constructor() {
        super(UserProfileModel, "UserProfile");
    }

    public findByUser(userId: string) {
        return this.find({ user: userId });
    }
}

export default new UserProfileRepository();

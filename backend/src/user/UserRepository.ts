import mongoose from "../db";
import { MongoRepository } from "../models/Repository";
import User, { IUser, IUserModel, User as UserDomain } from "./User";
import { IUserCredential } from "./UserCredential";

interface IUserRepository {
    findCredentialByEmail(email: string): Promise<UserDomain>;
    findOneByEmail(email: string): Promise<UserDomain>;
}

class UserRepository extends MongoRepository<UserDomain> implements IUserRepository {
    constructor() {
        super(User, "User");
    }

    public removeItem(id: string, userId: mongoose.Types.ObjectId): Promise<boolean> {
        return this.model
            .update(
                { _id: userId },
                {
                    $pull: {
                        portfolio: { _id: id }
                    }
                }
            )
            .then((user) => {
                return true;
            });
    }

    public update(id: string, item: UserDomain): Promise<UserDomain> {
        item.token = undefined;

        return this.model.update({ _id: id }, item.toModel()).then((result) => {
            if (result && !result.ok) {
                Promise.reject(result);
            }
            return item;
        });
    }

    public findCredentialByEmail(email: string): Promise<UserDomain> {
        return this.findOne({
            email,
            credentials: { $elemMatch: { expired: false } }
        });
    }

    public findOneByEmail(email: string): Promise<UserDomain> {
        return this.model
            .findOne({ email })
            .select("-credentials")
            .then((user) => {
                return this.parse(user);
            });
    }
}

export default new UserRepository();

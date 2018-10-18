import * as uuid from "uuid";
import NotFoundException from "../exception/NotFoundException";
import { comparePassword, genSalt, hashPassword } from "../utils/cypher-util";
import * as CypherUtil from "../utils/cypher-util";
import { IUser, User } from "./User";
import UserCredential from "./UserCredential";
import UserRepository from "./UserRepository";

class UserService {
    public findOneById(id: any) {
        return UserRepository.findOneById(id);
    }

    public findUserByEmail(email: string): Promise<User> {
        return UserRepository.findOneByEmail(email);
    }

    public findOneByEmailAndToken(email: string, token: string): Promise<User> {
        return UserRepository.findOne({ email, token });
    }

    public async verifyUser(email: string, password: string): Promise<IUser> {

        try {
            const user = await UserRepository.findCredentialByEmail(email);
            const result = await comparePassword(password, user.credentials[user.credentials.length - 1].password);
            if (!result) {
                throw new Error(`Could not find user by email ${email}`);
            }
            return user;
        } catch (ex) {
            throw new NotFoundException(ex.message);
        }
    }

    public async requestToken(email: string): Promise<string> {
        const token = await CypherUtil.genToken();
        const updatedUser = await UserRepository.findOneAndUpdate({ email }, { token });
        return updatedUser.token;
    }

    public async createUser(email: string, password: string): Promise<IUser> {
        const credential = new UserCredential("", "");
        credential.requestedOn = new Date();

        const salt = await genSalt();
        credential.salt = salt;

        const hash = await hashPassword(password, salt);
        credential.password = hash;

        const user = new User(email, [credential]);
        return UserRepository.create(user);
    }

    public async createCredentials(password: string): Promise<UserCredential> {
        const salt = await genSalt();
        const hash = await hashPassword(password, salt);

        return new UserCredential(hash, salt);
    }

    public update(user: User): Promise<User> {
        return UserRepository.update(user.id, user);
    }

    public findUsersWithoutCredentials(): Promise<User[]> {
        return UserRepository.find({ credentials: { $size: 0 } });
    }

    public async addCredentials(user: User, password: string): Promise<User> {
        const credentials = await this.createCredentials(password);
        user.addCredentials(credentials);
        return this.update(user);
    }
}

export default new UserService();

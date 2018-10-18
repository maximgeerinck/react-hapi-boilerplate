import * as Boom from "boom";
import * as Hapi from "hapi";
import { MongoError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { comparePassword } from "../utils/cypher-util";
import ValidationError from "../validation/ValidationError";
import Validator from "../validation/Validator";
import { IUser, User } from "./User";
import UserRepository from "./UserRepository";
import UserService from "./UserService";

// interface ICreateValidationErrors {
//     email?: string,
//     password?: string,
//     domains?: Array<string>
// }

interface IMongooseError extends MongooseError {
    errors: any;
}

class UserController {
    public async create(req: Hapi.Request) {
        const { email, password, domains } = req.payload as any;

        // TODO: Extract different validation methods
        const validator = new Validator();

        try {
            await UserService.createUser(email, password);
            return;
        } catch (err) {
            const validationErrors: any = {};

            if (err instanceof MongoError) {
                if (err.message.indexOf("duplicate key") > -1)
                    validator.addError(new ValidationError("email", "email.inUse"));
            } else if (err.name === "ValidationError") {
                for (const field in err.errors) {
                    const f = field.split("."); // for array validation
                    validator.addError(new ValidationError(f[0], err.errors[field].message));
                }
            } else {
                console.log(err);
            }
            return validator.isValid()
                ? Boom.badRequest()
                : validator.generateBadRequest();
        }
    }

    public async update(req: Hapi.Request) {

        try {
            const { user } = req.payload as any;
            const userObj = User.parse(user);
            const u = await UserService.update(userObj);
            return u;
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public me(req: Hapi.Request) {
        const user: User = req.auth.credentials as User;
        delete user.credentials;
        return user;
    }

    public async updatePreferences(req: Hapi.Request) {
        const preferences = req.payload as any;

        const user = req.auth.credentials as User;
        Object.assign(user.preferences, preferences);

        try {
            const u = await UserService.update(user);
            return u;
        } catch (ex) {
            console.log(ex);
            return Boom.badRequest();
        }
    }

    public async changePassword(req: Hapi.Request) {
        const { currentPassword, newPassword } = req.payload as any;

        const user = req.auth.credentials as User;
        const validator = new Validator();

        try {
            const lastPassword = user.credentials[user.credentials.length - 1].password;
            const correct = await comparePassword(currentPassword, lastPassword);
            if (!correct) {
                // not correct
                validator.addError(
                    new ValidationError("currentPassword", "string.password_incorrect"),
                );
                throw new Error("E_VALIDATION");
            }
            await UserService.addCredentials(req.auth.credentials as User, newPassword);
            return { success: true };
        } catch (ex) {
            console.log(ex);
            return validator.generateBadRequest();

        }
    }
}

export default new UserController();

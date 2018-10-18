import { Document, Model, Schema } from "mongoose";
import mongoose from "../db";
import AbstractModel from "../models/AbstractModel";
import { genSalt, hashPassword } from "../utils/cypher-util";
import UserCredential, { IUserCredential } from "./UserCredential";
import UserPreferences, { IUserPreferences } from "./UserPreferences";

export interface IUser {
    id: any;
    email: string;
    enabled: boolean;
    expired: boolean;
    credentials?: IUserCredential[];
    activatedOn?: Date;
    createdOn: Date;
    updatedOn: Date;
    token: string;
    preferences: IUserPreferences;
}

export interface IUserModel extends IUser, Document {
    _id: any;
    id: null;
}

export class User extends AbstractModel implements IUser {
    public static parse(user: IUser): User {
        const credentials = user.credentials
            ? user.credentials.map((credential: any) => UserCredential.parse(credential))
            : null;

        const userObj = new User(user.email, credentials, user.createdOn, (user as any)._id ? (user as any)._id.toHexString() : user.id);
        userObj.token = user.token;
        userObj.updatedOn = user.updatedOn;
        userObj.preferences = UserPreferences.parseDomain(user.preferences);

        return userObj;
    }

    public enabled: boolean = true;
    public expired: boolean = false;
    public updatedOn: Date = new Date();
    public activatedOn: Date;
    public token: string = null;
    public preferences: UserPreferences = new UserPreferences();
    public credentials: UserCredential[] = [];
    public id: string;

    constructor(
        readonly email: string,
        credentials: UserCredential[] = [],
        readonly createdOn: Date = new Date(),
        id?: string
    ) {
        super();
        this.id = id ? id : new mongoose.Types.ObjectId().toHexString();
        this.credentials = credentials;
    }

    public addCredentials(credentials: UserCredential) {
        this.credentials.push(credentials);
    }

    public toResponse() {
        const response = this;
        delete (response as any).createdOn;
        delete (response as any).credentials;
        delete (response as any).updatedOn;
        delete (response as any).__v;
        delete (response as any)._id;
        return response;
    }

}

export const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        enabled: { type: Boolean, required: true, default: true },
        expired: { type: Boolean, required: true, default: false },
        credentials: [
            {
                password: { type: String, required: true },
                salt: { type: String, required: true },
                requestedOn: { type: Date, required: true, default: Date.now },
                expired: { type: Boolean, required: true, default: false },
                expiredOn: { type: Date, required: false },
            },
        ],
        activated_on: { type: String },
        token: { type: String, required: false },
        preferences: {}
    },
    { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } },
);

export default mongoose.model<IUserModel>("User", UserSchema, "users");

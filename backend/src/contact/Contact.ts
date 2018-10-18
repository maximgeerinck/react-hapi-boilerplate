import { Document, Model, Schema } from "mongoose";
import mongoose from "../db";
import AbstractModel from "../models/AbstractModel";
import { IUser, User } from "../user/User";
import { IUserProfile, UserProfile } from "../user/UserProfile";

export interface IContact {
    profile: IUserProfile;
    from: IUser;
    metAt?: string;
    notes?: string;
    id?: string;
}

export interface IContactModel extends Document {
    _id: Schema.Types.ObjectId;
    profile: Schema.Types.ObjectId;
    from: Schema.Types.ObjectId;
    metAt?: string;
    notes?: string;
    id?: string;
}

export class Contact extends AbstractModel implements IContact {

    public static parse(contact: IContact): Contact {
        const newContact: Contact = new Contact();
        const newObj = Object.assign(newContact, contact);
        newObj.from = User.parse(contact.from) || null;
        newObj.profile = UserProfile.parse(contact.profile) || null;
        return newObj;
    }

    public metAt?: string;
    public notes?: string;
    public id?: string;
    public from: User;
    public profile: UserProfile;

    constructor(profile: UserProfile = null, from: User = null) {
        super();
        this.from = from;
        this.profile = profile;
    }

    public toModel(): IContactModel {
        const model = super.toModel();
        return {
            _id: model.id,
            profile: model.profile.id,
            from: model.from.id,
            metAt: model.metAt,
            notes: model.notes
        } as any;
    }

    public toResponse() {
        const response = super.toResponse();
        response.from = response.from.toResponse ? response.from.toResponse() : response.from;
        response.profile = response.profile.toResponse ? response.profile.toResponse() : response.profile;
        return response;
    }
}

export const ContactSchema = new mongoose.Schema(
    {
        profile: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        from: { type: Schema.Types.ObjectId, ref: "User" },
        notes: { type: String },
        metAt: { type: String }
    },
    { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } },
);

export default mongoose.model<IContactModel>("Contact", ContactSchema, "contacts");

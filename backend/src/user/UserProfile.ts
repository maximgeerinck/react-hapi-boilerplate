import { Document, Model, Schema } from "mongoose";
import mongoose from "../db";
import AbstractModel from "../models/AbstractModel";
import { stripUrl } from "./ProfileHelper";
import { IUser, User } from "./User";

export interface ISocialMedia {
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
}

export interface IImage {
  original: string;
  thumbnail: string;
}

export interface ITelephone {
  [telKey: string]: string;
}

export interface IUserProfile {
  name: string;
  telephone?: ITelephone;
  companyName?: string;
  companySubheader?: string;
  email: string;
  function?: string;
  website?: string;
  logo?: string;
  profilePicture?: string;
  socialMedia?: ISocialMedia;
  theme?: any;
  btwNr?: string;
  bankAccountNumber?: string;
  adress?: string;
  user: IUser;
  id?: string;
  iconProfile?: IImage;
  iconCompany?: IImage;
}

export interface IUserProfileModel extends IUserProfile, Document {
  _id: Schema.Types.ObjectId;
  id: null;
}

export class UserProfile extends AbstractModel implements IUserProfile {

  public static parse(profile: any) {
    return new UserProfile({ id: profile._id, ...profile });
  }

  public name: string;
  public email: string;
  public telephone?: ITelephone; // in international format
  public function?: string;
  public website?: string;
  public companyName?: string;
  public companySubheader?: string;
  public logo?: string;
  public profilePicture?: string;
  public socialMedia?: ISocialMedia;
  public theme?: any;
  public btwNr?: string;
  public bankAccountNumber?: string;
  public adress?: string;
  public user: User;
  public id?: string;
  public iconProfile?: IImage;
  public iconCompany?: IImage;

  constructor({ user, firstName = "", lastName = "", email = "", ...rest }) {
    super();
    this.user = user;
    this.name = firstName;
    this.email = email;
    Object.assign(this, rest);
  }

  public toModel() {
    const model = super.toModel();
    model.user = this.user.id;
    if (model.iconCompany) {
      model.iconCompany = {
        original: stripUrl(model.iconCompany.original),
        thumbnail: stripUrl(model.iconCompany.thumbnail)
      };
    }
    if (model.iconProfile) {
      model.iconProfile = {
        original: stripUrl(model.iconProfile.original),
        thumbnail: stripUrl(model.iconProfile.thumbnail)
      };
    }

    return model;
  }

  public toResponse() {
    const response = this;
    if (this.iconCompany) {
      response.iconCompany = {
        original: `http://localhost:5000/assets/profiles/${this.user}/${this.iconCompany.original}`,
        thumbnail: `http://localhost:5000/assets/profiles/${this.user}/${this.iconCompany.thumbnail}`,
      };
    }

    if (this.iconProfile) {
      response.iconProfile = {
        original: `http://localhost:5000/assets/profiles/${this.user}/${this.iconProfile.original}`,
        thumbnail: `http://localhost:5000/assets/profiles/${this.user}/${this.iconProfile.thumbnail}`,
      };
    }

    delete (response as any).createdOn;
    delete (response as any).updatedOn;
    delete (response as any).__v;
    delete (response as any)._id;
    return response;
  }
}

export const UserProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    telephone: { type: Schema.Types.Mixed },
    companyName: { type: String },
    companySubheader: { type: String },
    email: { type: String, required: true },
    function: { type: String },
    website: { type: String },
    logo: { type: String },
    profilePicture: { type: String },
    socialMedia: {
      linkedIn: { type: String },
      twitter: { type: String },
      facebook: { type: String },
    },
    theme: { type: String },
    btwNr: { type: String },
    bankAccountNumber: { type: String },
    adress: { type: String },
    iconProfile: {
      original: { type: String },
      thumbnail: { type: String },
    },
    iconCompany: {
      original: { type: String },
      thumbnail: { type: String },
    }
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } },
);

export default mongoose.model<IUserProfileModel>("UserProfile", UserProfileSchema, "user_profiles");

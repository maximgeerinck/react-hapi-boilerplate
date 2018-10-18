import AbstractModel from "../models/AbstractModel";

export interface IUserCredential {
  password: string;
  salt: string;
  requestedOn: Date;
  expired: boolean;
  expiredOn?: Date;
}

export default class UserCredential extends AbstractModel implements IUserCredential {

  public static parse(credential: IUserCredential): UserCredential {
    const credentialObj = new UserCredential(credential.password, credential.salt, credential.expired);
    credentialObj.requestedOn = credential.requestedOn;
    credentialObj.expiredOn = credential.expiredOn;
    return credentialObj;
  }

  public requestedOn: Date = new Date();
  public expiredOn?: Date;
  public password: string;
  public salt: string;

  constructor(password: string, salt: string, readonly expired: boolean = false) {
    super();
    this.password = password;
    this.salt = salt;
  }
}

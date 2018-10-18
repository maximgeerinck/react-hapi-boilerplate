import AbstractModel from "../models/AbstractModel";

export interface IUserPreferences {

}

export interface IUserPreferencesModel extends IUserPreferences { }

export default class UserPreferences extends AbstractModel implements IUserPreferences {
    public static parse(user: IUserPreferencesModel): UserPreferences {
        return new UserPreferences();
    }

    public static parseDomain(user: IUserPreferences): UserPreferences {
        return new UserPreferences();
    }

    public currency: string = "USD";
    public initialInvestment: number = 0;

    constructor() {
        super();
    }
}

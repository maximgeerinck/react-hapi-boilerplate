import { Contact } from "../contact/Contact";
import { User } from "../user/User";
import { UserProfile } from "../user/UserProfile";

export default class ModelFactory {
    public static parse(type: string, model: any): any {
        switch (type) {
            case "Contact":
                return Contact.parse(model);
            case "UserProfile":
                return UserProfile.parse(model);
            case "User":
                return User.parse(model);
        }
    }

    public static parseDomain(type: string, model: any): any {
        switch (type) {
            case "Contact":
                return Contact.parse(model);
            case "UserProfile":
                return UserProfile.parse(model);
            case "User":
                return User.parse(model);
        }
    }
}

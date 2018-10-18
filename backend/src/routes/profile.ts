import * as Joi from "joi";
import ProfileController from "../user/ProfileController";

module.exports = [
    {
        method: "GET",
        path: "/profiles",
        handler: ProfileController.index
    },
    {
        method: "POST",
        path: "/profile",
        handler: ProfileController.save,
        config: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    telephone: Joi.string(),
                    companyName: Joi.string(),
                    companySubheader: Joi.string(),
                    email: Joi.string().email().required(),
                    function: Joi.string(),
                    website: Joi.string().uri(),
                    logo: Joi.string(),
                    profilePicture: Joi.string(),
                    socialMedia: Joi.string(),
                    theme: Joi.string(),
                    btwNr: Joi.string(),
                    bankAccountNumber: Joi.string(),
                    adress: Joi.string(),
                    user: Joi.string(),
                    id: Joi.string(),
                    iconProfile: Joi.object(),
                    iconCompany: Joi.object(),
                }
            }
        }
    },
    {
        method: "GET",
        path: "/profile/{profileId}",
        handler: ProfileController.get,
        config: {
            validate: {
                params: {
                    profileId: Joi.string()
                }
            }
        }
    },
    {
        method: "PUT",
        path: "/profile/image",
        handler: ProfileController.uploadIcon,
        config: {
            // validate: {
            //     payload: Joi.binary().max(5000000)
            // },
            payload: {
                output: "stream",
                parse: true
            }
        }
    },
];

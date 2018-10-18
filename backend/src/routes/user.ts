import UserController from "../user/UserController";
const BaseJoi = require("joi");
import EmailInUseConstraint from "../validation/EmailInUseConstraint";

const Joi = BaseJoi.extend(EmailInUseConstraint);

module.exports = [
    {
        method: "POST",
        path: "/user/create",
        handler: UserController.create,
        config: {
            auth: false,
            validate: {
                payload: {
                    email: Joi.string()
                        .email()
                        .required(),
                    password: Joi.string()
                        .min(6)
                        .required(),
                },
            },
        },
    },
    {
        method: "GET",
        path: "/user/me",
        handler: UserController.me,
    },
    {
        method: "POST",
        path: "/user/update",
        handler: UserController.update,
    },
    {
        method: "POST",
        path: "/user/preferences/update",
        handler: UserController.updatePreferences,
        config: {
            validate: {
                payload: {
                    currency: Joi.string(),
                    initialInvestment: Joi.number(),
                },
            },
        },
    },
    {
        method: "POST",
        path: "/user/password",
        handler: UserController.changePassword,
        config: {
            validate: {
                payload: {
                    currentPassword: Joi.string().required(),
                    newPassword: Joi.string().required(),
                },
            },
        },
    },
];

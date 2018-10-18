import * as Joi from "joi";
import ContactController from "../contact/ContactController";

module.exports = [
    {
        method: "GET",
        path: "/contacts",
        handler: ContactController.index
    },
    {
        method: "POST",
        path: "/contact",
        handler: ContactController.addByEmail,
        config: {
            validate: {
                payload: {
                    email: Joi.string().email()
                }
            }
        }
    },
    {
        method: "GET",
        path: "/contact/{contactId}",
        handler: ContactController.get,
        config: {
            validate: {
                params: {
                    contactId: Joi.string()
                }
            }
        }
    }
];

import * as Boom from "boom";
import * as Hapi from "hapi";
import * as JWT from "jsonwebtoken";
import config from "../config";
import UserService from "../user/UserService";
import * as CypherUtil from "../utils/cypher-util";
import { sendMail } from "../utils/EmailHelper";

interface IForgotPasswordRequest extends Request {
    payload: {
        email: string; // the email to request
    };
}

interface IResetPasswordRequest extends Request {
    payload: {
        token: string; // the token received in the email to reset
        email: string; // the email of the account to reset
        password: string; // new password
    };
}

interface IAuthenticationToken {
    user: {
        id: string;
        email: string;
    };
}

class AuthenticationController {
    public async authenticate(req: Hapi.Request) {

        const { email, password } = req.payload as any;

        try {
            const user = await UserService.verifyUser(email, password);
            if (!user) {
                return Boom.unauthorized("E_INVALID_CREDENTIALS");
            }

            const tokenObject: IAuthenticationToken = {
                user: { id: user.id, email: user.email },
            };

            const token = JWT.sign(tokenObject, config.authentication.jwt.secret);
            return { token };
        } catch (ex) {
            return Boom.unauthorized("E_INVALID_CREDENTIALS");
        }

    }

    public async forgotPassword(req: IForgotPasswordRequest) {
        const { email } = req.payload;

        try {
            const token = await UserService.requestToken(email);
            await sendMail(
                [email],
                "Forgot password",
                `Please visit <a href="https://icotracker.org/reset/${email}/${token}">http://icotracker.org/reset/${email}/${token}</a> to reset your password!`,
            );
            return { success: true };

        } catch (ex) {
            console.log(ex);
            return { success: false };
        }
    }

    public async resetPassword(req: IResetPasswordRequest) {
        const { token, email, password } = req.payload;

        try {
            const user = await UserService.findOneByEmailAndToken(email, token);
            const newUser = await UserService.addCredentials(user, password);
            return { success: true };
        } catch (ex) {
            console.log(ex);
            return { success: false };
        }
    }
}
export default new AuthenticationController();

import AuthenticationController from "../auth/AuthenticationController";

module.exports = [
    {
        method: "POST",
        path: "/authenticate",
        handler: AuthenticationController.authenticate,
        config: { auth: false },
    },
    {
        method: "POST",
        path: "/forgot",
        handler: AuthenticationController.forgotPassword,
        config: { auth: false },
    },
    {
        method: "POST",
        path: "/reset",
        handler: AuthenticationController.resetPassword,
        config: { auth: false },
    }
];

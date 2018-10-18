import React from "react";
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";

import NotFoundPage from "./components/NotFoundPage";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./user/RegisterPage";
import ForgotPasswordPage from "./authentication/ForgotPasswordPage";
import ResetPasswordPage from "./authentication/ResetPasswordPage";
import ChangePasswordPage from "./user/ChangePasswordPage";
import AccountPage from "./user/AccountPage";
import IndexPage from "./main/IndexPage";

export default () => (
    <Switch>

        <PrivateRoute path="/account" component={AccountPage} />
        <PrivateRoute path="/password" component={ChangePasswordPage} />

        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgot" component={ForgotPasswordPage} />
        <Route path="/reset/:email/:token" component={ResetPasswordPage} />
        <Route path="*" component={NotFoundPage} />

    </Switch>
)


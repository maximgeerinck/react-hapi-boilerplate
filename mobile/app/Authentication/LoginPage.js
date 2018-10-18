import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../Components/Page";
import * as AuthActions from "./AuthenticationActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import ValidationHelper, { ValidationType } from "../helpers/ValidationHelper";
import Loader from "../Components/Loader";

import LoginForm from "./LoginForm";

class LoginPage extends Component {
    _onLogin = (email, password) => {
        this.props.authActions.authenticate(email, password);
    };

    render() {

        console.log(this.props.auth);
        const isInvalid = this.props.auth.form.get("isInvalid");
        // const isInvalid = this.props.auth.form.isInvalid; 
        const error = this.props.auth.error;

        let submitting, form;

        if (this.props.auth.form.get("isSubmitting")) {
            // if (this.props.auth.form.isSubmitting) {
            submitting = (
                <View className={pageStyle.container}>
                    <Loader />
                    <Text>Logging in...</Text>
                </View>
            );
        } else {
            form = <LoginForm onSubmit={this._onLogin} isInvalid={isInvalid} error={error} />;
        }

        return (
            <Page title="Login">
                {submitting}
                {form}
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(AuthActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

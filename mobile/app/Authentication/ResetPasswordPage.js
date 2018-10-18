import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import * as UserActions from "../user/UserActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import formStyles from "../forms.scss";
import pageStyle from "../components/page.scss";

export class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: ""
        };
    }

    _onReset = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.props.token, this.props.email, this.state.password);
        return 0;
    };

    render() {
        return (
            <form className={formStyles.formFullPage} onSubmit={this._onReset}>
                <div className={formStyles.group}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className={formStyles.group}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={this.state.confirmPassword}
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                    />
                </div>

                <div className={formStyles.group}>
                    <button type="submit" className={formStyles.button}>
                        Reset password
                    </button>
                </div>

                <div className={formStyles.noAccount}>
                    <Link to="/register">No account yet? Register here</Link>
                </div>
            </form>
        );
    }
}

ResetPasswordForm.PropTypes = {
    onSubmit: PropTypes.func.isRequired
};

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
    }

    _onReset = (token, email, password) => {
        this.props.userActions.resetPassword(token, email, password);
        this.setState({ submitted: true });
    };

    render() {
        const details = !this.state.submitted ? (
            <ResetPasswordForm
                onSubmit={this._onReset}
                token={this.props.params.token}
                email={this.props.params.email}
            />
        ) : (
            <div className={pageStyle.container}>
                <p>Your password has been reset succesfully!</p>
            </div>
        );

        return (
            <Page title="Reset Password" custom className={pageStyle.focused}>
                {details}
            </Page>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);

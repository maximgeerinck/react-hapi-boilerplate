import React, { Component } from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import * as UserActions from "../user/UserActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";

import formStyles from "../forms.scss";
import pageStyle from "../components/page.scss";

export class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
    }

    _onForgot = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.email);
        return 0;
    };

    render() {
        return (
            <form className={formStyles.formFullPage} onSubmit={this._onForgot}>
                <div className={formStyles.group}>
                    <label htmlFor="Email">Email</label>
                    <input
                        type="email"
                        placeholder="name@provider.com"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className={formStyles.group}>
                    <button type="submit" className={formStyles.button}>
                        Request password
                    </button>
                </div>
                <div className={formStyles.noAccount}>
                    <Link to="/register">No account yet? Register here</Link>
                </div>
            </form>
        );
    }
}

ForgotPasswordForm.PropTypes = {
    onSubmit: PropTypes.func.isRequired
};

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
    }

    _onForgot = (email, password) => {
        this.props.userActions.requestPassword(email);
        this.setState({ submitted: true });
    };

    render() {
        const details = !this.state.submitted ? (
            <ForgotPasswordForm onSubmit={this._onForgot} />
        ) : (
            <div className={pageStyle.container}>
                <p>Please check your inbox with a link to reset your email</p>
            </div>
        );

        return (
            <Page title="Forgot Password" custom className={pageStyle.focused}>
                {details}
            </Page>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);

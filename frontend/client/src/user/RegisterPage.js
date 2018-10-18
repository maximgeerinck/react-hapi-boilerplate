import * as React from "react";
import Page from "../components/Page";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as UserActions from "./UserActions";
import pageStyle from "../components/page.scss";
import { Link } from "react-router-dom";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import styles from "../authentication/login.scss";

import Loader from "../components/Loader";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
        };
    }

    onCreate = e => {
        e.preventDefault();
        this.props.onCreate({
            password: this.state.password,
            email: this.state.email,
        });
        return false;
    };

    onChange = (name, value) => {
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    render() {
        return (
            <Form data={this.state} onChange={this.onChange} className={styles.form} onSubmit={this.onCreate} validation={this.props.validationErrors}>
                <Input
                    name="email"
                    label="E-mail"
                    onchange={this.onEmailChange}
                    className={styles.input} wrapperClassName={styles.wrapper}
                />

                <Input
                    name="password"
                    label="Password"
                    type="password"
                    onchange={this.onPasswordChange}
                    className={styles.input} wrapperClassName={styles.wrapper}
                />

                <button type="submit" className={styles.loginButton}>
                    Create your account
                </button>

                <div className={styles.link}>
                    <Link to="/login">Already have an account? Login here</Link>
                </div>
            </Form>
        );
    }
}

RegisterForm.PropTypes = {
    onCreate: PropTypes.func.isRequired,
    validationErrors: PropTypes.object.isRequired,
};

RegisterForm.defaultProps = {
    validationErrors: {},
};

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationSucceeded: false,
        };
    }

    _createAccount = values => {
        this.props.userActions.create(values);
    };

    render() {
        // const validationErrors = this.props.user.form.get('validationErrors');
        const validationErrors = this.props.user.form.get("validationErrors");

        let submitting = null,
            successfulMessage = null,
            form = null;

        if (this.props.user.form.get("isSubmitting")) {
            submitting = (
                <div className={pageStyle.container}>
                    <Loader />
                    <div>Registering...</div>
                </div>
            );
        }

        if (this.props.user.form.get("succeeded")) {
            successfulMessage = (
                <div className={pageStyle.container}>
                    <p>Registration successful! You may login now.</p>
                </div>
            );
            setTimeout(() => {
                this.props.history.push("/login");
            }, 3000);
        }

        if (!this.props.user.form.get("isSubmitting") && !this.props.user.form.get("succeeded")) {
            form = (
                <RegisterForm
                    onCreate={this._createAccount}
                    validationErrors={validationErrors || {}}
                />
            );
        }

        return (
            <Page title="Register" custom>
                {submitting}
                {successfulMessage}
                {form}
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

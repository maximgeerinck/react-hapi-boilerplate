import * as React from "react";
import PropTypes from "prop-types";
import Page from "../components/Page";
import * as AuthActions from "./AuthenticationActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import ValidationHelper, { ValidationType } from "../helpers/ValidationHelper";
import Loader from "../components/Loader";

import formStyles from "../forms.scss";
import styles from "./login.scss";
import pageStyle from "../components/page.scss";

export class LoginForm extends React.Component {

    state = {
        email: "",
        password: null,
        rememberMe: false,
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    onChange = (name, value) => {
        const state = this.state;
        state[name] = value;
        this.setState(state);
    }

    _onLogin = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.email, this.state.password);
        return 0;
    };

    render() {
        let errorContainer = this.props.isInvalid ? (
            <div className={formStyles.validationSummary}>
                {ValidationHelper.constructMessage(ValidationType.V_LOGIN_COMBO_INCORRECT)}
            </div>
        ) : null;

        if (this.props.error) {
            errorContainer = (
                <div className={formStyles.validationSummary}>
                    {ValidationHelper.constructMessage(ValidationType.TIMEOUT)}
                </div>
            );
        }

        return (
            <Form data={this.state} onChange={this.onChange} onSubmit={this._onLogin} className={styles.form}>

                <Input name="email" label="E-mail" className={styles.input} wrapperClassName={styles.wrapper} />
                <Input name="password" label="Password" type="password" className={styles.input} wrapperClassName={styles.wrapper} />

                <button type="submit" className={styles.loginButton}>
                    Login
                </button>

                {errorContainer}

                <div className={styles.link}>
                    <Link to="/forgot">Forgot password?</Link>
                </div>

                <div className={formStyles.noAccount}>
                    <Link to="/register">Don't have an account yet?</Link>
                </div>
            </Form>
        );
    }
}

class LoginPage extends React.Component {
    _onLogin = async (email, password) => {
        await this.props.authActions.authenticate(email, password);
        this.props.history.push("/");
    };

    render() {
        const isInvalid = this.props.auth.form.get("isInvalid");
        const error = this.props.auth.error;

        let submitting, form;
        if (this.props.auth.form.get("isSubmitting")) {
            submitting = (
                <div className={pageStyle.container}>
                    <Loader />
                    <div>Logging in...</div>
                </div>
            );
        } else {
            form = <LoginForm onSubmit={this._onLogin} isInvalid={isInvalid} error={error} />;
        }

        return (
            <Page title="Login" custom>
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

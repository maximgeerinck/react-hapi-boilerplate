import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "./UserActions";
import Page from "../components/Page";
import Loader from "../components/Loader";
import ChangePasswordForm from "./ChangePasswordForm";
import styles from "./account.scss";
import pageStyle from "../components/page.scss";
import AccountNavigation from "./AccountNavigation";

class ChangePasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password_mismatch: false,
        };
    }

    componentWillMount() {
        if (!this.props.user.isLoaded) this.props.userActions.me();
    }

    change = (currentPassword, newPassword, newPasswordConfirm) => {
        if (newPassword !== newPasswordConfirm) {
            return this.setState({ password_mismatch: true });
        }
        this.props.userActions.changePassword(currentPassword, newPassword);
    };

    render() {
        //TODO: Add loading page
        if (!this.props.user.isLoaded)
            return (
                <Page title="Account">
                    <Loader />
                </Page>
            );

        const user = this.props.user.get("user").toObject();

        let successfulMessage, submitting, form;

        if (this.props.user.form.get("succeeded")) {
            successfulMessage = (
                <div className={pageStyle.container}>
                    <p>Your password has been changed!</p>
                </div>
            );
            setTimeout(() => {
                this.props.history.push("/");
            }, 3000);
        }

        if (this.props.user.form.get("isSubmitting")) {
            submitting = (
                <div className={pageStyle.container}>
                    <Loader />
                    <div>Changing password...</div>
                </div>
            );
        }

        if (!this.props.user.form.get("isSubmitting") && !this.props.user.form.get("succeeded")) {
            form = (
                <ChangePasswordForm
                    onChange={this.change}
                    passwordsMismatch={this.state.password_mismatch}
                    validationErrors={this.props.user.form.get("validationErrors")}
                />
            );
        }

        return (
            <Page title="Change Password">
                <div className={styles.welcome}>
                    Welcome back <span className={styles.strong}>{user.email}</span>
                </div>

                <AccountNavigation active="change_password" />

                <h2>Change your password</h2>

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);

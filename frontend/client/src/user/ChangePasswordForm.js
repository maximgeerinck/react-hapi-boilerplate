import * as React from "react";
import PropTypes from "prop-types";
import formStyles from "../forms.scss";
import ValidationHelper from "../helpers/ValidationHelper";

class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: undefined,
            password: undefined,
            confirmPassword: undefined
        };
    }

    _onChange = e => {
        e.preventDefault();
        this.props.onChange(this.state.currentPassword, this.state.password, this.state.confirmPassword);
        return 0;
    };

    render() {
        const validation = this.props.validationErrors;
        const passwordsMismatchMessage = this.props.passwordsMismatch
            ? "Confirmed password does not match new password"
            : undefined;

        return (
            <form className={formStyles.form} onSubmit={this._onChange}>
                <div className={formStyles.group}>
                    <label htmlFor="password">Current Password</label>
                    <input
                        type="password"
                        placeholder="Current password"
                        value={this.state.currentPassword}
                        onChange={e => this.setState({ currentPassword: e.target.value })}
                    />
                    <span className={formStyles.validationError}>
                        {ValidationHelper.parse(validation, "currentPassword", ["Current password"])}
                    </span>
                </div>

                <div className={formStyles.group}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <span className={formStyles.validationError}>
                        {ValidationHelper.parse(validation, "newPassword", ["New password"])}
                    </span>
                </div>

                <div className={formStyles.group}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        placeholder="confirm password"
                        value={this.state.confirmPassword}
                        onChange={e => this.setState({ confirmPassword: e.target.value })}
                    />
                    <span className={formStyles.validationError}>{passwordsMismatchMessage}</span>
                </div>

                <div className={formStyles.group}>
                    <button type="submit" className={formStyles.button}>
                        Change password
                    </button>
                </div>
            </form>
        );
    }
}

PasswordForm.propTypes = {
    passwordsMismatch: PropTypes.bool.isRequired
};
PasswordForm.defaultProps = {
    passwordsMismatch: false
};

export default PasswordForm;

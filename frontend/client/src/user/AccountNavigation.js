import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import * as AuthenticationActions from "../authentication/AuthenticationActions";

import styles from "./accountNavigation.scss";

class AccountNavigation extends React.Component {
    render() {
        const { active } = this.props;

        return (
            <div className={styles.navigation}>
                <ul>
                    <li className={active === "account" ? styles.active : undefined}>
                        <Link to="account">Account</Link>
                    </li>
                    <li className={active === "change_password" ? styles.active : undefined}>
                        <Link to="password">Change password</Link>
                    </li>
                    <li>
                        <Link to="/logout"
                            onClick={e => {
                                e.preventDefault();
                                this.props.authActions.logout();
                                this.props.history.replace("/");
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(AuthenticationActions, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountNavigation));

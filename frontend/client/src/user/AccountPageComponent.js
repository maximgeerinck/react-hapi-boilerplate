import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "./UserActions";
import styles from "./account.scss";
import AccountNavigation from "./AccountNavigation";
import Page from "../components/Page";
import Loader from "../components/Loader";

class AccountPageComponent extends React.Component {
    render() {
        //TODO: Add loading page
        if (!this.props.user.isLoaded)
            return (
                <Page title="Account">
                    <Loader />
                </Page>
            );

        const user = this.props.user.get("user").toObject();

        return (
            <Page title="Account">
                <div className={styles.welcome}>
                    Welcome back <span className={styles.strong}>{user.email}</span>
                </div>

                <AccountNavigation active="account" />

                {this.props.children}
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageComponent);

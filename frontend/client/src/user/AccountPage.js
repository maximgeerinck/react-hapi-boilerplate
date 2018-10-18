import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "./UserActions";
import Page from "../components/Page";
import styles from "./accountPage.scss";
import AccountPageComponent from "./AccountPageComponent";

class AccountPage extends React.Component {

    componentDidMount() {
        if (!this.props.user.isLoaded) this.props.userActions.me();
    }

    edit = (profileId) => {
        this.props.history.push(`/profile/${profileId}`)
    }

    render() {

        return (
            <Page custom className={styles.accountPage}>
                <AccountPageComponent />
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

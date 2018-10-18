import * as React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Page from "../components/Page";
import styles from "./navigationPage.scss"
import { Link, withRouter } from "react-router-dom";
import * as AuthenticationActions from "../authentication/AuthenticationActions";

class NavigationPage extends React.Component {
    render() {
        return (
            <Page className={styles.navigationPage}>
                <nav>
                    <ul>
                        <li><Link to="account">Account</Link></li>
                        <li><Link to="account">Contact Us</Link></li>
                        <li><Link to="logout"
                            onClick={e => {
                                e.preventDefault();
                                this.props.authActions.logout();
                                this.props.history.replace("/");
                            }}
                        >
                            Logout
                        </Link></li>
                    </ul>
                </nav>
            </Page>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationPage));

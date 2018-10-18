import * as React from "react";
import NavigationBar from "./NavigationBar";
import cx from "classnames";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as UserActions from "../user/UserActions";
import * as AuthActions from "../authentication/AuthenticationActions";
import page from "./page.scss";
import Loader from "./Loader";

class Page extends React.Component {

    static propTypes = {
        navigationBar: PropTypes.bool.isRequired,
        title: PropTypes.string,
        custom: PropTypes.bool.isRequired,
        className: PropTypes.string,
        loaded: PropTypes.bool,
    };

    static defaultProps = {
        navigationBar: true,
        custom: false,
        loaded: true,
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.userActions.me();
        }
    }

    logout = () => {
        this.props.authActions.logout();
        this.props.history.replace("/");
    };

    renderChildrenWrapper() {
        const { loaded, custom, children, title } = this.props;

        if (custom) {
            return loaded ? children : <Loader />;
        }

        const titleContainer = title ? <h1 className={page.title}>{title}</h1> : null;

        return loaded ?
            <React.Fragment>{titleContainer}<div className={page.content}>{children}</div></React.Fragment>
            : <div className={page.content}><Loader /></div>
    }

    renderNavigation() {
        const { navigationBar } = this.props;
        const isAuthenticated = this.props.auth.isAuthenticated;

        if (!navigationBar) {
            return;
        }

        return (
            <NavigationBar
                isAuthenticated={isAuthenticated}
                onLogout={this.logout}
                user={this.props.user.user.toObject()}
            />
        )

    }

    render() {
        const childrenWrapper = this.renderChildrenWrapper();
        const navbar = this.renderNavigation();
        const { custom } = this.props;

        return (
            <div className={cx(page.page)} style={this.props.style}>
                {navbar}
                <div className={cx(!custom && page.body, this.props.className)}>
                    {childrenWrapper}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    app: state.app,
});

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        authActions: bindActionCreators(AuthActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);

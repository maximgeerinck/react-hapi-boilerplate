import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as AuthActions from "./AuthenticationActions";

class LogoutPage extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.dispatch(AuthActions.logout());
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }

}

export default connect()(LogoutPage);
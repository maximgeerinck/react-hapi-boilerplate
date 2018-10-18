import * as React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import {
    Redirect,
    withRouter
} from "react-router-dom";

class PrivateRoute extends React.Component {

    componentDidMount() {
        const { isAuthenticated } = this.props

        if (!isAuthenticated) {
            this.props.history.replace("/login")
        }
    }

    render() {
        const { component: Component, isAuthenticated, ...rest } = this.props

        return (
            <Route {...rest} render={props => isAuthenticated ? <Component {...props} /> : (<Redirect to={{
                pathname: "/login", state: { from: props.location }
            }}
            />)} />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        currentURL: ownProps.location.pathname
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))

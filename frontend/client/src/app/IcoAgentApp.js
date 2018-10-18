import * as React from "react";
import { hot } from 'react-hot-loader'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as UserActions from "../user/UserActions";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
import "./index.scss";
import Router from "../routes";

const TRACKING_ID = "UA-114113847-1";

ReactGA.initialize(TRACKING_ID);
window.discovery = {
    version: 1,
    originalDocumentTitle:
        "Discord servers - Track and discover your favourite discord servers here",
};
const VERSION_KEY = "discovery_version";

class App extends React.Component {

    logPageView() {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }

    componentDidMount() {

        if (
            localStorage.getItem(VERSION_KEY) === null ||
            parseInt(localStorage.getItem(VERSION_KEY), 10) !== window.discovery.version
        ) {
            localStorage.clear();
            localStorage.setItem(VERSION_KEY, window.discovery.version);

            // only redirect if user key was found            
        }
    }

    render() {
        const routerComponent = <BrowserRouter onUpdate={this.logPageView} ><Router /></BrowserRouter>
        return routerComponent;
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

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));


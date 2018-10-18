import React, { Component } from "react";
import { connect } from "react-redux";
import errorStyles from "./error.scss";
import Error from "./Error";

class ErrorContainer extends Component {
    dismiss(key) {
        console.log(key);
        console.log("dismissing");
    }

    render() {
        const { app } = this.props;
        const errors = app.get("errors").toArray().map((error, key) => (
            <Error key={key} onClick={this.dismiss(key)}>
                {error}
            </Error>
        ));
        return <ul className={errorStyles.errors}>{errors}</ul>;
    }
}

ErrorContainer.propTypes = {};

const mapStateToProps = (state) => ({
    app: state.app
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);

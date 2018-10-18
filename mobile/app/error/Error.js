import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import styles from "./error.scss";

class Error extends Component {
    render() {
        const { key, onClick } = this.props;
        return (
            <li key={key}>
                <button onClick={onClick} className={styles.icon}>
                    <FontAwesome name="cancel" />
                </button>
                {this.props.children}
            </li>
        );
    }
}

Error.propTypes = {
    key: PropTypes.string.isRequired
};

export default Error;

import * as React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "./error.scss";

class Error extends React.Component {
    render() {
        const { key, onClick } = this.props;
        return (
            <li key={key}>
                <button onClick={onClick} className={styles.icon}>
                    <FontAwesomeIcon icon="cancel" />
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

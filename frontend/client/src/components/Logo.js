import * as React from 'react';
import styles from "./logo.scss";
import cx from "classnames";

class Logo extends React.Component {

    getLogoUrl() {
        return `/assets/logo.png`;
    }
    render() {
        return (
            <div className={cx(styles.logo, this.props.className)}>
                <img src={this.getLogoUrl()} alt="logo" /> meethings
            </div>
        );
    }
}

Logo.propTypes = {

};

export default Logo;
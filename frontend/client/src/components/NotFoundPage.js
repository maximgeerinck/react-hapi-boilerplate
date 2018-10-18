import React from "react";
import Page from "./Page";
import PropTypes from "prop-types";
import { CDN_BASE_PATH } from "../app/constants";
import cx from "classnames";
import { Link } from "react-router-dom";
import styles from "./notFoundPage.scss";

class NotFoundPage extends React.Component {
    render() {
        const { text, className } = this.props;

        return (
            <Page title={"Oops - Could not find the page"} className={cx(className, styles.page)}>
                <hr />
                <img src={`${CDN_BASE_PATH}icon-256x.png`} alt="logo" />
                <p>{text}</p>
                <ul className={styles.links}>
                    <li>
                        <Link to="/">Go home</Link>
                    </li>
                    <li>
                        <Link to="mailto:help@discordservers.online">Contact Us</Link>
                    </li>
                </ul>
            </Page>
        );
    }
}

NotFoundPage.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
};

NotFoundPage.defaultProps = {
    text: "We could not find the requested page.",
    title: "404 - Not Found",
};

export default NotFoundPage;

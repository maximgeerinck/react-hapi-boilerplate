import * as React from "react";
import styles from "./container.scss";
import cx from "classnames";

class Container extends React.Component {
    render() {
        const { className } = this.props;

        const c = className ? cx(styles.container, className) : styles.container;

        return <div className={c}>{this.props.children}</div>;
    }
}

export default Container;

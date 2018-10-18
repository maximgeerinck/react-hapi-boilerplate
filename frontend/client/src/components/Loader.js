import * as React from "react";

import style from "./loader.scss";
import PropTypes from "prop-types";
import cx from "classnames";

class Loader extends React.Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        className: PropTypes.object,
        text: PropTypes.string,
    };
    static defaultProps = {
        color: "white",
    };

    render() {
        const { className, text } = this.props;

        return (
            <div className={cx(className, style.loader)}>
                <div className={style.spinner} />
                {text}
            </div>
        );
    }
}

export default Loader;

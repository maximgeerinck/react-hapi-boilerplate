import * as React from "react";
import PropTypes from "prop-types";

class LinkComponent extends React.Component {
    render() {
        const ref = this.props.noref ? undefined : "ref=discordserverclub";
        if (!this.props.href) return;
        const href =
            this.props.href.indexOf("?") >= 0
                ? `${this.props.href}&${ref}`
                : `${this.props.href}?${ref}`;

        return (
            <a {...this.props} href={href}>
                {this.props.children}
            </a>
        );
    }
}

LinkComponent.propTypes = {
    href: PropTypes.string,
    noref: PropTypes.bool,
};

LinkComponent.defaultProps = {
    noref: false,
};

export default LinkComponent;

import * as React from "react";
import PropTypes from "prop-types";

class DateWithLabel extends React.Component {
    render() {
        const { name } = this.props;

        return (
            <input
                type="text"
                id={name}
                onchange={this.onchange}
                value={this.props.value}
                onClick={this.props.onClick}
            />
        );
    }
}

DateWithLabel.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default DateWithLabel;

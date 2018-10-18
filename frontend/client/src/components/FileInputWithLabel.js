import * as React from "react";
import PropTypes from "prop-types";
import formStyles from "../forms.scss";
import ValidationHelper from "../helpers/ValidationHelper";

class InputWithLabel extends React.Component {
    renderDisplay() {
        const name = this.props.name;
        return name.replace("-", " ").replace("_", " ");
    }

    renderValidation() {
        const { validation, name } = this.props;

        if (validation) {
            return (
                <span className={formStyles.validationError}>{ValidationHelper.parse(validation, name, [name])}</span>
            );
        }
    }

    render() {
        const { name } = this.props;

        const display = this.props.display ? this.props.display : this.renderDisplay();
        const description = this.props.children ? <p>{this.props.children}</p> : undefined;
        const validation = this.renderValidation();

        let attributes = this.props;
        attributes["display"] = undefined;

        const field = <input type="file" id={name} placeholder={display} {...attributes} />;

        return (
            <div className={formStyles.group}>
                <label htmlFor="name">{display}:</label>
                {field}
                {description}
                {validation}
            </div>
        );
    }
}

InputWithLabel.propTypes = {
    onchange: PropTypes.func,
    value: PropTypes.any,
    type: PropTypes.string
};

export default InputWithLabel;

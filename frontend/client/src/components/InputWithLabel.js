import * as React from "react";
import PropTypes from "prop-types";
import formStyles from "../forms.scss";
import ValidationHelper from "../helpers/ValidationHelper";

class InputWithLabel extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        value: PropTypes.any,
        type: PropTypes.string,
    };

    renderDisplay() {
        const name = this.props.name;
        return name.replace(/-/g, " ").replace(/_/g, " ");
    }

    change = e => {
        return this.props.onChange(e.target.value);
    };

    renderValidation() {
        const { validation, name, display } = this.props;
        if (validation) {
            return (
                <span className={formStyles.validationError}>
                    {ValidationHelper.parse(validation, name, [display || name])}
                </span>
            );
        }
    }

    render() {
        const { name, type } = this.props;

        const display = this.props.display ? this.props.display : this.renderDisplay();
        const description = this.props.children ? <p>{this.props.children}</p> : undefined;
        const validation = this.renderValidation();

        let attributes = { ...this.props };
        attributes["display"] = undefined;

        const field =
            type === "textarea" ? (
                <textarea id={name} placeholder={display} {...attributes} onChange={this.change} />
            ) : (
                    <input
                        type="text"
                        id={name}
                        placeholder={display}
                        {...attributes}
                        onChange={this.change}
                    />
                );

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

export default InputWithLabel;

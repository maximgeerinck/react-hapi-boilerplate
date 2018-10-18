import * as React from "react";
import formStyles from "../forms.scss";
import cx from "classnames";

class Checkbox extends React.Component {
    change = e => {
        return this.props.onchange(e.target.checked);
    };

    render() {
        const { name, className, ...attributes } = this.props;
        attributes["onchange"] = undefined;

        const classNames = [formStyles.group, className, formStyles.row];
        const description = this.props.children ? (
            <p style={{ marginLeft: "10px" }}>{this.props.children}</p>
        ) : (
                undefined
            );

        return (
            <div className={cx(...classNames)}>
                <div className={formStyles.checkbox}>
                    <input type="checkbox" id={name} {...attributes} onchange={this.change} />
                    <label htmlFor={name} className={formStyles.checkedLabel} />
                </div>
                {description}
            </div>
        );
    }
}

Checkbox.propTypes = {};

export default Checkbox;

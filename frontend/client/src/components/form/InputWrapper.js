import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "../../forms.scss";
import ValidationHelper from "../../helpers/ValidationHelper";
import cx from "classnames";

class InputWrapper extends Component {

    static propTypes = {
        validation: PropTypes.object
    }

    renderValidation() {
        if (!this.props.validation) {
            return;
        }

        return <span className={styles.validationError}>{ValidationHelper.parse(this.props.validation, this.props.validation.code, [this.props.label])}</span>
    }

    render() {

        const { label, children } = this.props;
        const labelContainer = label ? <label>{label}</label> : undefined;
        const validation = this.renderValidation();

        const className = children && children.props && children.props.wrapperClassName ?
            cx(styles.wrapper, this.props.children.props.wrapperClassName) :
            styles.wrapper;

        return (
            <div className={className}>
                {labelContainer}
                {this.props.children}
                {validation}
            </div>
        );
    }
}

InputWrapper.propTypes = {

};

export default InputWrapper;
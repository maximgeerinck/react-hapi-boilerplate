import * as React from 'react';
import PropTypes from "prop-types";
import InputWrapper from "./InputWrapper";

class Form extends React.Component {

    static propTypes = {
        data: PropTypes.object,
        validation: PropTypes.object
    }

    onChange = (e, name) => {
        if (this.props.onChange) {
            return this.props.onChange(name, e.target.value);
        }
    }

    wrap(children) {
        const { data, validation } = this.props;

        return React.Children.map(children, (child) => {

            if (!child || !child.props || !child.type) {
                return child;
            }

            if (child.props && child.props.children && child.props.children.length > 0) {
                return React.cloneElement(child, {
                    children: this.wrap(child.props.children)
                });
            }

            if (child.type.name !== "Input") {
                return child;
            }

            let newProps = {
                onChange: child.props.onChange ? child.props.onChange : (e) => this.onChange(e, child.props.name),
            };

            if (data && child.props.type !== "file") {
                newProps.value = data[child.props.name]
            }

            const wrapperProps = {
                label: child.props.label
            };

            // validation
            if (validation && validation[child.props.name]) {
                wrapperProps.validation = validation[child.props.name];
                newProps.invalid = true;
            }

            const newElement = React.cloneElement(child, newProps);

            return <InputWrapper {...wrapperProps}>{newElement}</InputWrapper>;

        });
    }

    renderChildren() {
        return this.wrap(this.props.children);
    }

    render() {
        const children = this.renderChildren();
        const { data, onChange, validation, ...rest } = this.props;
        return (
            <form {...rest}>{children}</form>
        );
    }
}

export default Form;

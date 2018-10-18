import * as React from 'react';
import formStyles from "../../forms.scss";
import cx from "classnames";
import PropTypes from "prop-types";

class Input extends React.Component {

    static propTypes = {
        wrapperClassName: PropTypes.string
    }

    render() {

        const { wrapperClassName, ...rest } = this.props;
        const className = cx(this.props.className, this.props.invalid ? formStyles.invalid : undefined);

        return (
            <input type="text" {...rest} className={className} />
        );
    }
}

export default Input;
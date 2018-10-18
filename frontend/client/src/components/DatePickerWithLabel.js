import * as React from "react";
import PropTypes from "prop-types";
import formStyles from "../forms.scss";
import ValidationHelper from "../helpers/ValidationHelper";
import DateInput from "./DateInput";
import * as moment from "moment";
import DatePicker from "react-datepicker";

class DateWithLabel extends React.Component {
    renderDisplay() {
        const name = this.props.name;
        return name.replace(/-/g, " ").replace(/_/g, " ");
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
        const { name, value, onchange } = this.props;

        const display = this.props.display ? this.props.display : this.renderDisplay();
        const description = this.props.children ? <p>{this.props.children}</p> : undefined;
        const validation = this.renderValidation();

        return (
            <div className={formStyles.group} onClick={this.props.onClick}>
                <label htmlFor={name}>{display}:</label>
                <DatePicker
                    customInput={<DateInput />}
                    name={name}
                    selected={moment(value) || undefined}
                    onChange={onchange}
                    showTimeSelect
                    timeIntervals={15}
                    dateFormat="DD-MM-YYYY HH:mm"
                    calendarClassName={formStyles.datePicker}
                />
                {description}
                {validation}
            </div>
        );
    }
}

DateWithLabel.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
};

export default DateWithLabel;

import { Bar, BarChart, ResponsiveContainer } from "recharts";
import * as React from "react";
import PropTypes from "prop-types";

class DateAmountChart extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height={40}>
                <BarChart data={data}>
                    <Bar dataKey="amount" fill="#2897af" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

DateAmountChart.propTypes = {
    data: PropTypes.array.isRequired
};
DateAmountChart.defaultProps = {
    data: []
};

export default DateAmountChart;

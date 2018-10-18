import { Legend, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as React from "react";
import PropTypes from "prop-types";

class DateAmountChart extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={data}>
                    <XAxis dataKey="date" stroke="#c3c3c3" />
                    <YAxis type="number" allowDecimals={false} stroke="#c3c3c3" />
                    <Tooltip cursor={false} />
                    <Legend />
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

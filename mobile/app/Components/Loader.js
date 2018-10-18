import React, { Component } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

class Loader extends Component {

    static propTypes = {
        color: PropTypes.string.isRequired,
        className: PropTypes.object,
        text: PropTypes.string,
    };
    static defaultProps = {
        color: "white",
    };

    render() {
        return (
            <View><Text>Loading...</Text></View>
        );
    }
}



export default Loader;

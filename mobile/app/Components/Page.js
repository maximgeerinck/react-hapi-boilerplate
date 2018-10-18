import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";

class Page extends Component {

    static propTypes = {

    };

    render() {
        return (
            <View>
                Page
                {this.props.children}
            </View>
        );
    }
}

export default Page;
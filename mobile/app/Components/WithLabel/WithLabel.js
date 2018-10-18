'use strict';


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class WithLabel extends Component {

    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>{this.props.label}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    labelContainer: {
        flexDirection: 'row',
        marginVertical: 2,
        height: 45
    },
    label: {
        flex: 1,
        marginRight: 10,
        paddingTop: 2,
        backgroundColor: '#ad1bcb',
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
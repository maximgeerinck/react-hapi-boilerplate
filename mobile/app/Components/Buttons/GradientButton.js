import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class GradientButton extends Component {

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <View ref={component => this._root = component}>
                <LinearGradient
                    colors={['#a2db95', '#24ccaa']}
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={this.props.style}
                >
                    <Text style={styles.buttonCalculateText}>Calculate</Text>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonCalculateText: {
        color: 'white'
    }
});

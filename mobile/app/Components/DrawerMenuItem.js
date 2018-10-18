import React, { PropTypes } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux'

export default class DrawerMenuItem extends React.Component {

    pressed = () => {
        this.props.onPress(this.props.index);
    };

    render() {
        return (
            <TouchableHighlight onPress={this.pressed} style={styles.btnMenuItem} underlayColor="rgba(0, 0, 0, 0.2)">
                <View>{this.props.children}</View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    btnMenuItem: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
    }
});
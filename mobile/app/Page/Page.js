import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Page extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                >
                    <LinearGradient
                        colors={['#7a02cd', '#9239ec']}
                        start={[0, 0]} end={[1, 1]}
                    />
                </StatusBar>

                <View style={styles.page}>
                    {this.props.children}
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        padding: 25,
        paddingTop: 10,
        flex: 1
    },
    scrollStyle: {
        flex: 1
    },
})

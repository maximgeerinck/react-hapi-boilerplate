import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient';
import DrawerMenuIcon from '../assets/icons/menu_burger.png';

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? 74 : 64,
        flexDirection: 'row',
        paddingTop: 20,
    },
    navBarItem: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default class CustomNavBar extends React.Component {

    _renderLeft() {
        return (
            <TouchableOpacity
                onPress={Actions.drawerOpen}
                style={[styles.navBarItem, { paddingLeft: 10 }]}>
                <Image
                    style={{ width: 30, height: 50 }}
                    resizeMode="contain"
                    source={DrawerMenuIcon}></Image>
            </TouchableOpacity>
        )
    }

    _renderMiddle() {
        return (
            <View style={styles.navBarItem}>
                <Text>{this.props.title}</Text>
            </View>
        )
    }

    _renderRight() {
        return (
            <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                <TouchableOpacity
                    onPress={() => console.log('Share')}
                    style={{ paddingRight: 10 }}>
                    <Image
                        style={{ width: 30, height: 50 }}
                        resizeMode="contain"
                        source={{ uri: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/share-512.png' }}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => console.log('Search')}
                    style={{ paddingRight: 10 }}>
                    <Image
                        style={{ width: 30, height: 50 }}
                        resizeMode="contain"
                        source={{ uri: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//search1600.png' }}></Image>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const dinamicStyle = { backgroundColor: 'yellow' }

        return (
            <View style={[styles.container, dinamicStyle]}>
                {this._renderLeft()}
                {this._renderMiddle()}
                {this._renderRight()}
            </View>
        )
    }
}
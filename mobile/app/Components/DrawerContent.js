import React from 'react'
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import DrawerMenuItem from './DrawerMenuItem';
import Icon from 'react-native-vector-icons/Ionicons';

import PikachuBackground from '../assets/images/pikachu_blurred.jpg';

class DrawerContent extends React.Component {

    static contextTypes = {
        drawer: PropTypes.object,
    }

    static propTypes = {
        name: PropTypes.string,
        sceneStyle: View.propTypes.style,
        title: PropTypes.string,
    }

    constructor(props) {
        super(props);

        this._navigate = this.props.navigate;
    }

    render() {

        return (
            <View style={[styles.container, this.props.sceneStyle]}>

                <View style={styles.menuHeader}>
                    <Image source={PikachuBackground} style={styles.menuHeaderBackground} />
                    <View style={styles.headerTextView}>
                        <Text style={styles.headerText} >
                            Menu
                        </Text>
                    </View>

                </View>

                <View style={styles.items}>

                    <DrawerMenuItem onPress={() => this._navigate(Actions.cp_page)}>
                        <View style={{ marginRight: 15, flexDirection: 'row' }}>
                            <Icon name="ios-flash-outline" backgroundColor="transparent" size={25} style={{ marginRight: 15, width: 20 }} />
                            <Text style={{ marginTop: 5, color: "black" }}>CP Calculator</Text>
                        </View>
                    </DrawerMenuItem>

                    <DrawerMenuItem onPress={() => this._navigate(Actions.iv_page)}>
                        <View style={{ marginRight: 15, flexDirection: 'row' }}>
                            <Icon name="ios-stats-outline" backgroundColor="transparent" size={25} style={{ marginRight: 15, width: 20 }} />
                            <Text style={{ marginTop: 5 }}>IV Calculator</Text>
                        </View>
                    </DrawerMenuItem>

                    <DrawerMenuItem onPress={() => this._navigate(Actions.pidgey_page)}>
                        <View style={{ marginRight: 15, flexDirection: 'row' }}>
                            <Icon name="ios-egg-outline" backgroundColor="transparent" size={25} style={{ marginRight: 15, width: 20 }} />
                            <Text style={{ marginTop: 5 }}>Lucky egg calculator</Text>
                        </View>
                    </DrawerMenuItem>

                    <DrawerMenuItem onPress={() => this._navigate(Actions.xp_page)}>
                        <View style={{ marginRight: 15, flexDirection: 'row' }}>
                            <Icon name="ios-podium-outline" backgroundColor="transparent" size={25} style={{ marginRight: 15, width: 20 }} />
                            <Text style={{ marginTop: 5 }}>XP Awards</Text>
                        </View>
                    </DrawerMenuItem>

                    <DrawerMenuItem onPress={() => this._navigate(Actions.levelup_page)}>
                        <View style={{ marginRight: 15, flexDirection: 'row' }}>
                            <Icon name="ios-podium-outline" backgroundColor="transparent" size={25} style={{ marginRight: 15, width: 20 }} />
                            <Text style={{ marginTop: 5 }}>Level Up Awards</Text>
                        </View>
                    </DrawerMenuItem>

                </View>
                {/*<Text>Current tab {JSON.stringify(props)}</Text>*/}
            </View>
        )
    }
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    btnMenuItem: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    items: {
        paddingTop: 0
    },
    menuHeader: {
        backgroundColor: 'grey',
        height: 150
    },
    menuHeaderBackground: {
        flex: 1,
        width: 320,
        resizeMode: 'cover'
    },
    headerTextView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    headerText: {
        color: 'white',
        fontSize: 20
    }
});
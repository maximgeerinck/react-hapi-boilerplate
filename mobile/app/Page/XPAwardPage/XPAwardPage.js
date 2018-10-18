import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ListView,
    Picker,
    RecyclerViewBackedScrollView
} from 'react-native';

import Page from '../Page';
import GradientButton from '../../Components/Buttons/GradientButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class XPAwardPage extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            amount_of_pidgey: 1,
            amount_candies: 1,
            dataSource: ds.cloneWithRows([{xp: "10", action: "Curveball bonus"},
                {xp: "10", action: "Nice! Throw bonus"},
                {xp: "50", action: "Great! Throw bonus"},
                {xp: "50", action: "Successful pokemon capture"},
                {xp: "100", action: "Excellent! Throw bonus"},
                {xp: "100", action: "Catch your 100th pokemon of a species"},
                {xp: "100", action: "Hatch an egg (2km)"},
                {xp: "200", action: "Hatch an egg (5km)"},
                {xp: "500", action: "Hatch an egg (10km)"},
                {xp: "500", action: "Add a new pokemon to the pokedex"},
                {xp: "500", action: "Evolve a pokemon"},
                {xp: "0-50", action: "Train at a gym (less for using an overpowered monster)"},
                {xp: "100", action: "Defeat enemy pokemon at a gym (per pokemon)"},
                {xp: "50", action: "Beating every pokemon at a gym"}])
        }
    }


    _renderRow = (rowData, sectionID, rowID) => {

        return (
            <View style={styles.card}>
                <View style={styles.card_column_xp}>
                    <Text style={styles.card_column_xp_text}>{rowData.xp}</Text>
                </View>
                <View style={styles.card_column_action}>
                    <Text style={styles.card_column_action_text}>{rowData.action}</Text>
                </View>

            </View>
        )
    };

// {xp: "10", action: "Curveball bonus"},
// {xp: "10", action: "Nice! Throw bonus"},
// {xp: "50", action: "Great! Throw bonus"},
// {xp: "50", action: "Successful pokemon capture"},
// {xp: "100", action: "Excellent! Throw bonus"},
// {xp: "100", action: "Catch your 100th pokemon of a species"},
// {xp: "100", action: "hatch an egg (2km)"},
// {xp: "200", action: "hatch an egg (5km)"},
// {xp: "500", action: "hatch an egg (10km)"},
// {xp: "1000", action: "Add a new pokemon to the pokedex"},
// {xp: "500", action: "evolve a pokemon"},
// {xp: "500", action: "evolve a pokemon"},
// {xp: "0-50", action: "Train at a gym (less for using an overpowered monster)"},
// {xp: "100", action: "Defeat enemy pokemon at a gym (per pokemon)"},
// {xp: "50", action: "Beating every pokemon at a gym"}



    render() {

        return (
            <Page style={styles.XPAwardPage}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
            </Page>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#2d323f',
        marginBottom: 10
    },
    card_column_xp: {
        flex: 1,
        backgroundColor: '#29cfe3',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card_column_xp_text: {
        color: '#f4f4f4'
    },
    card_column_action: {
        flex: 4,
        padding: 10,
        justifyContent: 'center',
    },
    card_column_action_text: {
        color: '#f4f4f4'
    },
    XPAwardPage: {

    }
});
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
    RecyclerViewBackedScrollView,
    ScrollView
} from 'react-native';

import Page from '../Page';
import GradientButton from '../../Components/Buttons/GradientButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TYPES = {
    POKE_BALL: "pokeball",
    GREAT_BALL: "Great ball",
    ULTRA_BALL: "Ultra ball",
    POTION: "Potion",
    SUPER_POTION: "Super potion",
    HYPER_POTION: "Hyper potion",
    MAX_POTION: "Max Potion",
    REVIVE: "Revive",
    MAX_REVIVE: "Max revive",
    RAZZ_BERRY: "Razz berry",
    INCENSE: "Incense",
    LUCKY_EGG: "Lucky Egg",
    EGG_INCUBATOR: "Egg Incubator",
    LURE_MODULE: "Lure module",
    GYM: "Gym",
    TEAM_CHOOSE: "Choose a team",
};

export default class XPAwardPage extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            amount_of_pidgey: 1,
            amount_candies: 1,
            dataSource: ds.cloneWithRows([
                {level: 1, xp: 0, unlocked: []},
                {level: 2, xp: 1000, items: [{name: 'POKE_BALL', amount: 15}], unlocked: []},
                {level: 3, xp: 2000, items: [{name: 'POKE_BALL', amount: 15}], unlocked: []},
                {level: 4, xp: 3000, items: [{name: 'POKE_BALL', amount: 15}], unlocked: []},
                {level: 5, xp: 4000, items: [{name: 'POTION', amount: 10}, {name: 'INCENSE', amount: 1}, {name: 'REVIVE', amount: 10}], unlocked: ["TEAM_CHOOSE", "GYM", "POTION", "REVIVE"]},
                {level: 6, xp: 5000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'EGG_INCUBATOR', amount: 1}], unlocked: []},
                {level: 7, xp: 6000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'INCENSE', amount: 1}], unlocked: []},
                {level: 8, xp: 7000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 10}, {name: 'LURE_MODULE', amount: 1}], unlocked: ['RAZZ_BERRY']},
                {level: 9, xp: 8000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 3}, {name: 'LUCKY_EGG', amount: 1}], unlocked: []},
                {level: 10, xp: 9000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'SUPER_POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}, {name: 'INCENSE', amount: 1}, {name: 'LUCKY_EGG', amount: 1}, {name: 'EGG_INCUBATOR', amount: 1}], unlocked: ['SUPER_POTION']},
                {level: 11, xp: 10000, items: [{name: 'POKE_BALL', amount: 15}, {name: 'SUPER_POTION', amount: 10}, {name: 'REVIVE', amount: 3}, {name: 'RAZZ_BERRY', amount: 3}], unlocked: []},
                {level: 12, xp: 10000, items: [{name: 'GREAT_BALL', amount: 20}, {name: 'SUPER_POTION', amount: 10}, {name: 'REVIVE', amount: 3}, {name: 'RAZZ_BERRY', amount: 3}], unlocked: ['GREAT_BALL']},
                {level: 13, xp: 10000, items: [{name: 'GREAT_BALL', amount: 15}, {name: 'SUPER_POTION', amount: 10}, {name: 'REVIVE', amount: 3}, {name: 'RAZZ_BERRY', amount: 3}], unlocked: []},
                {level: 14, xp: 10000, items: [{name: 'GREAT_BALL', amount: 15}, {name: 'SUPER_POTION', amount: 10}, {name: 'REVIVE', amount: 3}, {name: 'RAZZ_BERRY', amount: 3}], unlocked: []},
                {level: 15, xp: 15000, items: [{name: 'GREAT_BALL', amount: 15}, {name: 'HYPER_POTION', amount: 20}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}, {name: 'INCENSE', amount: 1}, {name: 'LUCKY_EGG', amount: 1}, {name: 'EGG_INCUBATOR', amount: 1}, {name: 'LURE_MODULE', amount: 1}], unlocked: ['HYPER_POTION']},
                {level: 16, xp: 20000, items: [{name: 'GREAT_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 5}], unlocked: []},
                {level: 17, xp: 20000, items: [{name: 'GREAT_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 5}], unlocked: []},
                {level: 18, xp: 20000, items: [{name: 'GREAT_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 5}], unlocked: []},
                {level: 19, xp: 25000, items: [{name: 'GREAT_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 5}, {name: 'RAZZ_BERRY', amount: 5}], unlocked: []},
                {level: 20, xp: 25000, items: [{name: 'ULTRA_BALL', amount: 20}, {name: 'HYPER_POTION', amount: 20}, {name: 'REVIVE', amount: 20}, {name: 'RAZZ_BERRY', amount: 20}, {name: 'INCENSE', amount: 2}, {name: 'LUCKY_EGG', amount: 2}, {name: 'EGG_INCUBATOR', amount: 2}, {name: 'LURE_MODULE', amount: 2}], unlocked: ['ULTRA_BALL']},
                {level: 21, xp: 50000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}], unlocked: []},
                {level: 22, xp: 75000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}], unlocked: []},
                {level: 23, xp: 100000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}], unlocked: []},
                {level: 24, xp: 125000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'HYPER_POTION', amount: 10}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 10}], unlocked: []},
                {level: 25, xp: 150000, items: [{name: 'ULTRA_BALL', amount: 25}, {name: 'MAX_POTION', amount: 20}, {name: 'REVIVE', amount: 15}, {name: 'RAZZ_BERRY', amount: 15}, {name: 'INCENSE', amount: 1}, {name: 'LUCKY_EGG', amount: 1}, {name: 'EGG_INCUBATOR', amount: 1}, {name: 'LURE_MODULE', amount: 1}], unlocked: ['MAX_POTION']},
                {level: 26, xp: 190000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 27, xp: 200000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 28, xp: 250000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 29, xp: 300000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 30, xp: 350000, items: [{name: 'ULTRA_BALL', amount: 30}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 20}, {name: 'RAZZ_BERRY', amount: 20}, {name: 'INCENSE', amount: 3}, {name: 'LUCKY_EGG', amount: 3}, {name: 'EGG_INCUBATOR', amount: 3}, {name: 'LURE_MODULE', amount: 3}], unlocked: ['MAX_REVIVE']},
                {level: 31, xp: 500000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 32, xp: 500000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 33, xp: 750000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 34, xp: 1000000, items: [{name: 'ULTRA_BALL', amount: 10}, {name: 'MAX_POTION', amount: 15}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 15}], unlocked: []},
                {level: 35, xp: 1250000, items: [{name: 'ULTRA_BALL', amount: 30}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 20}, {name: 'RAZZ_BERRY', amount: 20}, {name: 'INCENSE', amount: 2}, {name: 'LUCKY_EGG', amount: 1}, {name: 'LURE_MODULE', amount: 1}], unlocked: []},
                {level: 36, xp: 1500000, items: [{name: 'ULTRA_BALL', amount: 20}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 20}], unlocked: []},
                {level: 37, xp: 2000000, items: [{name: 'ULTRA_BALL', amount: 20}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 20}], unlocked: []},
                {level: 38, xp: 2500000, items: [{name: 'ULTRA_BALL', amount: 20}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 20}], unlocked: []},
                {level: 39, xp: 3000000, items: [{name: 'ULTRA_BALL', amount: 20}, {name: 'MAX_POTION', amount: 20}, {name: 'MAX_REVIVE', amount: 10}, {name: 'RAZZ_BERRY', amount: 20}], unlocked: []},
                {level: 40, xp: 5000000, items: [{name: 'ULTRA_BALL', amount: 40}, {name: 'MAX_POTION', amount: 40}, {name: 'MAX_REVIVE', amount: 40}, {name: 'RAZZ_BERRY', amount: 40}, {name: 'INCENSE', amount: 4}, {name: 'LUCKY_EGG', amount: 4}, {name: 'EGG_INCUBATOR', amount: 4}, {name: 'LURE_MODULE', amount: 4}], unlocked: []},
            ])
        }
    }


    _renderRow = (rowData, sectionID, rowID) => {

        return (
            <View style={styles.card}>

                <View style={{ backgroundColor: '#29cfe3', justifyContent: 'center', alignItems: 'center', padding: 5, position: 'relative'}}>
                    <Text style={{ fontSize: 15, color: 'white'}}>{rowData.level}</Text>
                </View>

                {/*<View style={{ padding: 5}}>*/}

                    {/*<Text style={{ color: 'gray'}}>*/}
                        {/*{(() => {*/}

                            {/*if(!("items" in rowData || rowData.items.length == 0)) {*/}
                                {/*return "No rewards"*/}
                            {/*}*/}
                            {/*return rowData.items.map((obj) => { return obj.amount + " " + TYPES[obj.name]}).join(",");*/}

                        {/*})()}*/}
                    {/*</Text>*/}

                {/*</View>*/}


                <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row', padding: 10}}>
                    {(() => {

                        if(!("items" in rowData) || rowData.items.length == 0) {
                            return (<View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'gray'}}>No rewards</Text></View>);
                        }

                        let container = [];
                        rowData.items.forEach((val, index) => {
                            container.push(
                                <View key={index} style={{ flexDirection: 'row', borderColor: 'gray', borderWidth: 1, marginLeft: 5, marginBottom: 5}}>
                                    <View style={{ height: 30, width: 30, backgroundColor: 'gray'}}>
                                        <Text style={{ borderRadius: 20, padding: 5,  color: 'white', width: 35, justifyContent: 'center', alignItems: 'center'}}>{val.amount}</Text>
                                    </View>
                                    <View style={{ paddingHorizontal: 10, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{ color: 'gray'}}>{TYPES[val.name]}</Text>
                                    </View>
                                </View>
                                )
                        });

                        return container;
                    })()}
                </View>
            </View>
        )
    };

    render() {

        return (
            <Page>
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
        backgroundColor: '#2d323f',
        marginBottom: 10,
        flexDirection: 'column'
    },
});
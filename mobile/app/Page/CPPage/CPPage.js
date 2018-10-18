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
    Keyboard
} from 'react-native';

import Page from '../Page';
import WithLabel from '../../Components/WithLabel/WithLabel';
import GradientButton from '../../Components/Buttons/GradientButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pokemon from '../../assets/pokemon.json';
import Multiplier from '../../assets/multipliers.json';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class CPPage extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            pokemon: 0,
            dataSource: ds.cloneWithRows([]),
            currentCP: 0
        }
    }

    _calculate = () => {

        const { currentCP, pokemon } = this.state;
        var text = [];

        if(!("Next evolution(s)" in Pokemon[pokemon])) {
            alert("This pokemon has nu further evolutions in this generation");
            return;
        }

        // further evolutions, normally 1 per 1, eevee has multiple possible ones
        if(Pokemon[pokemon]["Name"].toUpperCase() == "EEVEE") {
            let evolutions = Pokemon[pokemon]["Next evolution(s)"].sort((a, b) => {
                if(parseInt(a["Number"]) > parseInt(b["Number"]))
                    return -1;
                if(parseInt(a["Number"]) < parseInt(b["Number"]))
                    return 1;
                return 0;
            });

            evolutions.forEach((evolution) => {

                let nextDetails = this._calculateDetails(evolution["Name"], currentCP, null);
                text.push("Can evolve into a " + evolution["Name"] + " with " + nextDetails['calculatedCP'].join('-').toString() + ' CP');

            });

        } else {

            let evolve = Pokemon[pokemon];
            let nextDetails;

            Pokemon[pokemon]["Next evolution(s)"].forEach((evolution, index) => {
                console.log(index);

                let previousDetails = typeof nextDetails != 'undefined' ? nextDetails : null;
                nextDetails = this._calculateDetails(evolve["Name"], currentCP, previousDetails);

                text.push("Can evolve into a " + evolution["Name"] + " with " + nextDetails['calculatedCP'].join('-').toString() + ' CP');
                evolve = evolution;
            });

        }

        this.setState({dataSource: this.state.ds.cloneWithRows(text)});

        const dismissKeyboard = require('dismissKeyboard');
        dismissKeyboard();
    };


    /**
     * A function that calculates the details of a pokemon evolution given a start CP
     * @param pokemon
     * @param evolvedCP
     * @returns {{minCP: number, maxCP: number, minMultiplier: number, maxMultiplier: number, calculatedCP: Array}}
     * @private
     */
    _calculateDetails = (pokemon, evolvedCP, previousDetails) => {

        var details = { minCP: 0, maxCP: 0, minMultiplier: 0, maxMultiplier: 0, calculatedCP: [] };

        if(previousDetails != null) {
            details.minCP = previousDetails['calculatedCP'][0];
            details.maxCP = previousDetails['calculatedCP'][1];
        } else {
            details.minCP = evolvedCP instanceof Array ? evolvedCP[0] : evolvedCP;
            details.maxCP = evolvedCP instanceof Array ? evolvedCP[1] : evolvedCP;
        }

        let multipliers = Multiplier[pokemon];
        details.minMultiplier = multipliers instanceof Array ? multipliers[0] : multipliers;
        details.maxMultiplier = multipliers instanceof Array ? multipliers[1] : multipliers;


        let minCP = parseInt(details.minCP * details.minMultiplier);
        let maxCP = parseInt(details.maxCP * details.maxMultiplier);


        details.calculatedCP.push(minCP);
        if(maxCP != minCP) details.calculatedCP.push(maxCP);

        return details;
    };

    _renderRow = (rowData, sectionID, rowID) => {

        return (
            <View style={styles.calculationRow}>
                <Text style={styles.calculationRow_text}>{rowData}</Text>
            </View>
        )
    };

    render() {

        const pokemonSorted = Object.assign({}, Pokemon.sort((a, b) => {
            if(a["Name"] < b["Name"])
                return -1;
            if(a["Name"] > b["Name"])
                return 1;
            return 0;
        }));

        var pokemonData = [];
        for(var i = 0; i < Pokemon.length; i++) {
            pokemonData.push(<Picker.Item label={pokemonSorted[i]["Name"]} value={i} key={i}/>);
        }

        return (
            <Page style={styles.CPPage}>

                <View style={styles.iconContainer} elevation={5}>
                    <Ionicon name="ios-flash-outline" backgroundColor="transparent" size={25} style={{color: 'white', fontSize: 45}} />
                </View>

                <Picker
                    style={styles.pPokemonPicker}
                    onValueChange={(p) => this.setState({pokemon: p})}
                    selectedValue={this.state.pokemon}>

                    {pokemonData}

                </Picker>

                <WithLabel label="Current CP">
                    <TextInput
                        style={styles.txtCurrentCP}
                        keyboardType="numeric"
                        onChangeText={(cp) => this.setState({currentCP: cp})}
                        value={this.state.currentCP.toString()}
                    />
                </WithLabel>

                <TouchableOpacity  onPress={this._calculate} style={styles.btn_calculate}>
                    <GradientButton style={styles.buttonGradient}>Calculate</GradientButton>
                </TouchableOpacity>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    style={styles.calculationResult}
                />

            </Page>
        )
    }
}

const styles = StyleSheet.create({
    CPPage: {},
    txtCurrentCP: {
        flex: 2,
        color: 'white'
    },
    pPokemonPicker: {
        color: 'white'
    },
    iconContainer: {
        alignItems: 'center',
        padding: 35,
        justifyContent: 'center'
    },
    buttonGradient: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonInfo: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    buttonInfoIcon: {
        borderRadius: 25
    },
    calculationResult: {
        marginTop: 15
    },
    calculationRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    calculationRow_text: {
        color: 'white'
    },
    gradient: {
        flex: 1, height: 50
    },
    btn_calculate: {
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    buttonCalculateText: {
        color: 'white'
    }
});
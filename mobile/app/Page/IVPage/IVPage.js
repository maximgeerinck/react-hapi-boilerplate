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
    Keyboard,
    ScrollView
} from 'react-native';

import Page from '../Page';
import WithLabel from '../../Components/WithLabel/WithLabel';
import GradientButton from '../../Components/Buttons/GradientButton';
import Pokemon from '../../assets/pokemon.json';
import Ionicon from 'react-native-vector-icons/Ionicons';

// const magic = require('./magic');
const LevelToCPM = require('../../assets/json/level-to-cpm.json')
const DustToLevel = require('../../assets/json/dust-to-level')

const findPokemon = require('./findPokemon')
const logPokemon = require('./logPokemon')
const isGoodPokemonForItsClass = require('./isGoodPokemon')
const guessIVs = require('./guessIVs')

export default class IVPage extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            pokemon: 117,
            dataSource: ds.cloneWithRows([]),
            currentCP: 634,
            currentHP: 103,
            stardust: 2500,
            response: []
        }
    }

    calculate = (pokemon) => {

        var { response } = this.state;

        // Get the pokemon's base stats
        const mon = findPokemon(pokemon.name);

        // If the level has been provided then we can get a better accurate reading
        // since we'll be able to determine the exact ECpM.
        if (pokemon.level) {
            if (DustToLevel[pokemon.stardust].indexOf(pokemon.level) === -1) {
                throw new Error('Stardust does not match level')
            }
            const ECpM = LevelToCPM[String(pokemon.level)]
            return guessIVs(pokemon, mon, ECpM)
        }

        // If we're just going on stardust then we'll have to iterate through
        // each level and concatenate all possible values

        if(!(pokemon.stardust in DustToLevel)) {
            response.push('Invalid amount of stardust');
            return;
        }

        return DustToLevel[pokemon.stardust].reduce((arr, level) => {
            const ECpM = LevelToCPM[String(level)]
            return arr.concat(guessIVs(pokemon, mon, ECpM))
        }, [])
    };

    magic = (pokemon) => {

        const values = this.calculate(pokemon);
        var { response } = this.state;

        if (typeof values == "undefined" || !values.length) {
            response.push('Please correct values.');
            return;
        }

        const bestPossible = values.reduce((best, mon) => {
            if (!best) return mon
            return mon.percent.PerfectIV > best.percent.PerfectIV ? mon : best
        }, null)

        const yes = values.every(isGoodPokemonForItsClass)
        const maybeValues = values.filter(isGoodPokemonForItsClass)
        const maybe = maybeValues.length > 0

        const init = {
            atk: [Infinity, -Infinity],
            cp: [Infinity, -Infinity],
            hp: [Infinity, -Infinity],
            iv: [Infinity, -Infinity],
            iva: [Infinity, -Infinity],
            ivd: [Infinity, -Infinity],
            ivs: [Infinity, -Infinity],
        };

        // Calculate the min/max range of values for atk, cp, hp, and ivs
        const ValuesRange = values.reduce((obj, v) => {
            return {
                atk: [
                    Math.min(v.percent.PercentBatt, obj.atk[0]),
                    Math.max(v.percent.PercentBatt, obj.atk[1]),
                ],
                cp: [
                    Math.min(v.percent.PercentCP, obj.cp[0]),
                    Math.max(v.percent.PercentCP, obj.cp[1]),
                ],
                hp: [
                    Math.min(v.percent.PercentHP, obj.hp[0]),
                    Math.max(v.percent.PercentHP, obj.hp[1]),
                ],
                iv: [
                    Math.min(v.percent.PerfectIV, obj.iv[0]),
                    Math.max(v.percent.PerfectIV, obj.iv[1]),
                ],
                iva: [
                    Math.min(v.ivs.IndAtk, obj.iva[0]),
                    Math.max(v.ivs.IndAtk, obj.iva[1]),
                ],
                ivd: [
                    Math.min(v.ivs.IndDef, obj.ivd[0]),
                    Math.max(v.ivs.IndDef, obj.ivd[1]),
                ],
                ivs: [
                    Math.min(v.ivs.IndSta, obj.ivs[0]),
                    Math.max(v.ivs.IndSta, obj.ivs[1]),
                ],
            }
        }, init);

        // Begin logging
        if (values.length === 1) {
          response.push('Congratulations! Here are your Pokemon\'s stats');
          response.push.apply(response, logPokemon(values[0]))
        } else {
          response.push('Your possible Pokemon\'s values');

          response.push('');

          response.push(`IV: ${ValuesRange.iv[0]} - ${ValuesRange.iv[1]}%`);
          response.push(`Atk+Def: ${ValuesRange.atk[0]} - ${ValuesRange.atk[1]}%`);
          response.push(`CP: ${ValuesRange.cp[0]} - ${ValuesRange.cp[1]}%`);
          response.push(`HP: ${ValuesRange.hp[0]} - ${ValuesRange.hp[1]}%`);

          response.push('');

          response.push(`There are ${values.length} possibilities.`);
          response.push(`Best possible Pokemon\'s values ${Math.round(1 / values.length * 100)}% chance`);
          response.push.apply(response, logPokemon(bestPossible))
        }

        response.push('');

        const pokemonId = `${pokemon.name.toUpperCase()} ${pokemon.cp}`;

        response.push('ADVISE');
        if (yes) {
            response.push(`Keep ${pokemonId}.`)
        } else if (maybe) {
            response.push(
                `Maybe you should keep ${pokemonId} around.`,
                '\n  ',
                `There is a ${Math.round(maybeValues.length / values.length * 100)}% chance you've got a winner.`
            )
        } else {
            response.push(`transfer ${pokemonId}`);
        }

        return;
    }

    _calculate = () => {

        this.state.response = [];
        const { currentCP, pokemon, currentHP, stardust, response } = this.state;

        // 634, 103, 2500
        console.log(Pokemon[pokemon]["Name"]);
        console.log(this.state);

        this.magic({
            name: Pokemon[pokemon]["Name"].toLowerCase(),
            cp: parseInt(currentCP),
            hp: parseInt(currentHP),
            stardust: parseInt(stardust),
            level: null
        });

        this.setState({dataSource: this.state.ds.cloneWithRows(response), response: response});

        // const dismissKeyboard = require('dismissKeyboard');
        // dismissKeyboard();
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
            <ScrollView style={styles.scrollStyle}>
            <Page style={styles.IVPage}>

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
                        style={styles.inputbox}
                        keyboardType="numeric"
                        onChangeText={(cp) => this.setState({currentCP: cp})}
                        value={this.state.currentCP.toString()}
                    />
                </WithLabel>

                <WithLabel label="Current HP">
                    <TextInput
                        style={styles.inputbox}
                        keyboardType="numeric"
                        onChangeText={(hp) => this.setState({currentHP: hp})}
                        value={this.state.currentHP.toString()}
                    />
                </WithLabel>

                <WithLabel label="Stardust">
                    <TextInput
                        style={styles.inputbox}
                        keyboardType="numeric"
                        onChangeText={(stardust) => this.setState({stardust: stardust})}
                        value={this.state.stardust.toString()}
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
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    IVPage: {},
    inputbox: {
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
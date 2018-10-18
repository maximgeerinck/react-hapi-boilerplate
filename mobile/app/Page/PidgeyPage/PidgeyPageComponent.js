import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';

import Page from '../Page';
import WithLabel from '../../Components/WithLabel/WithLabel';
import GradientButton from '../../Components/Buttons/GradientButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class PidgeyPageComponent extends Component {

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds,
            amount_of_pidgey: 1,
            amount_candies: 1,
            dataSource: ds.cloneWithRows([])
        }
    }

    _calculate = () => {

        if(this.state.amount_candies == '' || isNaN(this.state.amount_candies) || this.state.amount_candies < 0) {
            alert('Please enter a valid amount of candies (number >= 0)');
            return;
        }
        if(this.state.amount_of_pidgey == '' || isNaN(this.state.amount_of_pidgey) || this.state.amount_of_pidgey < 0) {
            alert('Please enter a valid amount of pidgey (number >= 0)');
            return;
        }

        const TIME_TO_EVOLVE = 30;
        const CANDIES_TO_EVOLVE = 12;

        // counters
        var evolutions = 0,
            transfers = 0;

        let candies = parseInt(this.state.amount_candies),
            pidgey = parseInt(this.state.amount_of_pidgey);

        // evolve without transfer
        let canStillEvolve = true;
        while(canStillEvolve) {
            if(parseInt(candies / CANDIES_TO_EVOLVE) === 0) {
                canStillEvolve = false;
            } else {
                pidgey--;
                candies -= CANDIES_TO_EVOLVE;
                candies++;
                evolutions++;
                if(pidgey === 0) {
                    break;
                }
            }
        }

        // evolutions after transfering pidgey
        var shouldTransfer = true;
        while (shouldTransfer) {
            // Not enough to transfer and evolve or no pidgey left
            if ((candies + pidgey) < (CANDIES_TO_EVOLVE + 1) || pidgey === 0) {
                shouldTransfer = false;
                break;
            }

            // Keep transferring until enough candies
            while (candies < CANDIES_TO_EVOLVE) {
                transfers++;
                pidgey--;
                candies++;
            }

            // Evolve a Pidgey
            pidgey--;
            candies -= CANDIES_TO_EVOLVE;
            candies++;
            evolutions++;
        }

        // html += "<p>You should transfer <b>" + transferCount + "</b> pidgey before activating your Lucky Egg</p>";
        // html += "<p>You will be able to evolve <b>" + evolveCount + "</b> pidgey, gaining <b>" + evolveCount * 1000 + "</b> XP</p>";
        // html += "<p>On average, it will take about <b>" + (evolveCount * TIME_TO_EVOLVE / 60) + "</b> minutes to evolve your pidgey</p>";
        // html += "<p>You will have <b>" + pidgey + "</b> pidgey and <b>" + candies + "</b> candies left over</p>";


        let text = [];
        text.push('Transfer ' + transfers + ' pidgey');
        text.push(evolutions + ' possible evolutions (' + evolutions * 1000 + 'xp)');
        text.push(pidgey + ' pidgies and ' + candies + ' candies left in the end');

        this.setState({dataSource: this.state.ds.cloneWithRows(text)});
    };

    _renderRow = (rowData, sectionID, rowID) => {

        return (
            <View style={styles.calculationRow}>
                <Text style={styles.calculationRow_text}>{rowData}</Text>
            </View>
        )
    };

    _setPidgey = (amount) => {
        this.setState({amount_of_pidgey: amount});
    };
    _setCandies = (amount) => {
        this.setState({amount_candies: amount});
    };

    info() {
        alert('Calculate how many pidgey you need to maximize the XP gained from a lucky egg');
    }

    render() {
        return (
            <Page style={styles.PidgeyPage}>

                <View style={styles.buttonInfo}>
                    <Icon.Button name="info-outline" backgroundColor="#3b5998" onPress={this.info} borderRadius={25} iconStyle={{marginRight: 0}}/>
                </View>

                <View style={styles.eggContainer} elevation={5}>
                    <Ionicon name="ios-egg-outline" backgroundColor="transparent" size={25} style={{color: 'white', fontSize: 45}}/>
                </View>


                <WithLabel label="Pidgey">
                    <TextInput
                        style={styles.pidgey_input}
                        keyboardType="numeric"
                        onChangeText={this._setPidgey}
                        value={this.state.amount_of_pidgey.toString()}
                    />
                </WithLabel>

                <WithLabel label="Candies">
                    <TextInput
                        style={styles.pidgey_input}
                        keyboardType="numeric"
                        onChangeText={this._setCandies}
                        value={this.state.amount_candies.toString()}
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
    PidgeyPage: {

    },
    buttonInfo: {
        position: 'absolute',
        right: 10,
        top: 55
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
    pidgey_input: {
        flex: 2,
        backgroundColor: 'rgba(35,35,35,0.6)',
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_calculate: {
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    eggContainer: {
        alignItems: 'center',
        padding: 35,
        justifyContent: 'center'
    },
    pidgeyImage: {
        marginBottom: 40
    },
    buttonCalculateText: {
        color: 'white'
    }
});
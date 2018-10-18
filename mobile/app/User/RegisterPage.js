import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export default class RegisterPage extends React.Component {

    state = {
        email: undefined,
        password: undefined
    }

    render() {


        const { email, password } = this.state;

        return (
            <View>
                <Text>Email</Text>
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={email}
                />

                <Text>Password</Text>
                <TextInput
                    style={{ height: 40 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={password}
                />
                <Button title="Register" />
            </View>
        )
    }
}
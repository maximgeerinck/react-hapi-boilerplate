import React from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, Button } from "react-native";

export default class LoginForm extends React.Component {

    state = {
        email: "",
        password: null,
        rememberMe: false,
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    _onLogin = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.email, this.state.password);
        return 0;
    };

    render() {
        let errorContainer = this.props.isInvalid ? (
            <View className={formStyles.validationSummary}>
                <Text>{ValidationHelper.constructMessage(ValidationType.V_LOGIN_COMBO_INCORRECT)}</Text>
            </View>
        ) : null;

        if (this.props.error) {
            errorContainer = (
                <View className={formStyles.validationSummary}>
                    <Text>{ValidationHelper.constructMessage(ValidationType.TIMEOUT)}</Text>
                </View>
            );
        }

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
                <Button onPress={() => console.log("login")} title="Login" />
            </View>
            // <form className={formStyles.formFullPage} onSubmit={this._onLogin}>
            //     <InputWithLabel
            //         name="email"
            //         placeholder="name@provider.com"
            //         value={this.state.email}
            //         onchange={val => this.setState({ email: val })}
            //     />
            //     <InputWithLabel
            //         name="password"
            //         placeholder="Password"
            //         type="password"
            //         onchange={val => this.setState({ password: val })}
            //     />

            //     <div className={formStyles.forgotPassword}>
            //         <Link to="/forgot">Forgot password?</Link>
            //     </div>

            //     {errorContainer}

            //     <div className={formStyles.group}>
            //         <button type="submit" className={formStyles.button}>
            //             Login
            //         </button>
            //     </div>
            //     <div className={formStyles.noAccount}>
            //         <Link to="/register">Don't have an account yet?</Link>
            //     </div>
            // </form>
        );
    }
}

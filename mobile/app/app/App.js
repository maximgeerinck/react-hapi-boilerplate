import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    StatusBar,
    Platform
} from 'react-native';

import { Scene, Router, ActionConst, Stack, Drawer } from 'react-native-router-flux';
import CustomNavBar from '../Components/NavBar';
// import Analytics from 'react-native-firebase-analytics';

import backButtonImage from '../assets/icons/back_chevron.png';
import DrawerContent from '../Components/DrawerContent';

// pages
import UserRegisterPage from "../User/RegisterPage";
import AuthLoginPage from "../Authentication/LoginPage";

// https://www.npmjs.com/package/react-native-tesseract-ocr

export default App = () => (
    <Router
        sceneStyle={styles.defaultScene}
        navBar={CustomNavBar}
        navigationBarStyle={styles.header}
        titleStyle={styles.headerText}
        backButtonImage={backButtonImage}
        leftButtonStyle={styles.leftButton}
        leftButtonIconStyle={styles.leftButtonIconStyle}
    >


        <Drawer
            hideNavBar={false}
            key="drawer"
            contentComponent={DrawerContent}
            drawerWidth={300}
        >
            <Stack
                navBar={CustomNavBar}
                key="root"
                titleStyle={{ alignSelf: 'center' }}
            >
                {/* <Scene key="user_page_register" component={UserRegisterPage} title="Register" type={ActionConst.REPLACE} /> */}
                <Scene key="auth_page_login" component={AuthLoginPage} title="Login" type={ActionConst.REPLACE} />
            </Stack>
        </Drawer>
    </Router>
)

const styles = StyleSheet.create({
    defaultScene: {
        backgroundColor: '#3e465e'
    },
    header: {
        backgroundColor: '#242d4a',
        borderBottomColor: '#181d2f'
    },
    leftButtonIconStyle: {
        height: 26,
        width: 26
    },
    headerText: {
        color: 'white',
        marginTop: 35
    },
    leftButton: {
        width: 72,
        height: 72,
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 20,
            },
            android: {
                top: 15,
            },
        }),
        left: 2,
        padding: 8,
    },
});
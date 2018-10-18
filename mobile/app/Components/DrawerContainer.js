import React, { Component, PropTypes } from 'react'
import Drawer        from 'react-native-drawer'
import DrawerContent from './DrawerContent'
import { Actions, DefaultRenderer } from 'react-native-router-flux'

export default class DrawerContainer extends Component {
    static propTypes = {
        navigationState: PropTypes.object,
        onNavigate: PropTypes.func,
    }

    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };

    render () {
        const { navigationState, onNavigate } = this.props;

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                open={navigationState.open}
                onOpen={()=>Actions.refresh({key:navigationState.key, open: true})}
                onClose={()=>Actions.refresh({key:navigationState.key, open: false})}
                type="overlay"
                content={<DrawerContent navigate={(route) => {
                    route();
                    this._drawer.close();
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <DefaultRenderer
                    navigationState={navigationState.children[0]}
                    onNavigate={onNavigate}
                />
            </Drawer>
        )
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, elevation: 16},
    main: {paddingLeft: 3},
}
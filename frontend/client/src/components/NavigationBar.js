import * as React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import styles from "./navigation.scss";
import NavigationDrawer from "./NavigationDrawer";

class NavigationBar extends React.Component {

    state = {
        collapsed: true,
        viewMenu: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        onLogout: PropTypes.func.isRequired,
        user: PropTypes.object,
    };

    toggleNav = () => {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed });
    };

    toggleMenu = () => {
        const visible = this.state.viewMenu;
        this.setState({ viewMenu: !visible });
    }

    renderBarsIcon() {

        const icon = this.state.viewMenu ?
            <FontAwesomeIcon icon={faTimes} /> :
            <FontAwesomeIcon icon={faBars} />

        return (
            <button className={styles.barsIcon} onClick={this.toggleMenu}>{icon}</button>
        )
    }

    renderMenu() {

        const { email } = this.props.user;

        return (
            <NavigationDrawer email={email} />
        )
    }

    renderHeader() {
        const barsIcon = this.renderBarsIcon();
        return (
            <header className={styles.actionbar}>
                {barsIcon}
            </header>
        )
    }

    render() {

        const menu = this.state.viewMenu ? this.renderMenu() : undefined;

        return (
            <React.Fragment>
                {this.renderHeader()}
                {menu}
            </React.Fragment>
        )
    }
}

export default NavigationBar;

import * as React from 'react';
import PropTypes from 'prop-types';
import styles from "./navigation.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'

class NavigationDrawer extends React.Component {

    static propTypes = {
        email: PropTypes.string
    }

    render() {

        const { email } = this.props;

        return (
            <div className={styles.menuWrapper}>
                <div className={styles.menu}>
                    <div className={styles.account}>
                        {email}
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/account"><span className={styles.icon}><FontAwesomeIcon icon={faUser} /></span>Account</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default NavigationDrawer; 
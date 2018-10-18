import * as React from 'react';
import styles from "./notificationSystem.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

class NotificationSystem extends React.Component {

    state = {
        items: []
    }

    addNotification(content) {
        const items = this.state.items;
        items.push({ content });
        this.setState({ items });
    }

    remove(index) {
        this.state.items.splice(index, 1)
        const items = [...this.state.items];
        this.setState({ items });
    }

    render() {
        const items = this.state.items.map((item, index) =>
            <li key={index}>
                {item.content}
                <button onClick={() => this.remove(index)} className={styles.remove}><FontAwesomeIcon icon={faTimes} /></button>
            </li>
        );

        return (
            <ul className={styles.system}>
                {items}
            </ul>
        );
    }
}

export default NotificationSystem;
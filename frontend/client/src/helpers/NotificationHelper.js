import * as React from "react";
import NotificationSystem from "../components/notification/NotificationSystem";
import ReactDOM from 'react-dom';

class NotificationHelper {

    _instance;

    constructor() {
        this.notificationRef = React.createRef();

        // trick to add dynamically
        const div = document.createElement('div');
        document.body.appendChild(div);
        ReactDOM.render(<NotificationSystem ref={this.notificationRef} />, div);
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new NotificationHelper();
        }
        return this._instance;
    }

    static notice(content, duration = 3, type = "info", onClose) {

    }

    info(content, duration, onClose) {
        this.notificationRef.current.addNotification(
            content,
        );
    }
}

export default NotificationHelper.getInstance();

import io from "socket.io-client";

class SocketClient {

    _instance;
    socket;

    static getInstance() {
        if (!this._instance) {
            this._instance = new SocketClient();
        }
        return this._instance;
    }

    connect(userEmail = "@anonymous") {
        this.socket = io("192.168.1.30:8001", { query: { userEmail: userEmail || "@anonymous" } })
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }
}

export default SocketClient.getInstance();
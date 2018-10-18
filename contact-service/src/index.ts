import * as http from "http";
import * as socketio from "socket.io";

interface IEventScanContact {
    senderEmail: string;
    receiverEmail: string;
    data?: any;
}
interface IEventRegister {
    email: string;
}

interface IClients {
    [email: string]: {
        sessionId: string;
    };
}

const httpServer = http.createServer((req, res) => {
    // res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3100");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.end();
});
const io = socketio(httpServer);

io.on("connection", (socket) => {
    const { userEmail } = socket.handshake.query;

    console.log(`${userEmail} connected`);

    socket.join(`email/${userEmail}`);

    // scan contact, send the received contact the email of the sender
    socket.on("contact/scan", (data: IEventScanContact) => {
        console.log("scanning contact");
        console.log(data);
        io.in(`email/${data.receiverEmail}`).emit("contact/scanned", { by: data.senderEmail, data: data.data });
    });

});

httpServer.listen(8001, () => {
    console.log("listening on port *:8001");
});

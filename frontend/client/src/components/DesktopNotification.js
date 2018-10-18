class DesktopNotification {
    send() {
        var notification = new Notification("Test", {
            icon: "https://icotracker.org/logo.png",
            body: "Hey there! You've been notified!"
        });
        notification.onclick = function() {
            window.open("https://icotracker.org");
        };
    }
}

export default DesktopNotification;

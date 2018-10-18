import * as compression from "compression";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";

// initialize the server and configure support for ejs templates
const app = express();
app.disable("x-powered-by");

// app.use(compression());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// universal routing and rendering
app.get("*.js", (req, res, next) => {
    const regex = /([^?]+).*/gi;
    const match = regex.exec(req.url);

    if (!match || match.length < 1) {
        next();
    }

    // only if file exists
    const file = match[1];
    if (!fs.existsSync(`${__dirname}/../public${file}.gz`)) {
        return next();
    }

    req.url = `${file}.gz`;

    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "text/javascript");
    next();
});
// app.get("*.js", (req, res, next) => {
//     req.url = req.url + ".gz";
//     res.set("Content-Encoding", "gzip");
//     res.set("Content-Type", "text/javascript");
//     next();
// });

app.use(express.static(__dirname + "/../public"));
app.use("/assets", express.static(__dirname + "/../public/static/media"));
app.use("/static", express.static(__dirname + "/../public/static"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// start the server
class Server {
    public static start(port: number = 3000, env: string = "production") {
        app.listen(port, (err: any) => {
            if (err) {
                return console.error(err);
            }
            console.info(`Server running on http://localhost:${port} [${env}]`);
        });
    }
}

export default Server;

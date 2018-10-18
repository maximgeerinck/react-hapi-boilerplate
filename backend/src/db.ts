import mongoose = require("mongoose");

export const URI = "mongodb://mongo/startup";

const options = { promiseLibrary: global.Promise };
mongoose.Promise = global.Promise;

export default mongoose;

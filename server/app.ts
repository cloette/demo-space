import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";

import { localMongo } from "./config";

import { formRouter } from "./routes/form";

const app: express.Application = express();

app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// connecting to database
mongoose.connect(process.env.MONGODB_URI || localMongo);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
  console.log('Connected to database! :)')
});

if (app.get("env") === "production") {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
}

// api routes
app.use("/api", formRouter);

var indexPath = __dirname + "/../client" + '/index.html';

// catch 404 and forward to index
app.use((req: express.Request, res: express.Response, next) => {
  res.sendFile(indexPath);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
